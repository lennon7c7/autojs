/**
 * 喜马拉雅-任务
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.ximalaya.ting.lite';

/**
 * 任务-签到
 */
function taskCheckin() {
    toastLog('---------- taskCheckin start ----------');

    if (!clicks.centerXyByText('福利') || !text('每日福利').exists()) {
        return false;
    }

    return true;
}

/**
 * 任务-视频
 */
function taskVideo() {
    log('---------- taskVideo start ----------');

    if (!clicks.centerXyByText('福利') || !text('每日福利').exists()) {
        return false;
    }

    if (clicks.centerXyByText('看视频')) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 90, 90);
        sleeps.s35to40();

        if (id('tt_video_ad_close_layout').exists()) {
            clicks.centerXyById('tt_video_ad_close_layout');
        }

        others.back3();
    }

    for (var i = 0; i < 10; i++) {
        buttonClick = null;
        if (text('看一次赚50金币').exists()) {
            buttonClick = text('看一次赚50金币').findOne().parent().findOne(text('已完成'));
            if (buttonClick != null) {
                return true;
            }

            buttonClick = text('看一次赚50金币').findOne().parent().findOne(text('去观看'));
        }
        if (buttonClick != null) {
            clicks.centerXyByText('看一次赚50金币');
            clicks.elementWidthHeight(className('android.widget.ImageView'), 90, 90);
            sleeps.s35to40();
            others.back3();
        }
    }

    return false;
}

/**
 * 任务-新闻
 */
function taskNews() {
    log('---------- taskNews start ----------');

    if (!clicks.centerXyByText('福利') || !text('每日福利').exists()) {
        return false;
    }

    scrollDown();

    for (var i = 0; i < 20; i++) {
        if (!clicks.centerXyByText('去阅读')) {
            return false;
        }

        if (text('今日任务已全部完成9次，明天再来吧~').exists()) {
            others.back();
            return true;
        }

        clicks.textIfExists('确定');
        sleeps.s50();

        for (var j = 0; j < 3; j++) {
            text('天天热点').exists() && clicks.xy(30, 1400) && others.back();
        }

        others.back();

        if (text('今日任务已全部完成9次，明天再来吧~').exists()) {
            others.back();
            return true;
        }
    }

    return false;
}

/**
 * 任务-抽奖
 */
function taskLottery() {
    log('---------- taskLottery start ----------');

    if (!clicks.centerXyByText('福利') || !text('每日福利').exists()) {
        return false;
    }

    scrollDown();

    if (!text('幸运大转盘').exists() || text('幸运大转盘').findOne().parent().findOne(text('去抽奖')) == null) {
        others.back();
        return false;
    }

    clicks.centerXyByText('幸运大转盘');
    for (var i = 0; i < 10; i++) {
        if (text('今日剩余抽奖次数：0').exists()) {
            others.back();
            return true;
        }

        if (!text('trigger').exists()) {
            continue;
        }

        clicks.centerXyByText('trigger');
        !text('trigger').exists() && clicks.elementWidthHeight(className('android.widget.ImageView'), 90, 90);
        !text('trigger').exists() && clicks.xy(780, 246);
        !text('trigger').exists() && sleeps.s10();
        for (var j = 0; j < 10; j++) {
            !text('trigger').exists() && others.back();
            !text('trigger').exists() && sleeps.s5to10();
        }
    }

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        others.back();

        status1 = taskCheckin();
        status2 = taskVideo();
        status3 = taskNews();
        status4 = taskLottery();

        if (status1 && status2 && status3 && status4) {
            return true;
        }
    }

    others.send('ximalaya');

    return false;
};

module.exports = s;
