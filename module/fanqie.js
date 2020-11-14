/**
 * 番茄-任务
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.dragon.read';

// 任务-Ad
function taskAd() {
    log('---------- taskAd start ----------');

    if (text('看视频赚海量金币').findOne().parent().parent().findOne(text('已完成'))) {
        return true;
    }

    for (var i = 0; i < 10; i++) {
        if (!clicks.text('立即观看')) {
            return false;
        }

        closeAd();
    }

    if (text('看视频赚海量金币').findOne().parent().parent().findOne(text('已完成'))) {
        return true;
    }

    return false;
}

// 任务-宝箱
// every 1h
function taskTreasureBox() {
    log('---------- taskTreasureBox start ----------');

    if (text('开宝箱得金币').find().size() == 1) {
        return true;
    }

    if (!clicks.text('开宝箱得金币')) {
        return false;
    }

    others.back();

    if (text('开宝箱得金币').find().size() == 1) {
        return true;
    }

    return false;
}

// 任务-添加书籍
function taskAddBook() {
    log('---------- taskAddBook start ----------');

    if (text('加入书架').findOne().parent().parent().findOne(text('已完成'))) {
        return true;
    }

    if (!clicks.text('去书城')) {
        return false;
    }

    if (!clicks.text('推荐')) {
        return false;
    }

    if (!clicks.xy(492, 1970)) {
        return false;
    }

    if (!clicks.text('加入书架')) {
        return false;
    }

    others.back();

    if (!clicks.centerXyByText('福利')) {
        return false;
    }

    if (text('加入书架').findOne().parent().parent().findOne(text('已完成'))) {
        return true;
    }

    return false;
}

function closeAd() {
    clicks.centerXyById('tt_top_mute');

    sleeps.s35to40();

    clicks.centerXyById('tt_video_ad_close_layout');

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        if (!clicks.centerXyByText('福利')) {
            return false;
        }

        status0 = taskTreasureBox();
        status1 = taskAd();
        status2 = taskAddBook();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send('fanqie');

    return false;
};

module.exports = s;