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

    if (text('还有现金权益待领取').exists() || textEndsWith('现金未领取').exists() || text('提现').exists()) {
        return true;
    }

    if (text('立即签到').exists() && clicks.centerXyByText('立即签到')) {
    } else if (text('签到领现金').exists() && clicks.elementWidthHeight(text('签到领现金'), 264, 123)) {
    } else if (text('签到领钱').exists() && clicks.centerXyByText('签到领钱')) {
    } else if (others.back() && text('立即签到').exists() && clicks.centerXyByText('立即签到')) {
    } else {
        return false;
    }

    if (text('还有现金权益待领取').exists() || textEndsWith('现金未领取').exists() || text('提现').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', s.PACKAGE_NAME, 'taskCashout start ----------');

    !text('签到领钱').exists() && others.back();

    if (text('现金签到').exists() && clicks.centerXyByText('现金签到')) {
    } else if (text('签到领钱').exists() && clicks.centerXyByText('签到领钱')) {
    } else {
        return false;
    }
    sleeps.s2to3();

    if (text('今日已提').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('去提现')) {
        return false;
    }

    if (!clicks.centerXyByText('提现')) {
        return false;
    }

    if (text('打款中，24小时内到账').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-摸猫
 */
function taskCat() {
    log('----------', s.PACKAGE_NAME, 'taskCat start ----------');

    if (!clicks.textIfExists('招财猫')) {
        return false;
    }
    sleeps.s2to5();

    clicks.text('领猫粮');

    if (exists.parent(text('逛街60秒免费拿'), text('去完成'))) {
        clicks.parent(text('逛街60秒免费拿'), text('去完成'));

        for (var i = 0; i < 60; i++) {
            text('猫粮商店').exists() && swipes.down();
        }
        text('猫粮商店').exists() && others.back();
    }

    if (text('100').exists() && text('喂养').exists()) {
        clicks.text('喂养');

        clicks.text('赚现金');
        if (text('摸一摸').exists()) {
            clicks.text('摸一摸');
        }
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

        status0 = taskCheckin();
        status1 = taskCashout();
        status2 = taskCat();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send('pinduoduo');

    return false;
};

module.exports = s;
