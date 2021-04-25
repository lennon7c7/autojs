/**
 * 欧朋浏览器极速版-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.oupeng.browser';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);
currentAPP.VERSION = '13.03.0.4';
currentAPP.APK = 'https://ip4046033783.mobgslb.tbcache.com/fs08/2021/02/03/8/122_22ac7d4dd6c19f23203bbda1d6707165.apk?yingid=wdj_web&fname=%E6%AC%A7%E6%9C%8B%E6%B5%8F%E8%A7%88%E5%99%A8%E6%9E%81%E9%80%9F%E7%89%88&productid=2011&pos=wdj_web%2Fdetail_normal_dl%2F0&appid=677405&packageid=601020417&apprd=677405&iconUrl=http%3A%2F%2Fandroid-artworks.25pp.com%2Ffs08%2F2021%2F02%2F04%2F7%2F122_bd7411a478c34b3ab8d0569e38044573_con.png&pkg=com.oupeng.browser&did=61c9c907653b81485fad8276da568720&vcode=1002&md5=2ab7892aaba14f8ea2ca7f946629f6aa&ali_redirect_domain=alissl.ucdl.pp.uc.cn&ali_redirect_ex_ftag=df834589903f1c68729a0f48ff583635a142c43cc3c0acb7&ali_redirect_ex_tmining_ts=1616083918&ali_redirect_ex_tmining_expire=3600&ali_redirect_ex_hot=100';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, 'taskCheckin start ----------');

    clicks.textIfExists('忽略');
    clicks.textIfExists('忽略');
    clicks.textIfExists('签到');
    clicks.textIfExists('签到');
    clicks.idIfExists('close_dialog');
    clicks.idIfExists('close_dialog');
    clicks.textIfExists('忽略');
    clicks.textIfExists('忽略');
    clicks.textIfExists('签到');
    clicks.textIfExists('签到');
    clicks.idIfExists('close_dialog');
    clicks.idIfExists('close_dialog');

    if (!clicks.idIfExists('bottom_navigation_bar_task')) {
        return false;
    }

    if (text('已签到').exists()) {
        return true;
    }

    clicks.textIfExists('签到');

    if (text('已签到').exists()) {
        return true;
    }

    return false;
}

// 任务-Ad
function taskAd() {
    log('----------', currentAPP.NAME, 'taskAd start ----------');

    for (var i = 0; i < 10; i++) {
        clicks.idIfExists('close_dialog');
        if (clicks.textIfExists('取消')) {
            others.closeAdBackToElement(id('close_dialog'));
            sleeps.s5();
            clicks.textIfExists('取消');
        }

        if (clicks.textIfExists('双倍奖励')) {
            others.closeAdBackToElement(id('close_dialog'));
            sleeps.s5();
            clicks.textIfExists('取消');
        }

        clicks.idIfExists('bottom_navigation_bar_task');

        if (text('每看完一个视频即可获得200金币奖励。 （10/10)').exists()) {
            return true;
        }

        if (clicks.textIfExists('看视频')) {
            others.closeAdBackToElement(id('close_dialog'));
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
        status1 = taskAd();

        if (status0 && status1) {
            return true;
        }

        others.clear();
    }

    others.send(currentAPP.NAME);

    return false;
};

module.exports = currentAPP;
