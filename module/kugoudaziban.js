/**
 * 酷狗大字版-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.kugou.android.elder';
currentAPP.VERSION = '1.9.1';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2020/11/24/7/120_64c8de54ecbe5b5f5874094150394abe.apk';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskCheckin start ----------');

    if (!others.backToElement(text('赚钱'))) {
        return false;
    }

    swipes.down();

    if (text('明天签到').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('签到')) {
        return false;
    }
    others.back();

    if (text('明天签到').exists()) {
        return true;
    }

    return false;
}

// 任务-Ad
function taskAd() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskAd start ----------');

    if (!others.backToElement(text('赚钱'))) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (!clicks.textIfExists('去赚钱')) {
            break;
        }

        if (!others.closeAdBackToElement(text('明天签到'))) {
            return false;
        }
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 6; i++) {
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
