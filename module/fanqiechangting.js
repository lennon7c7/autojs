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
        clicks.element(textStartsWith('看视频再领'));
        closeAd();
    }

    if (!clicks.text('图片')) {
        return false;
    }

    if (textStartsWith('看视频领取').exists()) {
        clicks.element(textStartsWith('看视频领取'));
        closeAd();
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

    for (var i = 0; i < 10; i++) {
        if (!clicks.textIfExists('立即观看')) {
            return false;
        }

        closeAd();
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

function closeAd() {
    sleeps.s3();
    if (id('tt_top_mute').exists()) {
        clicks.centerXyById('tt_top_mute');
    }

    sleeps.s20();

    for (var j = 0; j < 15; j++) {
        sleeps.s3();
        if (id('tt_video_ad_close_layout').exists()) {
            clicks.centerXyById('tt_video_ad_close_layout');
            return true;
        }
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
