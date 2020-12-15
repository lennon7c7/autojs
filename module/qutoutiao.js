/**
 * 趣头条-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.jifen.qukan';

// 任务-文章
function taskNews() {
    log('----------', s.PACKAGE_NAME, 'taskNews start ----------');

    if (text('点击展开更多').exists()) {
        clicks.centerXyByText('点击展开更多');
    }

    if (!text('立即阅读').exists() || !clicks.centerXyByText('立即阅读')) {
        return false;
    }

    if (!text('日常任务').exists()) {
        return false;
    }

    clicks.xy(24, 120);

    for (var i = 0; i < 10; i++) {
        if (!text('任务').exists()) {
            return false;
        }

        swipes.refresh600();
        clicks.xy(0, 811);

        for (var j = 0; j < 4; j++) {
            swipes.down();
            sleeps.s2to3();
        }

        others.back();
    }

    others.back();

    return false;
}

// 任务-视频
function taskVideo() {
    log('----------', s.PACKAGE_NAME, 'taskVideo start ----------');

    if (text('点击展开更多').exists()) {
        clicks.centerXyByText('点击展开更多');
    }

    if (!text('观看视频').exists() || !clicks.centerXyByText('观看视频')) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (!text('任务').exists()) {
            return false;
        }

        swipes.refresh600();
        clicks.xy(495, 457);
        sleeps.s10to20();

        clicks.xy(852, 1800);
        if (text('恭喜获得').exists() || text('阅读收益').exists()) {
            others.back();
        }
    }

    others.back();

    return false;
}

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, 'taskAd start ----------');

    for (var i = 0; i < 4; i++) {
        if (!text('看视频领金币').exists()) {
            return true;
        }

        if (!clicks.centerXyByText('看视频领金币') || text('日常任务').exists()) {
            continue;
        }

        sleeps.s3();
        clicks.elementWidthHeight(className('android.widget.ImageView'), 90, 90);
        sleeps.s50();
        others.back2();
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

        if (!clicks.centerXyByText('任务')) {
            return false;
        }

        status0 = taskVideo();
        status1 = taskNews();
        status2 = taskAd();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send('qutoutiao');

    return false;
};

module.exports = s;
