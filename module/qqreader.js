/**
 * QQ阅读-任务
 * @version 7.5.3
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.qq.reader';

// 任务-宝箱
// every 1h
function taskTreasureBox() {
    log('----------', s.PACKAGE_NAME, 'taskTreasureBox start ----------');

    clicks.textIfExists('取消');
    if (!others.backToElement(id('main_tab_free_text').text('免费'))) {
        return false;
    }

    clicks.textIfExists('继续领金币');

    swipes.down();

    if (textEndsWith('后可领').exists() || text('明天再领').exists()) {
        return true;
    }

    if (!clicks.text('开宝箱得金币')) {
        return false;
    }

    if (textEndsWith('后可领').exists() || text('明天再领').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    if (text('今日已领').exists()) {
        return true;
    }

    if (!clicks.text('打卡领金币')) {
        return false;
    }

    others.back();

    if (text('今日已领').exists()) {
        return true;
    }

    return false;
}

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, 'taskAd start ----------');

    clicks.textIfExists('取消');
    if (!others.backToElement(id('main_tab_free_text').text('免费'))) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (text('每次都拿金币，已看20/20').exists()) {
            return true;
        }

        if (!clicks.text('马上看')) {
            return false;
        }

        if (!others.closeAdBackToElement(text('日常福利'))) {
            return false;
        }
    }

    return false;
}

// 任务-添加书籍
function taskAddBook() {
    log('----------', s.PACKAGE_NAME, 'taskAddBook start ----------');

    if (!others.backToElement(id('main_tab_free_text').text('免费'))) {
        return false;
    }

    if (exists.parent(text('将书籍加入书架即可获得金币'), text('明天再来'))) {
        return true;
    }

    if (!clicks.centerXyByText('去精选')) {
        return false;
    }

    clicks.xy(405, 432);

    if (!clicks.centerXyByText('加书架')) {
        return false;
    }

    if (exists.parent(text('将书籍加入书架即可获得金币'), text('明天再来'))) {
        return true;
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', s.PACKAGE_NAME, 'taskCashout start ----------');

    if (!others.backToElement(id('main_tab_free_text').text('免费'))) {
        return false;
    }

    if (!exists.moneyEgt15(textContains('15.'))) {
        return true;
    }

    if (!clicks.text('现金收益')) {
        return false;
    }

    if (!clicks.centerXyByText('去提现')) {
        return false;
    }

    if (!clicks.centerXyByText('提现 ¥ 15.00')) {
        return false;
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 12; i++) {
        others.launch(s.PACKAGE_NAME);

        status0 = taskTreasureBox();
        status4 = taskCheckin();
        status1 = taskAd();
        status2 = taskAddBook();
        status3 = taskCashout();

        if (status0 && status1 && status2 && status3 && status4) {
            return true;
        }
    }

    others.send('qqreader');

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
