/**
 * 腾讯新闻-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.tencent.news';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    if (!others.backToElement(text('我的 '))) {
        return false;
    }

    if (!others.backToElement(text('我的金币'))) {
        return false;
    }

    if (text('我的日签卡').exists()) {
        return true;
    }

    if (!clicks.text('立即签到')) {
        return false;
    }

    if (text('我的日签卡').exists()) {
        return true;
    }

    return false;
}

// 任务-观看视频
function taskVideo() {
    log('----------', s.PACKAGE_NAME, 'taskVideo start ----------');

    if (!others.backToElement(text('我的 '))) {
        return false;
    }

    if (text('领取').exists()) {
        clicks.text('领取');
        others.back();
    }

    if (text('领取').exists()) {
        clicks.text('领取');
        others.back();
    }

    if (text('福利任务').exists() && !text('去阅读').exists()) {
        return true;
    }

    for (var i = 0; i < 20; i++) {
        if (!text('新闻').exists() || !text('视频').exists() || !text('我的 ').exists()) {
            log('---------- error ----------');
            return false;
        }

        clicks.xy(477, 577);
        sleeps.s30to35();

        if (!others.backToElement(text('视频'))) {
            return false;
        }
    }

    if (!others.backToElement(text('我的 '))) {
        return false;
    }

    if (text('领取').exists()) {
        clicks.text('领取');
        others.back();
    }

    if (text('领取').exists()) {
        clicks.text('领取');
        others.back();
    }

    return true;
}

// 任务-看新闻
function taskNews() {
    log('----------', s.PACKAGE_NAME, 'taskNews start ----------');

    if (!others.backToElement(text('我的 '))) {
        return false;
    }

    if (text('领取').exists()) {
        clicks.text('领取');
        others.back();
    }

    if (text('领取').exists()) {
        clicks.text('领取');
        others.back();
    }

    if (text('福利任务').exists() && !text('去观看').exists()) {
        return true;
    }

    for (var i = 0; i < 20; i++) {
        if (!others.backToElement(text('新闻'))) {
            return false;
        }

        clicks.xy(345, 1048);

        sleeps.s8();
        swipes.down();
        sleeps.s10();
        swipes.refresh();
        sleeps.s10();
    }

    if (!others.backToElement(text('我的 '))) {
        return false;
    }

    if (text('领取').exists()) {
        clicks.text('领取');
        others.back();
    }

    if (text('领取').exists()) {
        clicks.text('领取');
        others.back();
    }

    return true;
}

// 任务-NOW直播红包
function taskRedpackNow() {
    log('----------', s.PACKAGE_NAME, 'taskRedpackNow start ----------');

    if (!others.backToElement(text('我的 '))) {
        return false;
    }

    if (!clicks.centerXyByText('我的红包')) {
        return false;
    }

    if (!clicks.centerXyByText('NOW直播红包')) {
        return false;
    }

    if (text('正在派发红包').exists() && !clicks.centerXyByText('正在派发红包')) {
        return false;
    } else if (text('下载NOW直播提现').exists() && !clicks.centerXyByText('下载NOW直播提现')) {
        return false;
    }
    sleeps.s5();
    others.back2();
    back();
    back();
    sleeps.s3();
    others.back();

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        clicks.descIfExists('Tencent news');

        status0 = taskCheckin();
        status1 = taskNews();
        status2 = taskVideo();
        status3 = taskRedpackNow();

        if (status0 && status1 && status2 && status3) {
            return true;
        }
    }

    others.send('tencentnews');

    return false;
};

module.exports = s;
