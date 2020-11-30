/**
 * 拼多多-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.xunmeng.pinduoduo';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    if (text('现金签到').exists() && clicks.centerXyByText('现金签到')) {
    } else if (text('签到领钱').exists() && clicks.centerXyByText('签到领钱')) {
    } else {
        return false;
    }
    sleeps.s2to3();

    if (text('还有现金权益待领取').exists() || text('提现').exists()) {
        return true;
    }

    if (text('签到领现金').exists() && clicks.elementWidthHeight(text('签到领现金'), 264, 123)) {
    } else if (text('签到领钱').exists() && clicks.centerXyByText('签到领钱')) {
    } else if (others.back() && text('立即签到').exists() && clicks.centerXyByText('立即签到')) {
    } else {
        return false;
    }

    if (text('还有现金权益待领取').exists() || text('提现').exists()) {
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

        status = taskCheckin();

        if (status) {
            return true;
        }
    }

    others.send('pinduoduo');

    return false;
};

module.exports = s;
