var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.eg.android.AlipayGphone';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);
currentAPP.VERSION = '10.1.99.7000';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2020/08/21/3/120_bc32c342295d63e6980102fc3505d414.apk';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, 'taskCheckin start ----------');

    if (idContains('update_cancel_tv').exists()) {
        clicks.element(idContains('update_cancel_tv'));
    }

    if (!others.backToElement(text('我的'))) {
        return false;
    }

    if (!clicks.centerXyByText('支付宝会员')) {
        return false;
    }

    sleeps.s5to10();

    if (text('全部领取').exists()) {
        clicks.centerXyByText('全部领取');
    }

    clicks.textIfExists('每日赚积分');
    if (text('每日赚积分').exists() && !clicks.centerXyByText('每日赚积分')) {
        return false;
    }

    sleeps.s2to3();
    if (text('每日赚积分').exists() && !clicks.centerXyByText('每日赚积分')) {
        return false;
    }

    if (text('每日赚积分').exists() && !text('签到领积分').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('签到领积分')) {
        return false;
    }

    if (text('每日赚积分').exists() && !text('签到领积分').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-逛15秒赚积分
 */
function task15s() {
    log('----------', currentAPP.NAME, 'task15s start ----------');

    if (!clicks.text('逛15秒赚积分')) {
        return false;
    }

    if (text('每日赚积分').exists() && textContains('已完成浏览任务').exists()) {
        return true;
    }

    sleeps.s15();

    if (text('每日赚积分').exists() && textContains('已完成浏览任务').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-天天抽奖
 */
function taskEverydayLottery() {
    log('----------', currentAPP.NAME, 'taskEverydayLottery start ----------');

    if (!clicks.backToElement(text('首页'))) {
        return false;
    }

    if (!clicks.backToElement(text('天天抽奖-每日领免费福利'))) {
        return false;
    }

    for (var i = 0; i < 3; i++) {
        if (!clicks.backToElement(text('抽奖机会'))) {
            return false;
        }

        if (text('已领卡').find().size() > 6) {
            break;
        }

        buttonTextList = [
            '逛一逛', '现在抢', '加马力', '开宝箱',
            '去领取', '去种树', '去看看', '去抽卡',
            '领好礼', '领金币',
            '立即去', '立即兑',

        ];
        buttonTextList.forEach((value) => {
            clicks.textIfExists('领取');

            if (!text(value).exists()) {
                return false;
            }

            if (!clicks.text(value)) {
                return false;
            }

            sleeps.s15to20();
            others.back();
        });
    }

    for (var i = 0; i < 5; i++) {
        if (!clicks.backToElement(text('天天抽奖-每日领免费福利'))) {
            return false;
        }

        if (!clicks.centerXyByText('0元抽奖')) {
            return true;
        }

        if (text('去领卡').exists()) {
            return true;
        }

        if (text('去逛逛').exists() && clicks.centerXyByText('去逛逛')) {
            others.back();
        }

        clicks.centerXyByText('参与抽奖');
    }

    return false;
}

/**
 * 任务-余额宝-0元抽奖
 */
function task0Lottery() {
    log('----------', currentAPP.NAME, 'task0Lottery start ----------');

    back();
    back();

    if (!clicks.backToElement(text('首页'))) {
        return false;
    }

    if (!clicks.centerXyByText('余额宝')) {
        return false;
    }
    others.back();

    if (!clicks.centerXyByText('余额宝')) {
        return false;
    }

    if (!clicks.centerXyByText('一分惊喜')) {
        return false;
    }
    others.back();

    for (var i = 0; i < 5; i++) {
        if (!clicks.backToElement(text('一分惊喜'))) {
            return false;
        }

        if (clicks.centerXyByText('0元抽奖')) {
            if (text('关注').exists()) {
                clicks.centerXyByText('关注');
            }

            if (text('确认使用').exists()) {
                clicks.centerXyByText('确认使用');
            }

            if (clicks.centerXyByText('今日抽奖机会已用完')) {
                return true;
            }

            clicks.centerXyByText('暂不进店');
        }

        if (clicks.centerXyByText('0元抽奖')) {
            clicks.centerXyByText('关注');
        }
    }

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 10; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME);
        if (!status0) {
            return true;
        }


        status0 = taskCheckin();
        if (status0) {
            status0 = task15s();
            task0Lottery();
            taskEverydayLottery();
       }

        if (status0) {
            return true;
        }

        others.clear();
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

module.exports = currentAPP;
