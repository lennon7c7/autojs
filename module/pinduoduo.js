/**
 * 拼多多-任务
 * @version 5.45.0
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

    if (!others.backToElement(id('name').text('签到'))) {
        return false;
    }

    if (text('今日已提').exists() || text('去解锁').exists()) {
        return true;
    }

    if (text('立即签到').exists()) {
        clicks.centerXyByText('立即签到');
    } else if (text('签到领现金').exists()) {
        clicks.elementWidthHeight(text('签到领现金'), 264, 123);
    } else if (text('签到领钱').exists()) {
        clicks.centerXyByText('签到领钱');
    }

    if (textStartsWith('签到成功').exists() || textEndsWith('现金未领取').exists() || text('提现').exists()) {
        clicks.textIfExists('稍后再提');
        return true;
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', s.PACKAGE_NAME, 'taskCashout start ----------');

    if (!others.backToElement(id('name').text('签到'))) {
        return false;
    }

    if (text('今日已提').exists() || text('去解锁').exists()) {
        return true;
    }

    if (textStartsWith('确认提现').exists() && text('提现').exists()) {
        clicks.centerXyByText('提现');
    }

    if (text('微信提现特权').exists() && text('去提现').exists()) {
        clicks.centerXyByText('去提现');
    }

    if (text('打款中，24小时内到账').exists()) {
        clicks.centerXyByText('我知道了');
        return true;
    }

    return false;
}

/**
 * 任务-摸猫
 */
function taskCat() {
    log('----------', s.PACKAGE_NAME, 'taskCat start ----------');

    if (!others.backToElement(text('招财猫'))) {
        return false;
    }
    sleeps.s2to5();

    clicks.text('领猫粮');
    sleeps.s2to5();

    if (exists.parent(text('逛街60秒免费拿'), text('去完成'))) {
        clicks.parent(text('逛街60秒免费拿'), text('去完成'));

        for (var i = 0; i < 66; i++) {
            swipes.down();
        }

        if (!others.backToElement(text('领猫粮'))) {
            return false;
        }
    }

    if (exists.parents(text('浏览活动得猫粮免费领'), text('去完成'))) {
        clicks.parents(text('浏览活动得猫粮免费领'), text('去完成'));

        for (var i = 0; i < 66; i++) {
            swipes.down();
            if (exists.elementWidthHeight(className('android.widget.Button'), 90, 87)) {
                clicks.elementWidthHeight(className('android.widget.Button'), 90, 87);
            }
        }

        if (!others.backToElement(text('领猫粮'))) {
            return false;
        }
    }

    if (exists.parent(text('去免费领路费'), text('去完成'))) {
        clicks.parent(text('去免费领路费'), text('去完成'));

        if (!others.backToElement(text('领猫粮'))) {
            return false;
        }
        clicks.textIfExists('领取');
    }

    if (clicks.textIfExists('喂养')) {
        clicks.textIfExists('喂养100克猫粮');

        clicks.textIfExists('赚现金');
        clicks.textIfExists('赚签到金');
        clicks.textIfExists('摸一摸');
        clicks.textIfExists('去签到');
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 10; i++) {
        others.launch(s.PACKAGE_NAME);

        status0 = taskCheckin();
        status1 = taskCashout();
        // status2 = taskCat();

        if (status0 && status1) {
            return true;
        }

        others.clear();
    }

    others.send(s.PACKAGE_NAME);

    return false;
};

module.exports = s;
