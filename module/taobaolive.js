var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.NAME = '淘宝直播';
currentAPP.PACKAGE_NAME = 'com.taobao.live';
currentAPP.VERSION = '1.8.29';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2020/11/20/0/110_fcec802603327179a881f6c77cd315de.apk';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskCheckin start ----------');

    if (!clicks.backToElement(id('homepage2_anchor_guard_entry'))) {
        return false;
    }

    if (textStartsWith('签到成功').exists() ||
        (!textStartsWith('签到成功').exists() && text('已签到').exists())) {
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
        others.launch(currentAPP.PACKAGE_NAME);

        status0 = taskCheckin();

        if (status0) {
            return true;
        }

        others.clear();
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

module.exports = currentAPP;
