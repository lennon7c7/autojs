/**
 * 番茄-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.dragon.read';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);
currentAPP.VERSION = '3.1.1';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2020/07/19/8/120_187f19f4e3c69034c128773d04bf5382.apk';

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    if (textStartsWith('看视频再领').exists()) {
        if (!clicks.element(textStartsWith('看视频再领'))) {
            return false;
        }

        if (!others.closeAdBackToElement(text('福利'))) {
            return false;
        }
    }

    if (text('开宝箱得金币').find().size() === 1) {
        return true;
    }

    if (!clicks.text('开宝箱得金币')) {
        return false;
    }

    if (!clicks.element(textStartsWith('看视频再领'))) {
        return false;
    }

    if (!others.closeAdBackToElement(text('开宝箱得金币'))) {
        return false;
    }

    if (text('开宝箱得金币').find().size() === 1) {
        return true;
    }

    return false;
}

// 任务-Ad
function taskAd() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    if (exists.parents(text('看视频赚海量金币'), text('已完成'))) {
        return true;
    }

    for (var i = 0; i < 11; i++) {
        if (!clicks.text('立即观看')) {
            return false;
        }

        if (!others.closeAdBackToElement(text('福利'))) {
            return false;
        }
    }

    if (exists.parents(text('看视频赚海量金币'), text('已完成'))) {
        return true;
    }

    return false;
}

// 任务-添加书籍
function taskAddBook() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    if (exists.parents(text('加入书架'), text('已完成'))) {
        return true;
    }

    if (!clicks.text('去书城')) {
        return false;
    }

    clicks.xy(309, 788);
    sleeps.s2to3();

    if (!clicks.text('加入书架')) {
        return false;
    }

    others.back();

    if (!clicks.centerXyByText('福利')) {
        return false;
    }

    if (exists.parents(text('加入书架'), text('已完成'))) {
        clicks.centerXyByText('书架') && clicks.centerXyByText('编辑') && clicks.xy(258, 612) && clicks.centerXyByText('删除(1)') && clicks.centerXyByText('确认');
        return true;
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    if (!exists.moneyEgt15(textContains('.'))) {
        return true;
    }

    if (!clicks.text('现金金额：')) {
        return false;
    }

    if (!clicks.text('去提现')) {
        return false;
    }

    if (textStartsWith('当前余额不足').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('提现15.00元')) {
        return false;
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 9; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME);
        if (!status0) {
            return true;
        }


        status0 = taskTreasureBox();
        status1 = taskAd();
        // status2 = taskAddBook();
        status3 = taskCashout();

        if (status0 && status1 && status3) {
            return true;
        }
    }

    others.send(currentAPP.NAME);

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
};

module.exports = currentAPP;
