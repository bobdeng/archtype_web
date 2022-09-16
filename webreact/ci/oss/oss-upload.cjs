const argv = process.argv

if (argv.length < 5) {
  console.error('未指定应用标识和环境标识')
  process.exit(1)
}

const app = argv[2]
const env = argv[3]
const sub = argv[4]
const dist = argv.length >= 5 ? argv[5] : ''
const path = app + '/' + env + '/' + sub

const ALIOSS = require('ali-oss')
const WebpackAliyunOSS = require("webpack-aliyun-oss")

const OSSCFG = require('./oss-config.cjs')

const aliyunOSSClient = new ALIOSS({
  region: OSSCFG.region,
  accessKeyId: OSSCFG.accessKeyId,
  accessKeySecret: OSSCFG.accessKeySecret,
  bucket: OSSCFG.bucket
});

async function deleteFile(filename) {
  await aliyunOSSClient.delete(filename)
}

async function deleteOldFiles() {
  let result = await aliyunOSSClient.list({
    "max-keys": 1000
  })
  result.objects && result.objects.forEach(obj => {
    if (obj.name.indexOf(path) >= 0) {
      deleteFile(obj.name)
    }
  })
}

deleteOldFiles()

function _Upload() {
  new WebpackAliyunOSS({
    from: [`${dist}/**`, `!${dist}/**/*.html`],
    dist: '/',
    region: OSSCFG.region,
    deletOrigin: false,
    accessKeyId: OSSCFG.accessKeyId,
    accessKeySecret: OSSCFG.accessKeySecret,
    bucket: OSSCFG.bucket,
    setOssPath: filePath => {
      let index = filePath.lastIndexOf(dist)
      let relative = filePath.substring(index + dist.length, filePath.length)
      return path + '/' + relative.replace(/\\/g, '/')
    },
    setHeaders(filePath) {
      // some operations to filePath
      return {
        'Cache-Control': 'max-age=31536000',
        'Access-Control-Allow-Origin': '*'
      }
    }
  }).apply()
}

if (dist && dist.length > 0) {
  setTimeout(() => {
    _Upload()
  }, 3e3)
}
