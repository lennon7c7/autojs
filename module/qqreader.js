/**
 * QQ阅读-任务
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.qq.reader';

// 任务-宝箱
// every 1h
function taskTreasureBox() {
    log('---------- taskTreasureBox start ----------');

    if (textEndsWith('后可领').exists()) {
        return true;
    }

    if (!clicks.text('开宝箱得金币')) {
        return false;
    }

    if (textEndsWith('后可领').exists()) {
        return true;
    }

    return false;
}

// 任务-Ad
function taskAd() {
    log('---------- taskAd start ----------');

    if (text('每次都拿金币，已看10/10').exists()) {
        return true;
    }

    for (var i = 0; i < 11; i++) {
        if (clicks.textIfExists('马上看')) {
            closeAd();
        }
    }

    if (text('每次都拿金币，已看10/10').exists()) {
        return true;
    }

    return false;
}

// 任务-添加书籍
function taskAddBook() {
    log('---------- taskAddBook start ----------');

    if (text('将书籍加入书架即可获得金币').findOne().parent().findOne(text('明天再来'))) {
        return true;
    }

    if (!clicks.text('去精选')) {
        return false;
    }

    clicks.xy(405, 432);

    if (!clicks.centerXyByText('加书架')) {
        return false;
    }

    if (text('将书籍加入书架即可获得金币').findOne().parent().findOne(text('明天再来'))) {
        return true;
    }

    return false;
}

// 关闭广告
function closeAd() {
    if (id('tt_top_mute').exists()) {
        clicks.centerXyById('tt_top_mute');
    }

    sleeps.s60to70();

    others.back();

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        if (!clicks.text('免费')) {
            return false;
        }

        if (!clicks.text('福利')) {
            return false;
        }

        swipes.down();

        status0 = taskTreasureBox();
        status2 = taskAd();
        status1 = taskAddBook();

        if (status0 && status1 && status2) {
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

    if (!clicks.text('免费')) {
        return false;
    }

    if (!clicks.text('福利')) {
        return false;
    }

    swipes.down();

    taskTreasureBox();
};

module.exports = s;
