/**
 * 京东极速版-任务
 * 当前存在问题
 * 1. 使用高版本的可能会被制裁了，刷视频只能获得1金币，使用v1.0.0能正常刷
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.jd.jdlite';

// 任务-签到
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    if (!others.backToElement(desc('首页'))) {
        return false;
    }

    if (text('现金签到').exists() && !clicks.centerXyByText('现金签到')) {
        return false;
    }

    if (text('邀好友解锁额外红包').exists()) {
        others.back();
        if (text('残忍拒绝').exists()) {
            clicks.centerXyByText('残忍拒绝');
        } else if (text('残忍离开').exists()) {
            clicks.centerXyByText('残忍离开');
        }

        return true;
    }

    if (text('立即签到').exists() && !clicks.centerXyByText('立即签到')) {
        return false;
    }

    if (text('邀好友解锁额外红包').exists()) {
        others.back();
        if (text('残忍拒绝').exists()) {
            clicks.centerXyByText('残忍拒绝');
        } else if (text('残忍离开').exists()) {
            clicks.centerXyByText('残忍离开');
        }

        return true;
    }

    return false;
}

// 任务-逛商品赚金币
function taskProduct() {
    log('----------', s.PACKAGE_NAME, 'taskProduct start ----------');

    if (!others.backToElement(desc('我的'))) {
        return false;
    }

    if (exists.parent(text('逛商品赚金币'), text('已完成'))) {
        return true;
    }

    if (!clicks.centerXyByText('逛商品赚金币')) {
        return false;
    }

    for (var i = 0; i < 60; i++) {
        if (text('今日已完成').exists()) {
            return true;
        }

        for (var j = 0; j < 4; j++) {
            swipes.down1600();
            sleeps.s2to4();
        }

        if (!clicks.centerXyByText('看商品继续')) {
            break;
        }
    }

    return false;
}

// 任务-逛活动赚金币
function taskRandomPage() {
    log('----------', s.PACKAGE_NAME, 'taskRandomPage start ----------');

    if (!others.backToElement(desc('我的'))) {
        return false;
    }

    if (exists.parent(text('逛活动赚金币'), text('已完成'))) {
        return true;
    }

    if (!clicks.centerXyByText('逛活动赚金币')) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (text('今日已完成').exists()) {
            return true;
        }

        for (var j = 0; j < 4; j++) {
            swipes.down1600();
            sleeps.s2to4();
        }

        if (!clicks.centerXyById('ll_task_bottom_next')) {
            return false;
        }
    }

    return false;
}

// 任务-看视频赚金币
function taskVideo() {
    log('----------', s.PACKAGE_NAME, 'taskVideo start ----------');

    if (!others.backToElement(desc('我的'))) {
        return false;
    }

    if (exists.parent(text('看视频赚金币'), text('已完成'))) {
        return true;
    }

    if (!clicks.centerXyByText('看视频赚金币')) {
        return false;
    }

    // first video into
    clicks.xy(469, 1373);

    for (var i = 0; i < 100; i++) {
        if (text('今日已完成').exists()) {
            return true;
        } else if (id('vi_btn_close').exists() && !text('分享').exists()) {
            log('---------- shit happen: video ----------');
            return false;
        }

        sleeps.s10();
    }

    return false;
}

// 任务-活动任务
function taskActivity() {
    log('----------', s.PACKAGE_NAME, 'taskActivity start ----------');

    if (!others.backToElement(desc('赚钱'))) {
        return false;
    }

    swipes.scrollDown();

    activityArray = ['免费领', '去赚钱', '去参加', '去抽奖', '去签到'];
    for (var i = 0; i < activityArray.length; i++) {
        if (clicks.textIfExists([activityArray[i]])) {
            others.back();
            clicks.textIfExists('残忍拒绝');
            clicks.textIfExists('残忍离开');
        }
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 10; i++) {
        others.launch(s.PACKAGE_NAME);

        status0 = taskCheckin();
        status1 = taskProduct();
        status2 = taskRandomPage();
        status3 = taskVideo();
        status4 = taskActivity();

        if (status0 && status1 && status2 && status3 && status4) {
            return true;
        }
    }

    others.send('jingdonglite');

    return false;
};

module.exports = s;
