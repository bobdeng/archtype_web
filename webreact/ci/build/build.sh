#!/bin/bash
echo "开始构建......................................................"

app="erp"
env="prod"
subDomain="h5"

if [ "$GIT_BRANCH"x = "origin/develop"x ]; then
  env="dev"
  subDomain="mobile"
fi

nginx_conf="$subDomain.conf"

PROJ="$JOB_NAME($env) $BUILD_DISPLAY_NAME"
console="console"
BUILD_CONSOLE_URL="$BUILD_URL$console"
gitCommitLog=`git log -1 --pretty=%an,%ai,%s $GIT_COMMIT`
pushMsg="<font color='warning'>$PROJ 开始构建</font>\n
[Revision $GIT_BRANCH ${GIT_COMMIT:0:7}](https://github.com/cnJun/erp-h5/commit/$GIT_COMMIT)\n
commit message: $gitCommitLog\n
[Build Console $BUILD_DISPLAY_NAME]($BUILD_CONSOLE_URL)\n
"

ci/qyweixin.sh $pushMsg

echo "  步骤1: 下载npm依赖"
    ci/qyweixin.sh "$PROJ Install Dependences"
    npm install --location=global yarn --registry=https://registry.npm.taobao.org
    yarn config set ignore-engines true
    yarn install

echo "  步骤2: 编译部署"
    # 不同类型前端构建命令和输出目录可能不一样
    if [ -d "ci/build/dist" ]; then
        rm -rf ci/build/dist
    fi

    {
        ci/qyweixin.sh "$PROJ Run Test Begin"
        yarn test
        ci/qyweixin.sh "<font color='info'>$PROJ Run Test Success</font>"
    }||{
        ci/qyweixin.sh "[<font color='warning'>$PROJ Run Test Error</font>]($BUILD_CONSOLE_URL)"
        exit 0
    }
    
    # e2e
    # {
    #     ci/qyweixin.sh "$PROJ Run E2E Begin"
    #     yarn playwright
    #     ci/qyweixin.sh "<font color='info'>$PROJ Run E2E Success</font>"
    # }||{
    #     ci/qyweixin.sh "[<font color='warning'>$PROJ Run E2E Error</font>]($BUILD_CONSOLE_URL)"
    #     exit 0
    # }

    {
        ci/qyweixin.sh "$PROJ Build Begin"
        yarn build
        ci/qyweixin.sh "<font color='info'>$PROJ Build Success</font>"
    }||{
        echo -e "\033[5;31m ERROR：编译发生错误！！！  \033[0m"
        ci/qyweixin.sh "[<font color='info'>$PROJ Build Error</font>]($BUILD_CONSOLE_URL)"
        exit 0
    }
    
    if [ -d "dist" ]; then
        mv dist ci/build
    fi

echo "  步骤3: 重启nginx"
    if [ -f "ci/build/dist/index.html" ]; then
        echo -e "\033[32m生成页面文件成功\033[0m"
        ci/qyweixin.sh "<font color='info'>$PROJ 生成页面文件成功</font>"

        deploy_path="/opt/${app}/${env}/$subDomain-1"
        remove_path="/opt/${app}/${env}/$subDomain-2"

        nginx_path="/opt/nginx_conf/${app}-${env}-${nginx_conf}"

        if [ -f "${nginx_path}" ]; then
            if cat ${nginx_path} |grep "${deploy_path}" > /dev/null; then
                deploy_path="/opt/${app}/${env}/$subDomain-2"
                remove_path="/opt/${app}/${env}/$subDomain-1"
            fi
        fi

        rm -rf ${deploy_path}/
        mkdir -p ${deploy_path}/
        cp -r ci/build/dist/** ${deploy_path}/

        if [ -f "${deploy_path}/index.html" ]; then
            echo "部署成功：${deploy_path}/"

            # upload static resources to aliyun oss
            ossVer='default'
            ossVersion="${deploy_path}/oss_version"
            if [ -f "$ossVersion" ]; then
                ossVer=`sed -n 1p $ossVersion`
                node ci/oss/oss-upload.cjs ${app} ${env} $subDomain/$ossVer
            fi

            echo "$RAMDOM$(date +%Y%m%d%H%M%S)" |md5sum |cut -c 1-8 > $ossVersion
            ossVer=`sed -n 1p $ossVersion`

            node ci/oss/oss-upload.cjs ${app} ${env} $subDomain/$ossVer ${deploy_path}

            sed -i "s|\"/logo.svg|\"https://page-resources.oss-cn-hangzhou.aliyuncs.com/${app}/${env}/$subDomain/$ossVer/logo.svg|g" ${deploy_path}/index.html
            sed -i "s|\"/assets|\"https://page-resources.oss-cn-hangzhou.aliyuncs.com/${app}/${env}/$subDomain/$ossVer/assets|g" ${deploy_path}/index.html
            sed -i "s|\"/static|\"https://page-resources.oss-cn-hangzhou.aliyuncs.com/${app}/${env}/$subDomain/$ossVer/static|g" ${deploy_path}/index.html

            mkdir -p /opt/nginx_conf/ssl;

            cp -f ci/nginx/ssl/** /opt/nginx_conf/ssl/;

            cp -f ci/nginx/${nginx_conf} ${nginx_path}
            sed -i "s|{static_path}|${deploy_path}|g" ${nginx_path}
            chmod -R 755 ${deploy_path}
            /usr/sbin/nginx -s reload

            pushMsg="<font color='info'>$PROJ 部署成功</font>\n
            本次部署目录：${deploy_path}\n
            OSS发布版本：${app}-${env}-${ossVer}\n
            [https://$subDomain.erppre.com/](https://$subDomain.erppre.com/)
            "
            ci/qyweixin.sh $pushMsg
            # rm -rf ${remove_path}/
        else
            echo "部署失败：${deploy_path}"
            ci/qyweixin.sh "<font color='warning'>$PROJ 部署失败：${deploy_path}</font>"
        fi
    else
        echo -e "\033[5;31mERROR：未生成页面文件！！！\033[0m"
        ci/qyweixin.sh "<font color='warning'>$PROJ 部署失败：未生成页面文件</font>"
    fi

echo "构建结束......................................................"