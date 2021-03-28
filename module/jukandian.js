/**
 * 聚看点-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.xiangzi.jukandian';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, 'taskCheckin start ----------');

    if (id('v2_sign_sign_button').exists() && !clicks.centerXyById('v2_sign_sign_button')) {
        return false;
    }

    if (id('dialog_reward_video_text').exists() && clicks.centerXyById('dialog_reward_video_text')) {
        others.closeAdBackToElement(textStartsWith('明日签到'));
    }

    if (id('v2_sign_tomorrow_profit_text').exists() && clicks.centerXyById('v2_sign_close_button')) {
        return true;
    }

    if (!others.backToElement(text('任务中心'))) {
        return false;
    }

    if (textStartsWith('明日签到').exists()) {
        return true;
    }

    return false;
}

// 任务-Ad
function taskAd() {
    log('----------', currentAPP.NAME, 'taskAd start ----------');

    for (var i = 0; i < 3; i++) {
        if (clicks.textIfExists('视频赚') && !text('视频赚').exists()) {
            others.closeAdBackToElement(text('视频赚'));
        }

        if (clicks.textIfExists('视频红包') && !text('视频红包').exists()) {
            others.closeAdBackToElement(text('视频红包'));
        }
    }

    return true;
}

// 任务-看新闻
function taskNews() {
    log('----------', currentAPP.NAME, 'taskNews start ----------');

    if (!others.backToElement(text('看点'))) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        clicks.textIfExists('忽略');
        if (!others.backToElement(text('刷新'))) {
            return false;
        }
        clicks.textIfExists('忽略');

        clicks.xy(608, 944);

        for (var j = 0; j < 5; j++) {
            sleeps.s2to3();
            swipes.down1000_100();
            sleeps.s2to3();
            swipes.refresh400_100();
        }
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 3; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME);
        if (!status0) {
            return true;
        }


        status0 = taskCheckin();
        status1 = taskAd();
        status2 = taskNews();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

module.exports = currentAPP;
