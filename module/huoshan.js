/**
 * 火山-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.ss.android.ugc.livelite';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    log('----------', currentAPP.NAME, 'taskTreasureBox start ----------');

    if (!others.backToElement(text('红包'))) {
        return false;
    }

    if (textStartsWith('看广告').exists()) {
        clicks.element(textStartsWith('看广告'));

        if (!others.closeAdBackToElement(text('红包'))) {
            return false;
        }
    }

    clicks.xy(945, 485);
    clicks.xy(945, 485);
    others.back();

    if (text('开宝箱得金币').find().size() === 1) {
        return true;
    }

    if (!clicks.centerXyByText('开宝箱得金币')) {
        return false;
    }

    if (clicks.element(textStartsWith('看视频'))) {
        if (!others.closeAdBackToElement(text('红包'))) {
            return false;
        }
    }
    clicks.textIfExists('javascript:;');

    if (text('开宝箱得金币').find().size() === 1) {
        return true;
    }

    return false;
}

// 任务-20次广告
function taskAd20() {
    log('----------', currentAPP.NAME, 'taskAd20 start ----------');

    if (!others.backToElement(text('红包'))) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (clicks.textIfExists('领100金币')) {
            if (!others.closeAdBackToElement(text('红包'))) {
                return false;
            }
        } else if (clicks.textIfExists('去赚钱')) {
            if (!others.closeAdBackToElement(text('红包'))) {
                return false;
            }
        }
    }

    return true;
}

// 任务-睡觉赚钱
function taskSleep() {
    log('----------', currentAPP.NAME, 'taskSleep start ----------');

    if (!others.backToElement(text('红包'))) {
        return false;
    }

    if (!clicks.centerXyByText('睡觉赚金币')) {
        return false;
    }

    if (text('我要睡了').exists() && clicks.centerXyByText('我要睡了')) {
    } else if (text('我睡醒了').exists() && clicks.centerXyByText('我睡醒了')) {
    }

    if (text('可领取').exists()) {
        clicks.centerXyByText('可领取');
    }

    return true;
}

// 任务-晒收入
function taskShare() {
    log('----------', currentAPP.NAME, 'taskShare start ----------');

    if (!others.backToElement(text('红包'))) {
        return false;
    }

    if (exists.parent(text('晒收入'), text('已完成'))) {
        return true;
    }

    if (!clicks.text('晒收入')) {
        return false;
    }

    if (!clicks.centerXyByText('微信')) {
        clicks.textIfExists('javascript:;');
        return false;
    }

    for (var i = 0; i < 4; i++) {
        if (!clicks.centerXyByText('去粘贴')) {
            clicks.textIfExists('javascript:;');
            return false;
        }

        others.back();
    }

    clicks.textIfExists('javascript:;');

    if (exists.parent(text('晒收入'), text('已完成'))) {
        return true;
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', currentAPP.NAME, 'taskCashout start ----------');

    if (!others.backToElement(text('红包'))) {
        return false;
    }

    if (exists.parent(text('0.2元提现'), text('已完成'))) {
        return true;
    }

    if (!clicks.centerXyByText('立即提现')) {
        return false;
    }

    if (!clicks.centerXyByText('0.20')) {
        return false;
    }

    if (text('余额不足，快去做任务赚钱吧！').exists()) {
        return true;
    }

    others.back2();

    if (exists.parent(text('0.2元提现'), text('已完成'))) {
        return true;
    }

    return false;
}

// 任务-视频
function taskVideo() {
    log('----------', currentAPP.NAME, 'taskVideo start ----------');

    if (!others.backToElement(text('首页'))) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        swipes.down1600();

        if (text('15S').exists() || text('14S').exists() || text('13S').exists() || text('12S').exists() || text('11S').exists()
            || text('10S').exists() || text('9S').exists() || text('8S').exists()
        ) {
            sleeps.s15();
            clicks.centerXyByText('领取')
        } else if (text('剩余2次').exists()) {
            swipes.refresh600();
            clicks.centerXyByText('剩余2次');
        } else if (text('剩余1次').exists()) {
            swipes.refresh600();
            clicks.centerXyByText('剩余1次');
        } else {
            sleeps.s2to5();
        }
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 18; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME);
        if (!status0) {
            return true;
        }


        status0 = taskTreasureBox();
        taskAd20();
        taskSleep();
        taskShare();
        taskCashout();
        taskVideo();

        if (status0) {
            return true;
        }
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

/**
 * 定时入口调用
 * @returns {boolean}
 */
currentAPP.cron = function () {
    status0 = others.launch(currentAPP.PACKAGE_NAME);
    if (!status0) {
        return true;
    }


    taskTreasureBox();
    taskAd20();
};

module.exports = currentAPP;
