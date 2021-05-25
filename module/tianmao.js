/**
 * 天猫-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.tmall.wireless';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);
currentAPP.VERSION = '9.10.0';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2020/07/23/6/110_7db33a7cba728e6c4ad7c98e4d02e857.apk';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!others.backToElement(text('我'))) {
        return false;
    }

    if (!clicks.centerXyByText('红包签到')) {
        return false;
    }

    if (text('明日来领翻倍红包').exists() || text('记得明天再来哦').exists() || text('明日再来').exists() || text('明日两倍').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('点击领取今日奖励')) {
        return false;
    }

    if (text('开心收下，明天继续领').exists()) {
        return true;
    }

    if (text('明日来领翻倍红包').exists() || text('记得明天再来哦').exists() || text('明日再来').exists() || text('明日两倍').exists()) {
        return true;
    }

    return false;
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


        status = taskCheckin();

        if (status) {
            return true;
        }
    }

    others.send(currentAPP.NAME);

    return false;
};

module.exports = currentAPP;
