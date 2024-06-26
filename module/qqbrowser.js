/**
 * QQ浏览器-任务
 */
var clicks = require('../function/clicks.js')
var exists = require('../function/exists.js')
var others = require('../function/others.js')
var sleeps = require('../function/sleeps.js')
var swipes = require('../function/swipes.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.tencent.mtt'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)
currentAPP.VERSION = '10.8.6'
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2020/10/22/11/120_47515e8bc6545e47651495ab8270bc9d.apk'

/**
 * 任务-登录
 * 有时候被退出登录，所以保险一些
 */
function taskLogin() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!clicks.backToElement(className('android.widget.TextView').depth(10).text('我的'))) {
        return false
    }

    if (text('更多任务').exists() && !desc('微信登录').exists()) {
        return true
    }

    if (!clicks.centerXyByDesc('微信登录')) {
        return false
    }
    sleeps.s10()

    return true
}

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!clicks.backToElement(className('android.widget.TextView').depth(10).text('我的'))) {
        return false
    }

    if (!clicks.centerXyByText('更多任务')) {
        return false
    }

    if (text('已签到').exists()) {
        return true
    }

    if (clicks.textIfExists('立即签到')) {
        text('知道了').exists() && clicks.centerXyByText('知道了')
        text('继续赚钱').exists() && clicks.centerXyByText('继续赚钱')
    }

    if (text('已签到').exists()) {
        return true
    }

    return false
}

/**
 * 任务-清理
 */
function taskClear() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!exists.backToElement(text('福利中心'))) {
        return false
    }

    if (clicks.textIfExists('领奖励')) {
        text('知道了').exists() && clicks.centerXyByText('知道了')
        text('继续赚钱').exists() && clicks.centerXyByText('继续赚钱')
    }

    if (text('完成1次手机空间清理（1/1）').exists()) {
        return true
    }

    swipes.down()
    if (!clicks.centerXyByText('去清理')) {
        return false
    }
    sleeps.s2to3()

    if (!clicks.centerXyByText('放心清理')) {
        return false
    }
    sleeps.s2to3()

    if (!exists.backToElement(text('福利中心'))) {
        return false
    }

    if (clicks.centerXyByText('领奖励')) {
        text('知道了').exists() && clicks.centerXyByText('知道了')
        text('继续赚钱').exists() && clicks.centerXyByText('继续赚钱')
    }

    if (text('完成1次手机空间清理（1/1）').exists()) {
        return true
    }

    return false
}

// 任务-Ad
function taskAd() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!exists.backToElement(text('福利中心'))) {
        return false
    }

    if (clicks.textIfExists('领奖励')) {
        text('知道了').exists() && clicks.centerXyByText('知道了')
        text('继续赚钱').exists() && clicks.centerXyByText('继续赚钱')
    }

    if (text('福利中心').exists() && !textStartsWith('观看3个视频得').exists()) {
        return true
    }

    if (text('观看3个视频得300金币（3/3）').exists()) {
        return true
    }

    swipes.down()
    if (text('去观看').exists() && clicks.centerXyByText('去观看')) {
        others.closeAdBackToElement(text('福利中心'))
    }

    if (text('继续').exists() && clicks.centerXyByText('继续')) {
        others.closeAdBackToElement(text('福利中心'))
    }

    if (clicks.textIfExists('领奖励')) {
        text('知道了').exists() && clicks.centerXyByText('知道了')
        text('继续赚钱').exists() && clicks.centerXyByText('继续赚钱')
    }

    if (text('观看3个视频得300金币（3/3）').exists()) {
        return true
    }

    return false
}

// 任务-搜索
function taskSearch() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!exists.backToElement(text('福利中心'))) {
        return false
    }

    if (clicks.textIfExists('领奖励')) {
        text('知道了').exists() && clicks.centerXyByText('知道了')
        text('继续赚钱').exists() && clicks.centerXyByText('继续赚钱')
    }

    if (text('逛5秒或点击任意内容（1/1）').exists()) {
        return true
    }

    swipes.down()
    if (clicks.text('去搜索')) {
        sleeps.s10()
    }

    if (!exists.backToElement(text('福利中心'))) {
        return false
    }

    if (clicks.textIfExists('领奖励')) {
        text('知道了').exists() && clicks.centerXyByText('知道了')
        text('继续赚钱').exists() && clicks.centerXyByText('继续赚钱')
    }

    if (text('逛5秒或点击任意内容（1/1）').exists()) {
        return true
    }

    return false
}

/**
 * 任务-新闻
 */
function taskNews() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!exists.backToElement(text('福利中心'))) {
        return false
    }

    if (clicks.textIfExists('领奖励')) {
        text('知道了').exists() && clicks.centerXyByText('知道了')
        text('继续赚钱').exists() && clicks.centerXyByText('继续赚钱')
    }

    if (text('完整阅读5篇资讯文章（5/5）').exists()) {
        return true
    }

    swipes.down()
    if (!clicks.textIfExists('去阅读') && !clicks.textIfExists('继续')) {
        return false
    }

    for (var i = 0; i < 20; i++) {
        text('首页').exists() && swipes.refresh()
        text('首页').exists() && clicks.xy(345, 1048)
        for (var j = 0; j < 8; j++) {
            swipes.down()
            sleeps.s2to3()
        }

        if (text('任务完成，点击领取金币').exists()) {
            break
        }

        others.back()
    }

    if (!others.backToElement(text('我的'))) {
        return false
    }

    if (!clicks.centerXyByText('更多任务')) {
        return false
    }

    if (clicks.textIfExists('领奖励')) {
        text('知道了').exists() && clicks.centerXyByText('知道了')
        text('继续赚钱').exists() && clicks.centerXyByText('继续赚钱')
    }

    if (text('完整阅读5篇资讯文章（5/5）').exists()) {
        return true
    }

    return false
}

// 任务-NOW直播红包
function taskRedpackNow() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    app.startActivity({
        data: 'mttbrowser://url=https://now.qq.com/activity/c-atmosphere-official/channel.html?_bid=4054&_wv=3&fromid=22452&pkgId=22452&channellink=CK1475153271485'
    })
    sleeps.s3()
    if (!clicks.centerXyByText(currentAPP.NAME)) {
        return false
    }

    others.back()

    return true
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 10; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME)
        if (!status0) {
            return true
        }


        status0 = taskLogin()
        if (!status0) {
            continue
        }

        status5 = taskRedpackNow()
        status0 = taskCheckin()
        status1 = taskClear()
        status3 = taskAd()
        status4 = taskSearch()
        status2 = taskNews()

        if (status0 && status1 && status2 && status3 && status4 && status5) {
            return true
        }

        others.clear()
    }

    others.send(currentAPP.NAME)

    return false
}

module.exports = currentAPP
