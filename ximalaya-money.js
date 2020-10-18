/**
 * 喜马拉雅
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.ximalaya.ting.lite';

for (var i = 0; i < 10; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    others.back2();

    status1 = taskCheckin();
    status3 = taskNews();
    status4 = taskLottery();
    status2 = taskVideo();

    if (status1 && status2 && status3 && status4) {
        others.exit();
    }
}

/**
 * 任务-签到
 */
function taskCheckin() {
    toastLog('---------- taskCheckin start ----------');

    if (!clicks.text('福利') || !text('每日福利').exists()) {
        return false;
    }

    toastLog('---------- taskCheckin end ----------');

    return true;
}

/**
 * 任务-视频
 */
function taskVideo() {
    log('---------- taskVideo start ----------');

    if (!clicks.text('福利') || !text('每日福利').exists()) {
        return false;
    }

    if (text('看视频').exists()) {
        clicks.text('看视频');
        sleeps.s35to40();

        if (id('tt_video_ad_close_layout').exists()) {
            clicks.id('tt_video_ad_close_layout');
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
            clicks.xyByText('看一次赚50金币');
            sleeps.s35to40();
            others.back3();
        }
    }

    log('---------- taskVideo end ----------');

    return false;
}

/**
 * 任务-新闻
 */
function taskNews() {
    log('---------- taskNews start ----------');

    if (!clicks.text('福利') || !text('每日福利').exists()) {
        return false;
    }

    scrollDown();

    for (var i = 0; i < 10; i++) {
        if (text('一边看新闻一边赚金币').exists() && text('一边看新闻一边赚金币').findOne().parent().findOne(text('去阅读')) != null) {
            clicks.xyByText('一边看新闻一边赚金币');

            if (text('今日任务已全部完成9次，明天再来吧~').exists()) {
                others.back();
                return true;
            }

            sleeps.s35to40();
            for (var j = 0; j < 100; j++) {
                scrollDown();
                sleeps.s1();

                if (text('closebtn').exists()) {
                    clicks.text('closebtn');
                } else if (text('返回').exists()) {
                    clicks.text('返回');
                    break;
                } else if (desc('关闭').exists()) {
                    clicks.desc('关闭');
                    break;
                } else if (currentPackage() != PACKAGE_NAME) {
                    app.launch(PACKAGE_NAME);
                    sleeps.s5to10();
                }

                if (text('确定').exists()) {
                    others.back();
                    break;
                }
            }
        }
    }

    log('---------- taskNews end ----------');

    return false;
}

/**
 * 任务-抽奖
 */
function taskLottery() {
    log('---------- taskLottery start ----------');

    if (!clicks.text('福利') || !text('每日福利').exists()) {
        return false;
    }

    scrollDown();

    if (!text('幸运大转盘').exists() || text('幸运大转盘').findOne().parent().findOne(text('去抽奖')) == null) {
        others.back();
        return false;
    }

    clicks.xyByText('幸运大转盘');
    for (var i = 0; i < 10; i++) {
        if (text('今日剩余抽奖次数：0').exists()) {
            others.back();
            return true;
        }

        if (text('trigger').exists()) {
            clicks.text('trigger');
            !text('trigger').exists() && clicks.xy(780, 246);
            !text('trigger').exists() && sleeps.s10();
            for (var j = 0; j < 10; j++) {
                !text('trigger').exists() && others.back();
                !text('trigger').exists() && sleeps.s5to10();
            }
        }
    }

    log('---------- taskLottery end ----------');

    return false;
}
