/**
 * 腾讯NOW直播-任务
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.tencent.now';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('---------- taskCheckin start ----------');

    if (!clicks.elementWidthHeight(className('android.widget.FrameLayout'), 219, 273)) {
        return false;
    }

    if (!clicks.centerXyByText('每日签到>')) {
        return false;
    }

    if (text('今日已签到').exists()) {
        return true;
    }
  
    if (!clicks.centerXyByText('签到领取红包')) {
        return false;
    }

    if (text('今日已签到').exists()) {
        return true;
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

        if (!clicks.centerXyByText('首页')) {
            return false;
        }
    
        status0 = taskCheckin();

        if (status0) {
            return true;
        }
    }

    others.send('tencentnow');

    return false;
};

module.exports = s;
