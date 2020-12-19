/**
 * 番茄-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.dragon.read';

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    log('----------', s.PACKAGE_NAME, 'taskTreasureBox start ----------');

    if (!clicks.centerXyByText('福利')) {
        return false;
    }

    if (textStartsWith('看视频再领').exists()) {
        clicks.element(textStartsWith('看视频再领'));
        closeAd();
    }

    if (text('开宝箱得金币').find().size() === 1) {
        return true;
    }

    if (!clicks.text('开宝箱得金币')) {
        return false;
    }

    clicks.element(textStartsWith('看视频再领'));

    closeAd();

    if (text('开宝箱得金币').find().size() === 1) {
        return true;
    }

    return false;
}

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, 'taskAd start ----------');

    if (exists.parents(text('看视频赚海量金币'), text('已完成'))) {
        return true;
    }

    for (var i = 0; i < 10; i++) {
        if (!clicks.text('立即观看')) {
            return false;
        }

        closeAd();
    }

    if (exists.parents(text('看视频赚海量金币'), text('已完成'))) {
        return true;
    }

    return false;
}

// 任务-添加书籍
function taskAddBook() {
    log('----------', s.PACKAGE_NAME, 'taskAddBook start ----------');

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

/**
 * 定时入口调用
 * @returns {boolean}
 */
s.cron = function () {
    others.launch(s.PACKAGE_NAME);

    taskTreasureBox();
};

module.exports = s;
