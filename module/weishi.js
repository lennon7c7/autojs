/**
 * 微视-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.tencent.weishi';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);
currentAPP.VERSION = '8.6.0.588';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2021/01/05/7/120_0a998714be1db983efb3cead37706774.apk';

/**
 * 任务-登录
 * 有时候被退出登录，所以保险一些
 */
function taskLogin() {
    log('----------', currentAPP.NAME, 'taskLogin start ----------');

    toPageMe();

    if (text('编辑资料').exists()) {
        return true;
    }

    clicks.centerXyByText('微信登录');

    if (text('Confirm Login').exists()) {
        clicks.centerXyByText('Confirm Login');
    }

    if (text('Agree').exists() && !clicks.text('Agree')) {
        return false;
    }

    if (text('同意').exists() && !clicks.text('同意')) {
        return false;
    }

    if (text('编辑资料').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-视频
 * 因为刷完所有的红包时间花费不值得，所以只刷前面的几个红包即可
 * @returns {boolean}
 */
function taskVideo() {
    log('----------', currentAPP.NAME, 'taskVideo start ----------');

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
        swipes.refresh1500();
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
    log('----------', currentAPP.NAME, 'taskRedpack start ----------');

    toPageMe();

    if (!clicks.centerXyByText('福利中心')) {
        return false;
    }

    if (!clicks.nextSibilingsNode(text('打开腾讯新闻就能领红包，100%中奖！'), text('查看'))) {
        return false;
    }

    if (text('下载腾讯新闻').exists() || desc('下载腾讯新闻').exists()) {
        clicks.centerXyByTextOrDesc('下载腾讯新闻');
        sleeps.s3();
    }

    if (text('该账号今天已经领过红包了哦~').exists()) {
        app.launch(currentAPP.PACKAGE_NAME);
        sleeps.s3();
        return true;
    }

    app.launch(currentAPP.PACKAGE_NAME);
    sleeps.s3();

    return false;
}

/**
 * 任务-提现
 * 因为需要扫脸，没有对应的技术应付，所以只能关闭了
 */
function taskCashout() {
    log('----------', currentAPP.NAME, 'taskCashout start ----------');

    toPageMe();

    if (!clicks.centerXyByText('福利中心')) {
        return false;
    }

    clicks.textIfExists('提现');
    clicks.textIfExists('去提现');
    clicks.textIfExists('立即提现');

    return true;
}

/**
 * 跳转页面-我
 */
function toPageMe() {
    others.back2();

    // 页面-我
    className('android.widget.LinearLayout').find().forEach((value, key) => {
        if (value.childCount() !== 5) {
            return
        }

        value.children().forEach((value2, key2) => {
            if (key2 !== 4 || !value2) {
                return
            }

            clicks.element(value2);
        });
    });
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 10; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME);
        if (!status0) {
            return true;
        }


        status0 = taskLogin();
        if (!status0) {
            continue;
        }
        taskVideo();
        status2 = taskRedpack();
        // status3 = taskCashout();

        if (status0 && status2) {
            return true;
        }

        others.clear();
    }

    others.send(currentAPP.NAME);

    return false;
};

module.exports = currentAPP;
