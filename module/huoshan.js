/**
 * 火山-任务
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.ss.android.ugc.livelite';

/**
 * 任务-提现
 */
function taskCashout() {
    log('---------- taskCashout start ----------');

    if (text('0.2元提现').findOne().parent().findOne(text('已完成'))) {
        return true;
    }

    if (!clicks.centerXyByText('立即提现')) {
        return false;
    }

    if (!clicks.centerXyByText('0.20')) {
        return false;
    }

    if (text('余额不足，快去做任务赚钱吧！').exists()) {
        others.back();
        return true;
    }

    others.back2();

    if (text('0.2元提现').findOne().parent().findOne(text('已完成'))) {
        return true;
    }

    return false;
}

// 任务-睡觉赚钱
function taskSleep() {
    log('---------- taskSleep start ----------');

    if (!clicks.centerXyByText('睡觉赚金币')) {
        return false;
    }

    if (clicks.centerXyByText('我要睡了')) {
    } else if (clicks.centerXyByText('我睡醒了')) {
    }

    clicks.centerXyByText('可领取');
    others.back();

    return true;
}

// 任务-晒收入
function taskShare() {
    log('---------- taskShare start ----------');

    if (text('晒收入').findOne().parent().find(text('已完成')).size() == 1) {
        return true;
    }

    if (!clicks.element(text('晒收入').findOne().parent().find(text('领200金币')))) {
        return false;
    }

    if (!clicks.text('微信')) {
        clicks.text('javascript:;');
        return false;
    }

    for (var i = 0; i < 4; i++) {
        if (!clicks.text('去粘贴')) {
            clicks.text('javascript:;');
            return false;
        }

        others.back();
    }

    clicks.text('javascript:;');

    if (text('晒收入').findOne().parent().find(text('已完成')).size() == 1) {
        return true;
    }

    return false;
}

// 任务-20次广告
function taskAd20() {
    log('---------- taskAd20 start ----------');

    for (var i = 0; i < 20; i++) {
        var buttonAd = className('android.view.View').text('领100金币');
        if (buttonAd.exists()) {
            buttonAd.click();
            closeAd();
        } else if (className('android.view.View').text('去赚钱').exists()) {
            className('android.view.View').text('去赚钱').click();
            closeAd();
        }
    }

    return true;
}

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    log('---------- taskTreasureBox start ----------');

    if (!clicks.centerXyByText('红包')) {
        return false;
    }

    if (text('开宝箱得金币').find().size() == 1) {
        return true;
    }

    if (!clicks.centerXyByText('开宝箱得金币')) {
        return false;
    }

    if (clicks.centerXyByText('看视频 金币翻8倍')) {
        closeAd();
    }
    clicks.text('javascript:;')

    if (text('开宝箱得金币').find().size() == 1) {
        return true;
    }

    return false;
}

// 关闭广告
function closeAd() {
    sleeps.s35to40();
    clicks.centerXyByText('关闭广告');
    clicks.centerXyById('sp');

    return true;
}

// 任务-小视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    for (var i = 0; i < 10; i++) {
        if (!clicks.centerXyByText('首页')) {
            return false;
        }

        if (text('15S').exists() || text('14S').exists() || text('13S').exists() || text('12S').exists() || text('11S').exists()
            || text('10S').exists() || text('9S').exists() || text('8S').exists()
        ) {
            sleeps.s15();
            clicks.centerXyByText('领取')
        } else if (text('剩余2次').exists()) {
            swipes.refresh600();
            clicks.centerXyByText('剩余2次');
        } else if (text('剩余1次').exists()) {
            swipes.refresh600();
            clicks.centerXyByText('剩余1次');
        } else {
            sleeps.s2to5();
        }
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        others.back();
        status0 = taskTreasureBox();
        taskShare();
        taskAd20();
        taskSleep();
        taskCashout();
        taskVideo();

        if (status0) {
            return true;
        }
    }

    others.send('huoshan');

    return false;
};

module.exports = s;
