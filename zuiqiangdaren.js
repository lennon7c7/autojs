/**
 * 最强答人-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.lwhy.hltzs';

main();

function main() {
    // others.initEnv();

    // status = others.launchApp(PACKAGE_NAME);
    // if (!status) {
    //     return false;
    // }

    taskCheckin();
    // taskLimitRedPacket();
    // taskLimitRedPacket();
    // taskLuckLottery();
    // taskOnLineReward();
}

/**
 * 任务-签到
 */
function taskCheckin() {
    toastLog('---------- taskCheckin start ----------');

    // toastLog('---------- 每日红包 ----------');
    // clicks.xy(300, 1500);

    // toastLog('---------- 前往 ----------');
    // clicks.xy(880, 1600);

    // toastLog('---------- 签到 ----------');
    // closeAd(550, 1750);

    // toastLog('---------- 额外加xxx红包券 ----------');
    // closeAd(550, 1650);

    toastLog('---------- 关闭 ----------');
    clicks.xy(950, 550);

    toastLog('---------- taskCheckin end ----------');
}

/**
 * 任务-限时红包
 */
function taskLimitRedPacket() {
    toastLog('---------- taskLimitRedPacket start ----------');

    toastLog('---------- 领取 ----------');
    clicks.xy(880, 1000);

    toastLog('---------- 额外加xxx红包券 ----------');
    closeAd(550, 1650);

    toastLog('---------- taskLimitRedPacket end ----------');
}

/**
 * 任务-在线奖励
 */
function taskOnLineReward() {
    toastLog('---------- taskOnLineReward start ----------');

    for (var i = 0; i < 4; i++) {
        toastLog('---------- 领取 ----------');
        clicks.xy(900, 1800);

        toastLog('---------- 额外加xxx红包券 ----------');
        closeAd(550, 1650);
    }

    toastLog('---------- taskOnLineReward end ----------');
}

/**
 * 任务-幸运转盘
 */
function taskLuckLottery() {
    toastLog('---------- taskLuckLottery start ----------');

    toastLog('---------- 每日红包 ----------');
    clicks.xy(300, 1500);

    toastLog('---------- 前往 ----------');
    clicks.xy(880, 1300);

    for (var i = 0; i < 4; i++) {
        toastLog('---------- 免费抽奖 ----------');
        closeAd(550, 1650);

        toastLog('---------- 好的 ----------');
        sleeps.s5to10();
        clicks.xy(530, 1350);
    }

    toastLog('---------- 返回 ----------');
    clicks.xy(110, 330);

    toastLog('---------- 日常任务-每日幸运转盘抽奖10次奖励 ----------');
    clicks.xy(880, 700);

    toastLog('---------- 领取 ----------');
    clicks.xy(880, 1000);

    toastLog('---------- 获得奖励 ----------');
    closeAd(550, 1650);

    toastLog('---------- 日常任务-关闭 ----------');
    clicks.xy(950, 550);

    toastLog('---------- taskLuckLottery end ----------');
}

/**
 * 关闭广告
 * @param {int} x 
 * @param {int} y 
 */
function closeAd(x, y) {
    clicks.xy(x, y);

    sleeps.s60to70();

    others.back();
    if (!clicks.id('tt_video_ad_close_layout')) {
        toastLog('---------- click fail: closeAd ----------');
        return false;
    }

    return true;
}
