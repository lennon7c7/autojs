var clicks = require('./function/clicks.js')
var exists = require('./function/exists.js')
var others = require('./function/others.js')
var sleeps = require('./function/sleeps.js')
var swipes = require('./function/swipes.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.eg.android.AlipayGphone'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)
currentAPP.VERSION = '10.1.99.7000'
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2020/08/21/3/120_bc32c342295d63e6980102fc3505d414.apk'
currentAPP.MP_URL = 'alipays://platformapi/startapp?appId='

main()

function main() {
    others.fixDir()
    others.fixDir()

    log('---------- start ----------')

    others.clear()
    zhifubao = require('module/zhifubao.js')
    zhifubao.taskTransfer(30)

    others.clear()
    MP_URL = 'alipays://platformapi/startapp?appId=20000160'
    app.startActivity({data: MP_URL})
    sleeps.s15to20()
    clicks.textIfExists('Get All')

    log('---------- end ----------')
}
