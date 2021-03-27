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

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskCheckin start ----------');

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
    log('----------', currentAPP.PACKAGE_NAME, 'taskAd start ----------');

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

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(currentAPP.PACKAGE_NAME);

        status0 = taskCheckin();
        status1 = taskAd();

        if (status0 && status1) {
            return true;
        }
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

module.exports = currentAPP;
