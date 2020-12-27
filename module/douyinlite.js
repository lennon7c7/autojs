/**
 * 抖音极速版-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.ss.android.ugc.aweme.lite';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    if (text('明日签到').exists()) {
        return true;
    }

    if (textStartsWith('立即签到').exists()) {
        clicks.element(textStartsWith('立即签到'));
    } else if (!clicks.centerXyByText('签到')) {
        return false;
    }

    if (text('明日签到').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', s.PACKAGE_NAME, 'taskCashout start ----------');

    if (exists.parents(text('0.3元提现'), text('已完成'))) {
        return true;
    }

    if (!clicks.centerXyByText('去提现')) {
        return false;
    }

    if (!clicks.centerXyByText('每天可提')) {
        return false;
    }

    if (!clicks.centerXyByText('立即提现')) {
        others.back();
        return true;
    }

    others.back2();

    if (exists.parents(text('0.3元提现'), text('已完成'))) {
        return true;
    }

    return false;
}

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    log('----------', s.PACKAGE_NAME, 'taskTreasureBox start ----------');

    if (text('开宝箱得金币').find().size() === 1) {
        return true;
    }

    if (!clicks.centerXyByText('开宝箱得金币')) {
        return false;
    }

    if (!clicks.centerXyByText('看广告视频再赚')) {
        return false;
    }

    others.closeAdBackToElement(text('开宝箱得金币'));

    if (text('开宝箱得金币').find().size() === 1) {
        return true;
    }

    return false;
}

// 任务-限时
// every 20m
function taskLimit() {
    log('----------', s.PACKAGE_NAME, 'taskLimit start ----------');

    if (exists.parents(text('限时任务赚金币'), text('已领取'))) {
        return true;
    }

    if (!clicks.centerXyByText('限时任务赚金币')) {
        return false;
    }

    others.closeAdBackToElement(text('限时任务赚金币'));

    if (exists.parents(text('限时任务赚金币'), text('已领取'))) {
        return true;
    }

    return false;
}

// 任务-睡觉赚钱
function taskSleep() {
    log('----------', s.PACKAGE_NAME, 'taskSleep start ----------');

    if (!clicks.centerXyByText('睡觉赚金币')) {
        return false;
    }

    if (text('我要睡了').exists() && clicks.centerXyByText('我要睡了')) {
    } else if (text('我睡醒了').exists() && clicks.centerXyByText('我睡醒了')) {
    }

    if (text('可领取').exists()) {
        clicks.centerXyByText('可领取');
    }

    return true;
}

// 任务-小视频
function taskVideo() {
    log('----------', s.PACKAGE_NAME, 'taskVideo start ----------');

    others.back2();

    for (var i = 0; i < 10; i++) {
        if (!text('关注').exists() || !text('推荐').exists() || !text('首页').exists()) {
            return false;
        }

        if (text('点击进入直播间').exists()) {
            continue;
        }

        swipes.down1600();
        sleeps.s2to5();
        swipes.refresh1300();
    }

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 12; i++) {
        others.launch(s.PACKAGE_NAME);

        others.back();

        // 任务界面
        if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 216, 216)) {
            clicks.elementWidthHeight(className('android.widget.FrameLayout'), 216, 216);
        } else if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 216, 234)) {
            clicks.elementWidthHeight(className('android.widget.FrameLayout'), 216, 234);
        } else {
            continue;
        }

        status0 = taskCheckin();
        status1 = taskTreasureBox();
        status2 = taskLimit();
        taskSleep();
        taskCashout();
        taskVideo();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send('douyinlite');

    return false;
};

/**
 * 定时入口调用
 * @returns {boolean}
 */
s.cron = function () {
    others.launch(s.PACKAGE_NAME);

    others.back();

    if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 216, 216)) {
        clicks.elementWidthHeight(className('android.widget.FrameLayout'), 216, 216);
    } else if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 216, 234)) {
        clicks.elementWidthHeight(className('android.widget.FrameLayout'), 216, 234);
    } else {
        return false;
    }

    taskTreasureBox();
    taskLimit();
};

module.exports = s;
