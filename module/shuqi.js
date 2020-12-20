/**
 * 书旗免费小说-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.shuqi.controller';

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, 'taskAd start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (text('明日继续领金币').exists()) {
            return true;
        }

        if (!clicks.text('快速得百万金币')) {
            continue;
        }

        closeAd();
    }

    return false;
}

// 任务-分享
function taskShare() {
    log('----------', s.PACKAGE_NAME, 'taskShare start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    if (text('今日已领取').exists()) {
        return true;
    }

    if (!clicks.text('每日邀请书友一起读赚金币')) {
        return false;
    }

    if (!clicks.centerXyByText('微信好友')) {
        others.back();
        return false;
    }

    others.back();

    if (text('今日已领取').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', s.PACKAGE_NAME, 'taskCashout start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    for (var i = 0; i < 5; i++) {
        clicks.textIfExists('领取奖励');
    }

    if (!clicks.centerXyByText('去提现')) {
        return false;
    }
    sleeps.s5();
  
    if (!clicks.centerXyByText('立即提现')) {
        return false;
    }

    return true;
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

        if (text('书架').exists() && text('我的').exists()) {
            return true;
        }
    }

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        status0 = taskAd();
        status1 = taskShare();
        status2 = taskCashout();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send('shuqi');

    return false;
};

module.exports = s;
