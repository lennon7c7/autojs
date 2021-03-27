/**
 * 趣头条-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.jifen.qukan';

// 任务-文章
function taskNews() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskNews start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (text('点击展开更多').exists()) {
        clicks.centerXyByText('点击展开更多');
    }

    if (text('日常任务').exists() && !text('立即阅读').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('立即阅读')) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (!others.backToElement(text('刷新'))) {
            return false;
        }

        clicks.xy(300, 1300);

        for (var j = 0; j < 4; j++) {
            swipes.down();
            sleeps.s2to3();
        }

        reward();
    }

    return true;
}

// 任务-视频
function taskVideo() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskVideo start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (text('点击展开更多').exists()) {
        clicks.centerXyByText('点击展开更多');
    }

    if (text('日常任务').exists() && !text('观看视频').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('观看视频')) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (!others.backToElement(text('刷新'))) {
            return false;
        }

        sleeps.s2to3();
        clicks.xy(495, 457);
        sleeps.s10to20();
        reward();
    }

    return true;
}

// 任务-Ad
function taskAd() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskAd start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    for (var i = 0; i < 5; i++) {
        if (text('日常任务').exists() && !text('看视频领金币').exists()) {
            return true;
        }

        if (!clicks.centerXyByText('看视频领金币')) {
            return false;
        }

        if (!others.closeAdBackToElement(text('日常任务'))) {
            return false;
        }
    }

    return true;
}

// 任务-视频滑动
function taskVideoSwipe() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskVideoSwipe start ----------');

    if (!others.backToElement(text('小视频'))) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        text('小视频').exists() && swipes.down1600();

        if (textStartsWith('观看该视频可获得').exists()) {
            sleeps.s25();
        } else if (text('小视频').exists()) {
            sleeps.s2to5();
        }

        reward();
    }

    return true;
}

// 阅读奖励
function reward() {
    if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 210, 240)) {
        clicks.elementWidthHeight(className('android.widget.FrameLayout'), 210, 240);
        if (exists.elementWidthHeight(className('android.widget.TextView'), 120, 120)) {
            clicks.elementWidthHeight(className('android.widget.TextView'), 120, 120);
        }
    }
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


        status0 = taskVideo();
        status1 = taskNews();
        status2 = taskAd();
        taskVideoSwipe();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

module.exports = currentAPP;
