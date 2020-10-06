/**
 * 最强答人-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.lwhy.hltzs';

for (var i = 0; i < 10; i++) {
    main();
}

function main() {
    status1 = taskDaily();
    // taskCheckinWithdraw();
    // taskCheckin();
    // taskLimitRedPacket();
    // taskLuckLottery();
    // taskOnLineReward();

    if (status1) {
        others.exit();
    }
}

/**
 * 任务-打卡提现
 */
function taskCheckinWithdraw() {
    toastLog('---------- taskCheckinWithdraw start ----------');

    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    toastLog('---------- 提现 ----------');
    clicks.xy(445, 425);

    toastLog('---------- 15yuan ----------');
    clicks.xy(900, 1200);

    closeAd(920, 1820);

    toastLog('---------- close 我的钱包 ----------');
    clicks.xy(70, 430);
    back();

    toastLog('---------- close 升级提示 ----------');
    clicks.xy(1000, 500);
    back();

    toastLog('---------- taskCheckinWithdraw end ----------');
}

/**
 * 任务-每日闯关
 */
function taskDaily() {
    toastLog('---------- taskDaily start ----------');

    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    toastLog('---------- 每日闯关 ----------');
    clicks.xy(920, 560);

    clicks.xy(1032, 2199);
    if (text('不感兴趣').exists()) {
        clicks.text('不感兴趣');
    }

    for (var i = 0; i < 100000; i++) {
        if (currentPackage() != PACKAGE_NAME && currentPackage() != 'android') {
            log('---------- ', currentPackage(), ' ----------');
            app.launch(PACKAGE_NAME);
            sleeps.s3();
            if (currentPackage() != PACKAGE_NAME && currentPackage() != 'android') {
                return false;
            }
        } else if (id('tt_insert_dislike_icon_img').exists()) {
            clicks.id('tt_insert_dislike_icon_img');
        } else if (id('tv_listitem_ad_title').exists() || (text('查看详情').exists())) {
            log('---------- 补充体力 ----------');

            closeAd(540, 850);
 
            if (id('tv_listitem_ad_title').exists() || (text('查看详情').exists())) {
                return true;
            }
       } else if (id('bxm_sdk_iv_close').exists()) {
            clicks.id('bxm_sdk_iv_close');
        } else if (id('tt_video_progress').exists()) {
            clicks.id('tt_video_ad_close_layout');
        } else if (className('android.widget.FrameLayout').find().size() == 1 && className('android.view.View').find().size() == 1
            && className('android.widget.ImageView').find().size() == 0) {
            log('---------- random redpackage video ----------');
            closeAd(600, 1660);
            // } else if (className('android.widget.FrameLayout').find().size() == 1 && className('android.view.View').find().size() == 1
        } else {
            log('---------- random answer ----------');
            if (random() > 0.5) {
                clicks.xy(100, 1400);
            } else {
                clicks.xy(1000, 1400);
            }
            back();
        }
    }

    toastLog('---------- taskDaily end ----------');

    return false;
}

/**
 * 任务-签到
 */
function taskCheckin() {
    toastLog('---------- taskCheckin start ----------');

    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    toastLog('---------- 每日红包 ----------');
    clicks.xy(300, 1500);

    toastLog('---------- 前往 ----------');
    clicks.xy(880, 1600);

    toastLog('---------- 签到 ----------');
    clicks.xy(550, 1750);

    toastLog('---------- 额外加xxx红包券 ----------');
    closeAd(550, 1650);

    toastLog('---------- 关闭 ----------');
    clicks.xy(920, 560);

    toastLog('---------- taskCheckin end ----------');
}

/**
 * 任务-限时红包
 */
function taskLimitRedPacket() {
    toastLog('---------- taskLimitRedPacket start ----------');

    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    toastLog('---------- 每日红包 ----------');
    clicks.xy(300, 1500);

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

    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    toastLog('---------- 每日红包 ----------');
    clicks.xy(300, 1500);

    for (var i = 0; i < 4; i++) {
        back();
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

    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    toastLog('---------- 每日红包 ----------');
    clicks.xy(300, 1500);

    toastLog('---------- 前往 ----------');
    clicks.xy(880, 1300);

    for (var i = 0; i < 4; i++) {
        back();
        toastLog('---------- 免费抽奖 ----------');
        closeAd(550, 1650);

        toastLog('---------- 好的 ----------');
        sleeps.s10();
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

    sleeps.s30();

    for (var i = 0; i < 30; i++) {
        if (id('tt_video_ad_close_layout').exists()) {
            clicks.id('tt_video_ad_close_layout');
            if (!id('tt_video_ad_close_layout').exists()) {
                break;
            }
        } else if (text('腾讯社交联盟广告').exists()) {
            clicks.xy(60, 147);
            if (!text('腾讯社交联盟广告').exists()) {
                break;
            }
        }

        sleeps.s1();
    }

    sleeps.s3();

    return true;
}
