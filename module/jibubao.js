/**
 * 计步宝-任务
 * 当前存在问题
 * 1. 当金额大于17元时，可能会被制裁，只能获得1金币
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.starbaba.countstep';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    if (text('高级签到').exists() && clicks.text('高级签到')) {
        if (!others.closeAdBackToElement(id('continue_btn'))) {
            return false;
        }
    }

    if (text('继续赚钱').exists() && !clicks.text('继续赚钱')) {
        return false;
    }

    return true;
}

/**
 * 任务-大转盘
 */
function taskLottery() {
    log('----------', s.PACKAGE_NAME, 'taskLottery start ----------');

    if (!others.backToElement(text('个人页'))) {
        return false;
    }

    for (var i = 0; i < 66; i++) {
        if (!others.backToElement(text('大转盘'))) {
            return false;
        }

        if (text('剩余次数:0次').exists()) {
            return true
        }

        clicks.idIfExists('sceneAdSdk_startBtn');
        clicks.idIfExists('close_btn');
    }

    return false;
}

/**
 * 任务-大转盘Ad
 */
function taskLotteryAd() {
    log('----------', s.PACKAGE_NAME, 'taskLotteryAd start ----------');

    for (var i = 0; i < id('scene_ad_sdk_rewardItem').find().size(); i++) {
        if (!clicks.element(id('scene_ad_sdk_rewardItem').find()[i])) {
            return false;
        }

        clicks.xy(300, 1300);

        if (!text('剩余次数:0次').exists() && !others.closeAdBackToElement(text('继续赚钱'))) {
            return false;
        }

        clicks.text('继续赚钱');
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 10; i++) {
        others.launch(s.PACKAGE_NAME);

        status0 = taskCheckin();
        status1 = taskLottery();
        if (status1) {
            status1 = taskLotteryAd();
        }

        if (status0 && status1) {
            return true;
        }

        others.clear();
    }

    others.send(s.PACKAGE_NAME);

    return false;
};

module.exports = s;
