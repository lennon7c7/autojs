/**
 * 天猫-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.tmall.wireless';
s.VERSION = '9.10.0';
s.APK = 'https://android-apps.pp.cn/fs08/2020/07/23/6/110_7db33a7cba728e6c4ad7c98e4d02e857.apk';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    if (!others.backToElement(text('我'))) {
        return false;
    }

    if (!clicks.centerXyByText('红包签到')) {
        return false;
    }

    if (text('明日来领翻倍红包').exists() || text('记得明天再来哦').exists() || text('明日再来').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('点击领取今日奖励')) {
        return false;
    }

    if (text('开心收下，明天继续领').exists()) {
        return true;
    }

    if (text('明日来领翻倍红包').exists() || text('记得明天再来哦').exists() || text('明日再来').exists()) {
        return true;
    }

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 10; i++) {
        others.launch(s.PACKAGE_NAME);

        status = taskCheckin();

        if (status) {
            return true;
        }
    }

    others.send(s.PACKAGE_NAME);

    return false;
};

module.exports = s;
