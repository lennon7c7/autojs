/**
 * 抖音极速版-任务
 */
var clicks = require('../function/clicks.js')
var exists = require('../function/exists.js')
var others = require('../function/others.js')
var sleeps = require('../function/sleeps.js')
var swipes = require('../function/swipes.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.ss.android.ugc.aweme.lite'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (text('明日签到').exists()) {
        return true
    }

    if (textStartsWith('立即签到').exists()) {
        clicks.element(textStartsWith('立即签到'))
    } else if (!clicks.centerXyByText('签到')) {
        return false
    }

    return !!text('明日签到').exists();
}

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (text('开宝箱得金币').find().size() === 1) {
        return true
    }

    if (!clicks.centerXyByText('开宝箱得金币')) {
        return false
    }

    if (!clicks.centerXyByText('看广告视频再赚')) {
        return false
    }

    if (!others.closeAdBackToElement(text('开宝箱得金币'))) {
        return false
    }

    return text('开宝箱得金币').find().size() === 1;
}

// 任务-限时
// every 20m
function taskLimit() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!exists.backToElement(text('现金收益'))) {
        return false
    }

    if (exists.parents(text('限时任务赚金币'), text('已领取'))) {
        return true
    }

    if (!clicks.centerXyByText('限时任务赚金币')) {
        return false
    }

    if (!others.closeAdBackToElement(text('限时任务赚金币'))) {
        return false
    }

    return exists.parents(text('限时任务赚金币'), text('已领取'));
}

// 任务-睡觉赚钱
function taskSleep() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!exists.backToElement(text('现金收益'))) {
        return false
    }

    if (!clicks.centerXyByText('睡觉赚金币')) {
        return false
    }

    if (text('我要睡了').exists() && clicks.centerXyByText('我要睡了')) {
    } else if (text('我睡醒了').exists() && clicks.centerXyByText('我睡醒了')) {
    }

    if (text('可领取').exists()) {
        clicks.centerXyByText('可领取')
    }

    return true
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!exists.backToElement(text('现金收益'))) {
        return false
    }

    if (exists.parents(text('0.3元提现'), text('已完成'))) {
        return true
    }

    if (!clicks.centerXyByText('去提现')) {
        return false
    }

    if (!clicks.centerXyByText('每天可提')) {
        return false
    }

    if (!clicks.centerXyByText('立即提现')) {
        return true
    }

    if (!exists.backToElement(text('现金收益'))) {
        return false
    }

    return exists.parents(text('0.3元提现'), text('已完成'));
}

// 任务-小视频
function taskVideo() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!clicks.backToElement(text('首页'))) {
        return false
    }

    for (var i = 0; i < 5; i++) {
        if (!text('关注').exists() || !text('推荐').exists() || !text('首页').exists()) {
            return false
        }

        if (text('点击进入直播间').exists()) {
            continue
        }

        swipes.down1600()
        sleeps.s2to5()
        swipes.refresh1300()
    }

    return false
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


        others.back()

        // 任务界面
        if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 216, 216)) {
            clicks.elementWidthHeight(className('android.widget.FrameLayout'), 216, 216)
        } else if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 216, 234)) {
            clicks.elementWidthHeight(className('android.widget.FrameLayout'), 216, 234)
        } else {
            continue
        }

        status0 = taskCheckin()
        status1 = taskTreasureBox()
        status2 = taskLimit()
        // taskSleep()
        taskCashout()
        taskVideo()

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


    others.back()

    if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 216, 216)) {
        clicks.elementWidthHeight(className('android.widget.FrameLayout'), 216, 216)
    } else if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 216, 234)) {
        clicks.elementWidthHeight(className('android.widget.FrameLayout'), 216, 234)
    } else {
        return false
    }

    taskTreasureBox()
    taskLimit()
}

module.exports = currentAPP
