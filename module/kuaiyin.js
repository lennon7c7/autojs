/**
 * 快音-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.kuaiyin.player';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);
currentAPP.VERSION = '4.00.01';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2021/01/30/1/122_4b2b07f21638d3e320db17e5dbb7ce46.apk';

// 任务-Ad
function taskAd10() {
    log('----------', currentAPP.NAME, 'taskAd10 start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    element = textStartsWith('看视频领取')
    if (element.exists()) {
        clicks.centerXyByText(element.findOne().text());

        others.closeAdBackToElement(text('福利'));
    }

    for (var i = 0; i < 1; i++) {
        if (!others.backToElement(text('福利'))) {
            return false;
        }

        clicks.centerXyByText('看视频赚钱');

        others.closeAdBackToElement(text('福利'));
        clicks.idIfExists('tv_close_bottom');
    }

    return true;
}

// 任务-Ad
function taskAd4() {
    log('----------', currentAPP.NAME, 'taskAd4 start ----------');

    for (var i = 0; i < 5; i++) {
        if (!others.backToElement(text('福利'))) {
            return false;
        }

        if (!clicks.centerXyById('coinEarn')) {
            return false;
        }

        if (text('看视频领金币（4/4）').exists()) {
            return true;
        }

        if (!clicks.centerXyByText('立即观看')) {
            return false;
        }

        others.closeAdBackToElement(text('福利'));
        clicks.idIfExists('tv_close_bottom');
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', currentAPP.NAME, 'taskCashout start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    if (!exists.moneyEgt1(id('cashEarn'))) {
        return true;
    }

    if (!clicks.centerXyByText('提现')) {
        return false;
    }

    if (!clicks.centerXyByText('去提现')) {
        return false;
    }

    if (!clicks.centerXyByText('立即提现')) {
        return false;
    }

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


        status0 = taskAd10();
        status1 = taskAd4();
        status2 = taskCashout();

        if (status0 && status1 && status2) {
            return true;
        }

        others.clear();
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

module.exports = currentAPP;
