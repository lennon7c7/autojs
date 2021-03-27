/**
 * 最强答人-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.lwhy.hltzs';

/**
 * 任务-打卡提现
 */
function taskCheckinWithdraw() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskCheckinWithdraw start ----------');

    log('---------- 提现 ----------');
    clicks.xy(445, 425);

    log('---------- 15yuan ----------');
    clicks.xy(900, 1200);

    closeAd(920, 1820);

    log('---------- close 我的钱包 ----------');
    clicks.xy(70, 430);
    back();

    log('---------- close 升级提示 ----------');
    clicks.xy(1000, 500);
    back();
}

/**
 * 任务-每日闯关
 */
function taskDaily() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskDaily start ----------');

    log('---------- 每日闯关 ----------');
    clicks.xy(920, 560);

    if (exists.elementWidthHeight(className('android.widget.Image'), 27, 27)) {
        clicks.elementWidthHeight(className('android.widget.Image'), 27, 27);
        if (text('不感兴趣').exists()) {
            clicks.centerXyByText('不感兴趣');
        }
    } else if (exists.elementWidthHeight(className('android.view.View'), 33, 33)) {
        clicks.elementWidthHeight(className('android.widget.Image'), 33, 33);
        if (text('不感兴趣').exists()) {
            clicks.centerXyByText('不感兴趣');
        }
    }

    for (var i = 0; i < 100000; i++) {
        if (currentPackage() !== currentAPP.PACKAGE_NAME && currentPackage() !== 'android') {
            log('---------- ', currentPackage(), ' ----------');
            app.launch(currentAPP.PACKAGE_NAME);
            sleeps.s3();
            if (currentPackage() !== currentAPP.PACKAGE_NAME && currentPackage() !== 'android') {
                return false;
            }
        } else if (id('tt_insert_dislike_icon_img').exists()) {
            clicks.centerXyById('tt_insert_dislike_icon_img');
        } else if (id('tv_listitem_ad_title').exists() || (text('查看详情').exists())) {
            log('---------- 补充体力 ----------');

            closeAd(540, 850);

            if (id('tv_listitem_ad_title').exists() || (text('查看详情').exists())) {
                return true;
            }
        } else if (id('bxm_sdk_iv_close').exists()) {
            clicks.centerXyById('bxm_sdk_iv_close');
        } else if (id('tt_video_progress').exists()) {
            clicks.centerXyById('tt_video_ad_close_layout');
        } else if (className('android.widget.FrameLayout').find().size() === 1 && className('android.view.View').find().size() === 1
            && className('android.widget.ImageView').find().size() === 0) {
            log('---------- random redpackage video ----------');
            closeAd(600, 1660);
        } else if (exists.elementWidthHeight(className('android.widget.ImageView'), 125, 162)) {
            if (random() > 0.5) {
                clicks.xy(100, 1400);
            } else {
                clicks.xy(1000, 1400);
            }
            back();
        }
    }

    return false;
}

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskCheckin start ----------');

    log('---------- 每日红包 ----------');
    clicks.xy(300, 1500);

    log('---------- 前往 ----------');
    clicks.xy(880, 1600);

    log('---------- 签到 ----------');
    clicks.xy(550, 1750);

    log('---------- 额外加xxx红包券 ----------');
    closeAd(550, 1650);

    log('---------- 关闭 ----------');
    clicks.xy(920, 560);
}

/**
 * 任务-限时红包
 */
function taskLimitRedPacket() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskLimitRedPacket start ----------');

    log('---------- 每日红包 ----------');
    clicks.xy(300, 1500);

    log('---------- 领取 ----------');
    clicks.xy(880, 1000);

    log('---------- 额外加xxx红包券 ----------');
    closeAd(550, 1650);
}

/**
 * 任务-在线奖励
 */
function taskOnLineReward() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskOnLineReward start ----------');

    log('---------- 每日红包 ----------');
    clicks.xy(300, 1500);

    for (var i = 0; i < 4; i++) {
        back();
        log('---------- 领取 ----------');
        clicks.xy(900, 1800);

        log('---------- 额外加xxx红包券 ----------');
        closeAd(550, 1650);
    }
}

/**
 * 任务-幸运转盘
 */
function taskLuckLottery() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskLuckLottery start ----------');

    log('---------- 每日红包 ----------');
    clicks.xy(300, 1500);

    log('---------- 前往 ----------');
    clicks.xy(880, 1300);

    for (var i = 0; i < 4; i++) {
        back();
        log('---------- 免费抽奖 ----------');
        closeAd(550, 1650);

        log('---------- 好的 ----------');
        sleeps.s10();
        clicks.xy(530, 1350);
    }

    log('---------- 返回 ----------');
    clicks.xy(110, 330);

    log('---------- 日常任务-每日幸运转盘抽奖10次奖励 ----------');
    clicks.xy(880, 700);

    log('---------- 领取 ----------');
    clicks.xy(880, 1000);

    log('---------- 获得奖励 ----------');
    closeAd(550, 1650);

    log('---------- 日常任务-关闭 ----------');
    clicks.xy(950, 550);
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
            clicks.centerXyById('tt_video_ad_close_layout');
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

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(currentAPP.PACKAGE_NAME);

        status1 = taskDaily();
        // taskCheckinWithdraw();
        // taskCheckin();
        // taskLimitRedPacket();
        // taskLuckLottery();
        // taskOnLineReward();

        if (status1) {
            return true;
        }
    }

    // others.send(currentAPP.PACKAGE_NAME);

    return false;
};

module.exports = currentAPP;
