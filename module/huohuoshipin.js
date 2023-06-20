/**
 * 火火视频-任务
 */
var clicks = require('../function/clicks.js')
var exists = require('../function/exists.js')
var others = require('../function/others.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.jt.hanhan.video'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)

/**
 * 任务-登录
 * 有时候被退出登录，所以保险一些
 */
function taskLogin() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (text('日常任务').exists() && !text('登录领取最高28元红包').exists()) {
        return true
    }

    if (!clicks.centerXyByText('登录领取最高28元红包')) {
        return false
    }

    if (!clicks.centerXyByText('微信一键登录')) {
        return false
    }

    if (text('Agree').exists() && !clicks.text('Agree')) {
        return false
    }

    return !!(text('日常任务').exists() && !text('登录领取最高28元红包').exists());
}

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (text('金蛋大奖').exists()) {
        clicks.centerXyByText('金蛋大奖')

        if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 66, 66)) {
            clicks.elementWidthHeight(className('android.widget.FrameLayout'), 66, 66)
        }
    }

    if (text('领取红包').exists()) {
        clicks.centerXyByText('领取红包')

        if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 66, 66)) {
            clicks.elementWidthHeight(className('android.widget.FrameLayout'), 66, 66)
        }
    } else if (!others.backToElement(textStartsWith('看视频 '))) {
        return false
    }

    if (text('金币翻倍').exists()) {
        clicks.centerXyByText('金币翻倍')
        others.closeAdBackToElement(textStartsWith('恭喜获得'))

        if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 66, 66)) {
            clicks.elementWidthHeight(className('android.widget.FrameLayout'), 66, 66)
        }
    }

    return !!text('已签到').exists();
}

// 任务-Ad
function taskAd() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(text('任务'))) {
        return false
    }

    if (!taskLogin()) {
        return false
    }

    for (var i = 0; i < 10; i++) {
        if (text('日常任务').exists() && !text('领取').exists()) {
            return true
        }

        if (!clicks.centerXyByText('领取')) {
            return false
        }

        if (!others.closeAdBackToElement(textStartsWith('恭喜获得'))) {
            return false
        }

        if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 66, 66)) {
            clicks.elementWidthHeight(className('android.widget.FrameLayout'), 66, 66)
        }
    }

    return false
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


        status0 = taskCheckin()
        status1 = taskAd()

        if (status0 && status1) {
            return true
        }

        others.clear()
    }

    others.send(currentAPP.NAME)

    return false
}

module.exports = currentAPP
