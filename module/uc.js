/**
 * uc浏览器-任务
 * @version 13.1.9.1099
 */
var clicks = require('../function/clicks.js')
var exists = require('../function/exists.js')
var others = require('../function/others.js')
var sleeps = require('../function/sleeps.js')
var swipes = require('../function/swipes.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.UCMobile'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)

// 任务-宝箱
function taskTreasureBox() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(text('我 的'))) {
        return false
    }

    if (text('已签到').exists() && !clicks.centerXyByText('已签到')) {
        return false
    } else if (descEndsWith('天天领现金').exists() && !clicks.element(descEndsWith('天天领现金'))) {
        return false
    } else if (descEndsWith('明天领更多').exists() && !clicks.element(descEndsWith('明天领更多'))) {
        return false
    }

    if (exists.elementWidthHeight(className('android.widget.ImageView'), 144, 144)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 144, 144)
    }

    if (desc('全部领取').exists()) {
        clicks.centerXyByDesc('全部领取')
    }

    if (desc('好的').exists()) {
        clicks.centerXyByDesc('好的')
    }

    if (descStartsWith('今日元宝收完啦').exists()) {
        return true
    }

    if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 302, 127)) {
        clicks.elementWidthHeight(className('android.widget.FrameLayout'), 302, 127)
    }

    if (exists.elementWidthHeight(className('android.widget.ImageView'), 92, 92)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 92, 92)
    }

    return true
}

// 任务-Ad
function taskAd() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(desc('明天预计可领'))) {
        return false
    }

    for (var i = 0; i < 20; i++) {
        if (desc('领取').exists()) {
            clicks.centerXyByDesc('领取')
        }

        if (desc('看视频领元宝(15/15)').exists()) {
            return true
        }

        if (!clicks.centerXyByDesc('去完成')) {
            return false
        }

        if (!others.closeAdBackToElement(desc('明天预计可领'))) {
            return false
        }
    }

    return false
}

// 任务-Game
function taskGame() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    for (var i = 0; i < 6; i++) {
        if (desc('领取').exists()) {
            clicks.centerXyByDesc('领取')
        }

        if (desc('明天预计可领').exists() && !desc('去完成').exists()) {
            return true
        }

        if (!clicks.centerXyByDesc('去完成')) {
            return false
        }

        for (var j = 0; j < 12; j++) {
            sleeps.s10()
            swipes.down()
        }

        for (var j = 0; j < 3; j++) {
            !desc('明天预计可领').exists() && others.back()
        }
    }

    return false
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(desc('提现'))) {
        return false
    }

    if (!exists.moneyEgt1(descStartsWith('约'))) {
        return true
    }

    currentHours = new Date().getHours()
    if (currentHours < 18 || currentHours > 23) {
        return true
    }

    if (!clicks.centerXyByDesc('兑现金')) {
        return false
    }
    setText(exists.money(descStartsWith('约')) * 100)
    sleeps.s1()
    if (!clicks.desc('立即兑换')) {
        return false
    }

    if (!clicks.centerXyByDesc('提现')) {
        return false
    }

    clicks.xy(885, 747)
    clicks.xy(265, 1138)
    others.back()
    clicks.xy(145, 1313)
    clicks.xy(500, 1500)

    return true
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 12; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME)
        if (!status0) {
            return true
        }


        status0 = taskTreasureBox()
        status1 = taskAd()
        if (status1) {
            status1 = taskGame()
        }
        status2 = taskCashout()

        if (status0 && status1 && status2) {
            return true
        }
    }

    others.send(currentAPP.NAME)

    return false
}

/**
 * 定时入口调用
 * @returns {boolean}
 */
currentAPP.cron = function () {
    status0 = others.launch(currentAPP.PACKAGE_NAME)
    if (!status0) {
        return true
    }


    taskTreasureBox()
}

module.exports = currentAPP
