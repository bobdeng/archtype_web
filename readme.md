# 系统需求
- JDK 16以上版本
- Docker
#目录结构
- application 后端主应用
- domains 后端业务领域代码
- webreact 前端页面

前端代码通过编译到application中，最后打包成一个jar文件发布。Spring使用模板引擎驱动发布静态页面。静态页面也可以单独部署，通过反向代理访问服务器。

#前端
- yarn test 运行所有测试
- yarn test:coverage 带覆盖率测试
- yarn build 编译静态文件到application

#后端
```
./gradlew check
//使用本地浏览器做端到端测试
./gradlew -Dwebdriver=local check
```
