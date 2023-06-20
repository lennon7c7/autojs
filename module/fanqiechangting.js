/**
 * 番茄畅听-任务
 */
var clicks = require('../function/clicks.js')
var exists = require('../function/exists.js')
var others = require('../function/others.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.xs.fm'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)

// 任务-宝箱
// every 1h
function taskTreasureBox() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(text('福利'))) {
        return false
    }

    if (textStartsWith('看视频再领').exists()) {
        if (!clicks.element(textStartsWith('看视频再领'))) {
            return false
        }

        if (!others.closeAdBackToElement(text('福利'))) {
            return false
        }
    }

    if (text('图片').exists() && !clicks.text('图片')) {
        return false
    }

    if (textStartsWith('看视频领取').exists()) {
        if (!clicks.element(textStartsWith('看视频领取'))) {
            return false
        }

        if (!others.closeAdBackToElement(text('福利'))) {
            return false
        }
    }

    return true
}

// 任务-Ad
function taskAd() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(text('福利'))) {
        return false
    }

    if (exists.parents(text('看视频赚金币'), text('已完成'))) {
        return true
    }

    for (var i = 0; i < 11; i++) {
        if (!clicks.textIfExists('立即观看')) {
            return false
        }

        if (!others.closeAdBackToElement(text('福利'))) {
            return false
        }
    }

    return exists.parents(text('看视频赚金币'), text('已完成'));
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(text('福利'))) {
        return false
    }

    if (!exists.moneyEgt15(textContains('.'))) {
        return true
    }

    if (!clicks.text('现金金额：')) {
        return false
    }

    if (!clicks.text('去提现')) {
        return false
    }

    if (textStartsWith('当前余额不足').exists()) {
        return true
    }

    return clicks.centerXyByText('15.00');
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 9; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME)
        if (!status0) {
            return true
        }


        status0 = taskTreasureBox()
        status1 = taskAd()
        status2 = taskCashout()

        if (status0 && status1 && status2) {
            return true
        }

        others.clear()
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
