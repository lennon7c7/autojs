var clicks = require('../function/clicks.js')
var exists = require('../function/exists.js')
var others = require('../function/others.js')
var sleeps = require('../function/sleeps.js')
var swipes = require('../function/swipes.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.yuncheapp.android.pearl'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)
currentAPP.VERSION = '3.19.1'
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2021/04/08/10/110_28d2db2046913767d2be6bf2278881b7.apk'

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!clicks.backToElement(text('福利'))) {
        return false
    }

    if (text('去签到').exists()) {
        clicks.centerXyByText('去签到')
    }

    if (text('立即签到').exists()) {
        clicks.centerXyByText('立即签到')
    }

    if (textStartsWith('看视频再领').exists() && clicks.element(textStartsWith('看视频再领'))) {
        others.closeAdBackToElement(text('福利'))
    }

    if (text('立即签到').exists()) {
        clicks.centerXyByText('立即签到')
    }

    swipes.down()
    swipes.down()
    swipes.down()
    swipes.down()

    if (text('明日签到').exists()) {
        return true
    }

    return false
}

// 任务-Ad
function taskAd() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (text('广告任务50金币/次，今日 10/10次').exists()) {
        return true
    }

    for (var i = 0; i < 10; i++) {
        if (!text('广告任务50金币/次，今日 ' + i + '/10次').exists()) {
            continue
        }

        if (clicks.centerXyByText('广告任务50金币/次，今日 ' + i + '/10次')) {
            others.closeAdBackToElement(id(currentAPP.PACKAGE_NAME + 'id/user_name'))
        }
    }

    if (text('广告任务50金币/次，今日 10/10次').exists()) {
        return true
    }

    return false
}

// 任务-看新闻
function taskNews() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    clicks.idIfExists(currentAPP.PACKAGE_NAME + 'id/time_reward_root')
    if (clicks.idIfExists(currentAPP.PACKAGE_NAME + 'id/button')) {
        others.closeAdBackToElement(id(currentAPP.PACKAGE_NAME + 'id/user_name'))
    }

    if (!others.backToElement(text('首页'))) {
        return false
    }

    if (text('要闻').exists()) {
        clicks.centerXyByText('要闻')
    }

    for (var i = 0; i < 10; i++) {
        if (!others.backToElement(text('首页'))) {
            return false
        }

        clicks.xy(345, 1345)

        sleeps.s8()
        swipes.down()
        sleeps.s10()
        swipes.refresh()
        sleeps.s10()
    }

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


        status0 = taskCheckin()
        status1 = taskAd()
        taskNews()

        if (status0 && status1) {
            return true
        }

        others.clear()
    }

    others.send(currentAPP.NAME)

    return false
}

module.exports = currentAPP
