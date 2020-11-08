/**
 * 趣头条-任务
 */
var clicks = require('./function-clicks.js');
var others = require('./function-others.js');
var sleeps = require('./function-sleeps.js');
var swipes = require('./function-swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.jifen.qukan';

// 任务-文章
function taskNews() {
    log('---------- taskNews start ----------');

    if (!clicks.centerXyByText('立即阅读')) {
        return false;
    }

    text('日常任务').exists() && clicks.xy(24, 120);

    for (var i = 0; i < 10; i++) {
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
    log('---------- taskVideo start ----------');

    if (!clicks.centerXyByText('观看视频')) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
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
    log('---------- taskAd start ----------');

    for (var i = 0; i < 4; i++) {
        if (text('日常任务').exists() && clicks.centerXyByText('看视频领金币') && !text('日常任务').exists()) {
            sleeps.s3();
            clicks.elementWidthHeight(className('android.widget.ImageView'), 90, 90);
            sleeps.s50();
            others.back2();
        }
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

        if (status0 && status1) {
            return true;
        }
    }

    others.send('qutoutiao');

    return false;
};

module.exports = s;
