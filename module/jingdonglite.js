/**
 * 京东极速版-任务
 * 当前存在问题
 * 1. 我的号被制裁了，刷视频才得1金币，现在不知道怎么处理
 */
var clicks = require('function/clicks.js');
var others = require('function/others.js');
var sleeps = require('function/sleeps.js');
var swipes = require('function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.jd.jdlite';

// 任务-签到
function taskCheckin() {
    log('---------- taskCheckin start ----------');

    swipes.down();
    swipes.down();
    swipes.down();

    if (!clicks.centerXyByText('去签到')) {
        return false;
    }

    if (!clicks.centerXyByText('立即签到')) {
        return false;
    }

    if (text('邀好友解锁额外红包').exists()) {
        others.back();
        return true;
    }

    if (text('残忍拒绝').exists()) {
        others.back();
        return true;
    }

    others.back();
    clicks.centerXyByText('残忍拒绝');

    return false;
}

// 任务-逛商品赚金币
function taskProduct() {
    log('---------- taskProduct start ----------');

    log('---------- button into ----------');
    clicks.xy(807, 1693);

    if (desc('赚钱').exists()) {
        return true;
    }

    for (var i = 0; i < 50; i++) {
        if (text('今日已完成').exists()) {
            return true;
        }

        swipes.down1600();
        sleeps.s2to4();

        swipes.down1600();
        sleeps.s2to4();

        swipes.down1600();
        sleeps.s2to5();

        if (id('ll_task_bottom_next').exists()) {
            id('ll_task_bottom_next').click();
            sleeps.s2to3();
        } else {
            others.back();
        }
    }

    for (var i = 0; i < 5; i++) {
        if (desc('赚钱').exists()) {
            return false;
        }

        others.back();
    }

    return true;
}

// 任务-逛活动赚金币
function taskRandomPage() {
    log('---------- taskRandomPage start ----------');

    log('---------- button into ----------');
    clicks.xy(807, 1894);

    if (desc('赚钱').exists()) {
        return true;
    }

    for (var i = 0; i < 20; i++) {
        if (text('今日已完成').exists()) {
            return true;
        }

        swipes.down1600();
        sleeps.s2to4();

        swipes.down1600();
        sleeps.s2to4();

        swipes.down1600();
        sleeps.s2to5();

        if (id('ll_task_bottom_next').exists()) {
            id('ll_task_bottom_next').click();
            sleeps.s2to3();
        } else {
            others.back();
        }
    }

    for (var i = 0; i < 5; i++) {
        if (desc('赚钱').exists()) {
            return false;
        }

        others.back();
    }

    return true;
}

// 任务-看视频赚金币
function taskVideo() {
    log('---------- taskVideo start ----------');

    log('---------- button into ----------');
    clicks.xy(807, 2095);

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

    for (var i = 0; i < 1200; i++) {
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

        if (!clicks.centerXyByDesc('赚钱')) {
            return true;
        }

        // 多出的另外一个是：新手任务-开启通知
        if (text('已完成').find().size() === 4) {
            exit();
        }

        status1 = taskProduct();
        status2 = taskRandomPage();
        status3 = taskVideo();
        // status4 = taskCheckin();

        if (status1 && status2 && status3) {
            return true;
        }
    }

    others.send('jingdonglite');

    return false;
};

module.exports = s;
