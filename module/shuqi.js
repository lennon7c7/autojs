/**
 * 书旗免费小说-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.shuqi.controller';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);
currentAPP.VERSION = '11.2.4.122';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2020/11/19/7/110_edc4659a403106f257a7b22c9009c9d1.apk';

// 任务-福利转转转
// 已下架
function taskLottery() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!clicks.backToElement(text('书架'))) {
        return false;
    }

    swipes.right300();
    clicks.centerXyByText('福利转转转');
    for (var i = 0; i < 10; i++) {
        if (text('您还有0次抽奖机会').exists() || desc('您还有0次抽奖机会').exists()) {
            return true;
        }

        if (!clicks.centerXyByTextOrDesc('161233723098511')) {
            continue;
        }
        sleeps.s10();
        if (!clicks.centerXyByTextOrDesc('收下奖励')) {
            continue;
        }
    }

    return false;
}

// 任务-Ad
function taskAd() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    for (var i = 0; i < 11; i++) {
        if (text('明日继续领金币').exists()) {
            return true;
        }

        if (!clicks.centerXyByTextOrDesc('快速得百万金币')) {
            return false;
        }

        if (text('快速得百万金币').exists()) {
            continue;
        }

        if (!others.closeAdBackToElement(text('福利'))) {
            return false;
        }
    }

    return false;
}

// 任务-分享
function taskShare() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!exists.backToElement(text('福利'))) {
        return false;
    }

    if (text('今日已领取').exists()) {
        return true;
    }

    if (!clicks.text('每日邀请书友一起读赚金币')) {
        return false;
    }

    if (!clicks.centerXyByText('微信好友')) {
        return false;
    }

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    if (text('今日已领取').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!exists.backToElement(text('福利'))) {
        return false;
    }

    for (var i = 0; i < 5; i++) {
        clicks.textIfExists('领取奖励');
    }

    if (!exists.moneyEgt5(textStartsWith('约'))) {
        return true;
    }

    if (!clicks.centerXyByText('去提现')) {
        return false;
    }
    sleeps.s5();

    if (!clicks.centerXyByText('立即提现')) {
        return false;
    }

    // 需要短信验证码

    return true;
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


        // taskLottery();
        status0 = taskAd();
        status1 = taskShare();

        if (status0 && status1) {
            return true;
        }

        others.clear();
    }

    others.send(currentAPP.NAME);

    return false;
};

module.exports = currentAPP;
