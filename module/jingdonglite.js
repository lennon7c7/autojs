/**
 * 京东极速版-任务
 * 当前存在问题
 * 1. 使用高版本的可能会被制裁了，刷视频只能获得1金币，使用v1.0.0能正常刷
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.jd.jdlite';

// 任务-签到
function taskCheckin() {
    log('---------- taskCheckin start ----------');

    if (!clicks.centerXyByText('现金签到')) {
        return false;
    }

    if (text('邀好友解锁额外红包').exists() || text('残忍拒绝').exists()) {
        others.back();
        return true;
    }

    if (!clicks.centerXyByText('立即签到')) {
        return false;
    }

    others.back();
    if (text('邀好友解锁额外红包').exists() || text('残忍拒绝').exists()) {
        others.back();
        return true;
    }

    clicks.centerXyByText('残忍拒绝');

    return false;
}

// 任务-逛商品赚金币
function taskProduct() {
    log('---------- taskProduct start ----------');

    others.back3();
    if (!clicks.centerXyByDesc('我的')) {
        return false;
    }

    if (clicks.parent(text('逛商品赚金币'), text('已完成'))) {
        return true;
    }

    if (!clicks.centerXyByText('逛商品赚金币')) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
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

    return true;
}

// 任务-逛活动赚金币
function taskRandomPage() {
    log('---------- taskRandomPage start ----------');

    others.back3();
    if (!clicks.centerXyByDesc('我的')) {
        return false;
    }

    if (clicks.parent(text('逛活动赚金币'), text('已完成'))) {
        return true;
    }

    if (!clicks.centerXyByText('逛活动赚金币')) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
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

    return true;
}

// 任务-看视频赚金币
function taskVideo() {
    log('---------- taskVideo start ----------');

    others.back3();
    if (!clicks.centerXyByDesc('我的')) {
        return false;
    }

    if (clicks.parent(text('看视频赚金币'), text('已完成'))) {
        return true;
    }

    if (!clicks.centerXyByText('看视频赚金币')) {
        log('---------- error ----------');
        return false;
    }

    if (!id('task_float_base_fl').exists()) {
        toastLog('---------- shit happen: taskVideo ----------');
        return false;
    }

    log('---------- first video into ----------');
    clicks.xy(469, 1373);

    // none sure is in first or not
    if (desc('赚钱').exists()) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (text('今日已完成').exists()) {
            return true;
        }

        if (!id('progressbar2').exists() && !text('金币大宝箱').exists()) {
            toastLog('---------- shit happen: taskVideo ----------');
            return false;
        }

        sleeps.s10to20();
        swipes.down1600();
        sleeps.s2to3();
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

        status0 = taskCheckin();
        status1 = taskProduct();
        status2 = taskRandomPage();
        status3 = taskVideo();

        if (status0 && status1 && status2 && status3) {
            return true;
        }
    }

    others.send('jingdonglite');

    return false;
};

module.exports = s;