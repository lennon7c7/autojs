/**
 * 中青看点-任务
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'cn.youth.news';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('---------- taskCheckin start ----------');

    others.back2();

    if (!clicks.centerXyByText('任务')) {
        return false;
    }

    if (textStartsWith('明日签到').exists()) {
        return true;
    }

    clicks.xy(135, 720);
    clicks.element(textStartsWith('看视频翻'));

    if (textStartsWith('明日签到').exists()) {
        return true;
    }

    return false;
}

// 任务-看新闻
function taskNews() {
    log('---------- taskNews start ----------');

    others.back();

    if (!clicks.centerXyByText('任务')) {
        return false;
    }

    if (!clicks.centerXyByText('去阅读')) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (!clicks.centerXyByText('刷新')) {
            return false;
        }

        clicks.xy(608, 608);

        for (var j = 0; j < 3; j++) {
            sleeps.s2to3();
            swipes.down();
            sleeps.s2to3();
            swipes.refresh();
        }

        others.back();
    }

    return true;
}

// 任务-Ad
function taskAd() {
    log('---------- taskAd start ----------');

    others.back2();

    if (!clicks.centerXyByText('任务')) {
        return false;
    }

    if (text('看福利视频 (5 /5)')) {
        return true
    }

    for (var i = 0; i < 5; i++) {
        if (clicks.parents(textStartsWith('看福利视频'), text('去完成'))) {
            closeAd();
        }
    }

    if (text('看福利视频 (5 /5)')) {
        return true
    }

    return false;
}

/**
 * 关闭广告
 * @param {int} x 
 * @param {int} y 
 */
function closeAd() {
    sleeps.s60to70();

    others.back();
    if (!clicks.centerXyById('tt_video_ad_close_layout')) {
        log('---------- click fail: closeAd ----------');
        return false;
    }

    others.back2();

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        clicks.textIfExists('我知道了');
        sleeps.s10();

        status0 = taskCheckin();
        taskNews();
        status1 = taskAd();

        if (status0 && status1) {
            return true;
        }
    }

    others.send('zhongqingkandian');

    return false;
};

module.exports = s;
