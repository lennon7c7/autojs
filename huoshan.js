/**
 * 火山-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.ss.android.ugc.livelite';

for (var i = 0; i < 10; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    others.back();
    status1 = taskTreasureBox();
    status2 = taskShare();
    // taskAd20();
    status3 = taskSleep();
    taskCashout();

    if (status1 && status2 && status3) {
        others.clear();
        exit();
    }
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('---------- taskCashout start ----------');

    if (!clicks.text('立即提现')) {
        return false;
    }

    if (!clicks.text('0.20')) {
        return false;
    }

    if (text('余额不足，快去做任务赚钱吧！').exists()) {
        others.back();
        return true;
    }

    others.back2();

    log('---------- taskCashout end ----------');

    return true;
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

    log('---------- taskSleep end ----------');

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

    log('---------- taskShare end ----------');

    return false;
}

// 任务-20次广告
function taskAd20() {
    log('---------- taskAd20 start ----------');

    for (var i = 0; i < 20; i++) {
        var buttonAd = className('android.view.View').text('领100金币');
        if (buttonAd.exists()) {
            buttonAd.click();
            sleeps.s35to40();
            closeAd();
        } else if (className('android.view.View').text('去赚钱').exists()) {
            className('android.view.View').text('去赚钱').click();
            sleeps.s35to40();
            closeAd();
        }
    }

    log('---------- taskAd20 end ----------');

    return true;
}

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    log('---------- taskTreasureBox start ----------');

    if (!clicks.centerXyByText('红包')) {
        return false;
    }

    clicks.centerXyByText('开宝箱得金币');
    if (clicks.centerXyByText('看视频 金币翻8倍')) {
        sleeps.s35to40();
        closeAd();
    }
    clicks.text('javascript:;')

    log('---------- taskTreasureBox end ----------');

    return true;
}

// 关闭广告
function closeAd() {
    clicks.centerXyByText('关闭广告');
    clicks.centerXyById('sp');

    return true;
}
