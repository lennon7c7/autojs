var clicks = require('./function/clicks.js')
var exists = require('./function/exists.js')
var others = require('./function/others.js')
var sleeps = require('./function/sleeps.js')
var swipes = require('./function/swipes.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.shuqi.controller'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)
currentAPP.VERSION = ''
currentAPP.APK = ''

main()

function main() {
    others.fixDir()
    others.fixDir()

    log('---------- start ----------')

    baidu = require('module/baidu.js')
    // baidu.start()

    kugoudaziban = require('module/kugoudaziban.js')
    // kugoudaziban.start()

    taobao = require('module/taobao.js')
    taobao.start()

    // tencentnews = require('module/tencentnews.js')
    // tencentnews.start()

    // tencentnow = require('module/tencentnow.js')
    // tencentnow.start()

    // toutiao = require('module/toutiao.js')
    // toutiao.start()

    // weishi = require('module/weishi.js')
    // weishi.start()

    // weixin = require('module/weixin.js')
    // weixin.start()

    ximalaya = require('module/ximalaya.js')
    // ximalaya.start()

    zhifubao = require('module/zhifubao.js')
    // zhifubao.start()

    zhongqingkandian = require('module/zhongqingkandian.js')
    // zhongqingkandian.start()

    log('---------- end ----------')
}
