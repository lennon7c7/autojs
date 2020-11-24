/**
 * 腾讯新闻-任务
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.tencent.news';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('---------- taskCheckin start ----------');

    others.back();

    if (!clicks.centerXyByText('我的 ')) {
        return false;
    }

    if (text('阅读任务开关').exists()) {
        return true;
    }

    others.back();
    clicks.text('立即打卡');

    if (text('阅读任务开关').exists()) {
        return true;
    }

    return false;
}

// 任务-观看视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    others.back();

    if (!text('去阅读').exists()) {
        return true;
    }

    for (var i = 0; i < 11; i++) {
        if (!text('新闻').exists() || !text('视频').exists() || !text('我的 ').exists()) {
            log('---------- error ----------');
            return false;
        }

        if (!clicks.centerXyByText('视频')) {
            return false;
        }

        clicks.xy(477, 577);
        sleeps.s30to35();
    }

    return true;
}

// 任务-看新闻
function taskNews() {
    log('---------- taskNews start ----------');

    others.back();

    if (!text('去观看').exists()) {
        return true;
    }

    for (var i = 0; i < 11; i++) {
        if (!text('新闻').exists() || !text('视频').exists() || !text('我的 ').exists()) {
            log('---------- error ----------');
            return false;
        }

        if (!clicks.centerXyByText('新闻')) {
            return false;
        }

        clicks.xy(345, 1048);

        sleeps.s8();
        swipes.down();
        sleeps.s10();
        swipes.refresh();
        sleeps.s10();

        others.back();
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

        clicks.centerXyByDesc('Tencent news');

        status0 = taskCheckin();
        status1 = taskVideo();
        status2 = taskNews();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send('tencentnews');

    return false;
};

module.exports = s;
