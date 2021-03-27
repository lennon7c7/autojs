/**
 * 腾讯新闻-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.tencent.news';
currentAPP.VERSION = '6.2.70';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2020/10/20/2/120_fc38b86dace4a31ad9f63ef739b4f251.apk';

/**
 * 任务-登录
 * 有时候被退出登录，所以保险一些
 */
function taskLogin() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskLogin start ----------');

    if (text('我的红包').exists() && !desc('微信').exists()) {
        return true;
    }

    if (!clicks.centerXyByDesc('微信')) {
        return false;
    }

    if (text('Agree').exists() && !clicks.text('Agree')) {
        return false;
    }

    if (text('我的红包').exists() && !desc('微信').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskCheckin start ----------');

    clicks.descIfExists('Tencent news');

    if (!others.backToElement(text('我的 '))) {
        return false;
    }

    if (!taskLogin()) {
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
    log('----------', currentAPP.PACKAGE_NAME, 'taskVideo start ----------');

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

    for (var i = 0; i < 10; i++) {
        if (!others.backToElement(text('视频'))) {
            return false;
        }

        clicks.xy(477, 577);
        sleeps.s30to35();
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
    log('----------', currentAPP.PACKAGE_NAME, 'taskNews start ----------');

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

    for (var i = 0; i < 10; i++) {
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
    log('----------', currentAPP.PACKAGE_NAME, 'taskRedpackNow start ----------');

    if (!others.backToElement(text('我的 '))) {
        return false;
    }

    if (!clicks.text('最高5元到账')) {
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
currentAPP.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(currentAPP.PACKAGE_NAME);

        clicks.descIfExists('Tencent news');

        status0 = taskCheckin();
        // status1 = taskNews();
        // status2 = taskVideo();
        status3 = taskRedpackNow();

        if (status0 && status3) {
            return true;
        }
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

module.exports = currentAPP;
