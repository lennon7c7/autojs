/**
 * 快手-任务
 * 当前存在问题
 * 1. 无法判断是否成功通过验证码（就随便滑动，瞎蒙呗）
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.kuaishou.nebula';
currentAPP.VERSION = '3.0.40.619';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2020/10/02/6/120_9573752bb7b7323978560407c768984d.apk';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskCheckin start ----------');

    if (!others.backToElement(id('redFloat'))) {
        return false;
    }

    if (text('去查看').exists()) {
        return true;
    }

    if (!clicks.text('去签到') && !clicks.text('立即签到')) {
        return false;
    }

    clicks.xy(93, 387);

    if (text('去查看').exists()) {
        return true;
    }

    return false;
}

// 任务-0元抽奖
function task0Lottery() {
    log('----------', currentAPP.PACKAGE_NAME, 'task0Lottery start ----------');

    others.back3();

    if (!clicks.centerXyById('left_btn')) {
        return false;
    }

    if (!clicks.centerXyByText('More')) {
        return false;
    }

    if (!clicks.centerXyByText('Kwai Shop')) {
        return false;
    }

    if (!clicks.centerXyByText('0元抽奖')) {
        return false;
    }

    if (text('提高中奖率').find().size() === 3) {
        swipes.down();
        clicks.xy(396, 1386);
    }

    if (text('提高中奖率').find().size() === 10) {
        return true;
    }

    // switch (text('提高中奖率').find().size()) {
    //     case 3:
    //         clicks.centerXyByText('免费抽')
    //         swipes.down();
    //         swipes.down();
    //         break;
    //     default:
    //         break;
    // }

    for (var i = 0; i < 10; i++) {
        if (!clicks.centerXyByText('免费抽')) {
            continue;
        }

        if (!clicks.centerXyByText('分享活动 立即参与')) {
            others.back();
            continue;
        }

        clicks.xy(207, 1293);
        app.launch(currentAPP.PACKAGE_NAME);
        sleeps.s2to3();
        others.back();
    }

    others.back();

    return false;
}

// 任务-10次广告
function taskAd10() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskAd10 start ----------');

    if (!others.backToElement(text('日常任务'))) {
        return false;
    }

    if (text('明日再来').exists()) {
        return true;
    }

    for (var i = 0; i < 10; i++) {
        if (text('福利').exists() && clicks.element(className('android.widget.Button').text('福利'))) {
        } else if (text('福利 领金币').exists() && clicks.element(className('android.widget.Button').text('福利 领金币'))) {
        } else {
            continue;
        }

        if (!others.closeAdBackToElement(text('日常任务'))) {
            return false;
        }
    }

    return true;
}

// 任务-直播
function taskLive() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskLive start ----------');

    if (!others.backToElement(text('日常任务'))) {
        return false;
    }

    for (var i = 0; i < 11; i++) {
        if (text('看直播').find().size() === 1) {
            return true;
        }

        text('看直播').find().forEach((value, key) => {
            if (key !== 1) {
                return false;
            }

            value.click();
            return true
        });

        sleeps.s35();
        others.back();
        clicks.idIfExists('exit_btn');
    }

    return false;
}

// 任务-打开小程序
function taskOpenMP() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskLive start ----------');

    if (!others.backToElement(text('日常任务'))) {
        return false;
    }

    if (!text('去打开').exists()) {
        return true;
    }

    if (!clicks.text('去打开')) {
        return false;
    }

    if (!others.backToElement(text('日常任务'))) {
        return false;
    }

    if (!text('去打开').exists()) {
        return true;
    }

    return false;
}

// 任务-视频
function taskVideo() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskVideo start ----------');

    others.back3();

    for (var i = 0; i < 10; i++) {
        if (text('Drag the slider').exists()) {
            swipe(87, 969, 700, 969, 700);
            sleeps.s2to3();
            others.back();
        }

        swipes.down1600();
        if (className('android.widget.FrameLayout').find().size() < 4) {

        } else {
            sleeps.s2to10();
        }
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 10; i++) {
        others.launch(currentAPP.PACKAGE_NAME);

        status0 = taskCheckin();
        status2 = taskAd10();
        // status3 = task0Lottery();
        status4 = taskLive();
        taskOpenMP();
        taskVideo();

        if (status0 && status2 && status4) {
            return true;
        }

        others.clear();
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

module.exports = currentAPP;
