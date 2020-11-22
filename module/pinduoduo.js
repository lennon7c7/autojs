/**
 * 拼多多-任务
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.xunmeng.pinduoduo';

/**
 * 任务-签到
 */
function taskCheckin() {
    if (!clicks.centerXyByText('现金签到') && !clicks.centerXyByText('签到领钱')) {
        return false;
    }
    sleeps.s2to3();

    if (text('还有现金权益待领取').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('立即签到')) {
        return false;
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        status = taskCheckin();

        if (status) {
            return true;
        }
    }

    others.send('pinduoduo');

    return false;
};

module.exports = s;
