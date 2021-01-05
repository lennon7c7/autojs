/**
 * 番茄畅听-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.xs.fm';

// 任务-宝箱
// every 1h
function taskTreasureBox() {
    log('----------', s.PACKAGE_NAME, 'taskTreasureBox start ----------');

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

    if (!clicks.text('图片')) {
        return false;
    }

    if (textStartsWith('看视频领取').exists()) {
        if (!clicks.element(textStartsWith('看视频领取'))) {
            return false;
        }

        if (!others.closeAdBackToElement(text('福利'))) {
            return false;
        }
    }

    return true;
}

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, 'taskAd start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    if (exists.parents(text('看视频赚金币'), text('已完成'))) {
        return true;
    }

    for (var i = 0; i < 11; i++) {
        if (!clicks.textIfExists('立即观看')) {
            return false;
        }

        if (!others.closeAdBackToElement(text('福利'))) {
            return false;
        }
    }

    if (exists.parents(text('看视频赚金币'), text('已完成'))) {
        return true;
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', s.PACKAGE_NAME, 'taskCashout start ----------');

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

    if (!clicks.centerXyByText('15.00')) {
        return false;
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 9; i++) {
        others.launch(s.PACKAGE_NAME);

        status0 = taskTreasureBox();
        status1 = taskAd();
        status2 = taskCashout();

        if (status0 && status1 && status2) {
            return true;
        }
 
        others.clear();
   }

    others.send('fanqiechangting');

    return false;
};

/**
 * 定时入口调用
 * @returns {boolean}
 */
s.cron = function () {
    others.launch(s.PACKAGE_NAME);

    taskTreasureBox();
};

module.exports = s;
