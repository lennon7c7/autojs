/**
 * 抖音火山-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.ss.android.ugc.live';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);

// 任务-视频
function taskVideo() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    for (var i = 0; i < 5; i++) {
        if (text('点击进入直播间').exists()) {
            continue;
        }

        swipes.down1600();
        sleeps.s2to5();
    }

    return false;
}

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (text('明日签到').exists()) {
        return true;
    }

    return false;
}

// 任务-限时
// every 20m
function taskLimit() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!others.backToElement(text('火苗管理'))) {
        return false;
    }

    if (!clicks.textIfExists('去领取')) {
        return false;
    }

    others.closeAdBackToElement(text('火苗管理'));

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!others.backToElement(text('火苗管理'))) {
        return false;
    }

    if (!exists.moneyEgt02(className('android.view.View').textStartsWith('约'))) {
        return true;
    }

    if (!clicks.text('去提现')) {
        return false;
    }

    if (text('当前余额不足，邀请好友最高赚36元').exists()) {
        return true;
    }

    if (!clicks.text('0.2元')) {
        return false;
    }

    if (text('当前余额不足，邀请好友最高赚36元').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('立即提现')) {
        return false;
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 3; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME);
        if (!status0) {
            return true;
        }


        clicks.textIfExists('以后再说');

        taskVideo();

        others.back2();
        scrollUp();
        if (!clicks.elementWidthHeight(className('android.view.ViewGroup'), 150, 120)) {
            return false;
        }

        if (!clicks.centerXyByText('火苗管理')) {
            return false;
        }

        status0 = taskCheckin();
        // taskLimit();
        taskCashout();

        if (status0) {
            return true;
        }
    }

    others.send(currentAPP.NAME);

    return false;
};

/**
 * 定时入口调用
 * @returns {boolean}
 */
currentAPP.cron = function () {
    status0 = others.launch(currentAPP.PACKAGE_NAME);
    if (!status0) {
        return true;
    }


    clicks.textIfExists('以后再说');

    others.back2();
    scrollUp();
    if (!clicks.elementWidthHeight(className('android.view.ViewGroup'), 150, 120)) {
        return false;
    }

    if (!clicks.centerXyByText('火苗管理')) {
        return false;
    }

    taskLimit();
};

module.exports = currentAPP;
