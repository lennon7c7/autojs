/**
 * 微视-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.tencent.weishi';
s.VERSION = '8.6.0.588';
s.APK = 'https://android-apps.pp.cn/fs08/2021/01/05/7/120_0a998714be1db983efb3cead37706774.apk';

/**
 * 任务-登录
 * 有时候被退出登录，所以保险一些
 */
function taskLogin() {
    log('----------', s.PACKAGE_NAME, 'taskLogin start ----------');

    others.back();

    clicks.xy(888, 2200);

    if (text('编辑资料').exists()) {
        return true;
    }

    clicks.centerXyByText('微信登录');

    if (text('Confirm Login').exists()) {
        clicks.centerXyByText('Confirm Login');
    }

    if (text('编辑资料').exists()) {
        return true;
    }

    return false;
}

// 任务-视频
function taskVideo() {
    log('----------', s.PACKAGE_NAME, 'taskVideo start ----------');

    status = checkVideo();
    if (status) {
        return true;
    }

    clicks.textIfExists('取消');

    for (var i = 0; i < 200; i++) {
        if (!text('关注').exists() || !text('推荐').exists() || !className('android.widget.ProgressBar').exists()) {
            return false;
        }

        swipes.down1600();
        sleeps.s2to5();
        swipes.refresh1300();
    }

    status = checkVideo();
    if (status) {
        return true;
    }

    return false;
}

function checkVideo() {
    others.back2();

    if (!clicks.centerXyByText('福利中心')) {
        return false;
    }

    if (textStartsWith('明日再').exists()) {
        return true;
    }

    if (clicks.textIfExists('签到领红包')) {
        others.back();
        clicks.xy(750, 411);
    }

    if (textStartsWith('领取 ').exists()) {
        clicks.element(textStartsWith('领取 '));
        others.back();
        clicks.xy(750, 411);
    }

    if (textStartsWith('领取 ').exists()) {
        clicks.element(textStartsWith('领取 '));
        others.back();
        clicks.xy(750, 411);
    }

    if (textStartsWith('明日再').exists()) {
        return true;
    }

    clicks.text('看视频领红包');

    return false;
}

// 任务-领红包
function taskRedpack() {
    log('----------', s.PACKAGE_NAME, 'taskRedpack start ----------');

    others.back2();

    clicks.xy(888, 2200);

    if (!clicks.centerXyByText('福利中心')) {
        return false;
    }

    swipes.scrollDown3();

    for (var i = 0; i < desc('查看').find().size(); i++) {
        clicks.element(desc('查看').find()[i]);
        sleeps.s3();
        if (desc('前往腾讯新闻领取').exists()) {
            clicks.centerXyByDesc('前往腾讯新闻领取');
            sleeps.s3();
            others.back3();
            back();
            back();
        }

        exists.backToElement(desc('任务中心'));
    }

    for (var i = 0; i < text('查看').find().size(); i++) {
        clicks.element(text('查看').find()[i]);
        sleeps.s3();
        if (text('前往腾讯新闻领取').exists()) {
            clicks.centerXyByText('前往腾讯新闻领取');
            sleeps.s3();
            others.back3();
            back();
            back();
        }

        exists.backToElement(text('任务中心'));
    }

    return true;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', s.PACKAGE_NAME, 'taskCashout start ----------');

    others.back2();

    clicks.xy(888, 2200);

    if (!clicks.centerXyByText('福利中心')) {
        return false;
    }

    if (clicks.textIfExists('提现') && clicks.textIfExists('去提现')) {
        return true;
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

        status0 = taskLogin();
        status1 = taskVideo();
        status2 = taskRedpack();
        status3 = taskCashout();

        if (status0 && status1 && status2 && status3) {
            return true;
        }

        others.clear();
    }

    others.send(s.PACKAGE_NAME);

    return false;
};

module.exports = s;
