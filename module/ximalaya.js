/**
 * 喜马拉雅-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.ximalaya.ting.lite';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);
currentAPP.VERSION = '2.0.12.3';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2021/01/21/6/110_89f2af74ad33a10022824656a22f1ead.apk';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, 'taskCheckin start ----------');

    if (!others.backToElement(text('我的'))) {
        return false;
    }

    if (textStartsWith('看视频再领').exists()) {
        clicks.element(textStartsWith('看视频再领'));
        closeAd();
    }

    if (text('立即补签').exists()) {
        clicks.centerXyByText('立即补签');
        closeAd();
    }

    return true;
}

/**
 * 任务-Ad
 */
function taskAd() {
    log('----------', currentAPP.NAME, 'taskAd start ----------');

    if (!others.backToElement(text('我的'))) {
        return false;
    }

    if (text('看视频').exists() && clicks.centerXyByText('看视频')) {
        if (exists.elementWidthHeight(className('android.widget.ImageView'), 90, 90)) {
            clicks.elementWidthHeight(className('android.widget.ImageView'), 90, 90);
        }

        closeAd();
    }

    for (var i = 0; i < 10; i++) {
        if (exists.parent(text('看一次赚50金币'), text('已完成'))) {
            return true;
        }

        if (!clicks.centerXyByText('看一次赚50金币')) {
            continue;
        }

        closeAd();
    }

    return false;
}

/**
 * 任务-新闻
 */
function taskNews() {
    log('----------', currentAPP.NAME, 'taskNews start ----------');

    if (!others.backToElement(text('我的'))) {
        return false;
    }

    swipes.scrollDown();

    for (var i = 0; i < 5; i++) {
        if (!clicks.backToElement(text('去阅读'))) {
            return false;
        }

        sleeps.s50();
        for (var j = 0; j < 10; j++) {
            if (textStartsWith('今日奖励已领取').exists() || text('今日任务已全部完成9次，明天再来吧~').exists()) {
                return true;
            }

            clicks.xy(500, 800);
            others.back();
        }
    }

    return false;
}

/**
 * 任务-抽奖
 */
function taskLottery() {
    log('----------', currentAPP.NAME, 'taskLottery start ----------');

    if (!exists.backToElement(text('每日福利'))) {
        return false;
    }

    swipes.scrollDown();

    if (!text('幸运大转盘').exists() || text('幸运大转盘').findOne().parent().findOne(text('去抽奖')) == null) {
        return false;
    }

    clicks.centerXyByText('幸运大转盘');
    for (var i = 0; i < 10; i++) {
        if (text('今日剩余抽奖次数：0').exists()) {
            return true;
        }

        if (!text('trigger').exists()) {
            continue;
        }

        clicks.centerXyByText('trigger');

        if (!text('trigger').exists() && exists.elementWidthHeight(className('android.widget.ImageView'), 90, 90)) {
            clicks.elementWidthHeight(className('android.widget.ImageView'), 90, 90);
        }

        !text('trigger').exists() && clicks.xy(780, 246);
        !text('trigger').exists() && sleeps.s10();
        for (var j = 0; j < 10; j++) {
            !text('trigger').exists() && others.back();
            !text('trigger').exists() && sleeps.s5to10();
        }
    }

    return false;
}

/**
 * 关闭广告
 * @returns {boolean}
 */
function closeAd() {
    if (id('tt_top_mute').exists()) {
        clicks.centerXyById('tt_top_mute');
    }

    sleeps.s30();
    for (var j = 0; j < 10; j++) {
        sleeps.s3();
        others.back();

        if (id('tt_video_ad_close_layout').exists()) {
            clicks.centerXyById('tt_video_ad_close_layout');

            sleeps.s2to3();
            others.back();

            return true;
        }
    }

    return false;
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


        status1 = taskCheckin();
        status2 = taskAd();
        status3 = taskNews();
        status4 = taskLottery();

        if (status1 && status2 && status3 && status4) {
            return true;
        }

        others.clear();
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

module.exports = currentAPP;
