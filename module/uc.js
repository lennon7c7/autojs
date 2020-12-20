/**
 * uc浏览器-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.UCMobile';

// 任务-宝箱
function taskTreasureBox() {
    log('----------', s.PACKAGE_NAME, 'taskTreasureBox start ----------');

    if (!others.backToElement(text('我 的'))) {
        return false;
    }

    if (!clicks.element(descEndsWith('明天领更多'))) {
        return false;
    }

    if (desc('全部领取').exists()) {
        clicks.centerXyByDesc('全部领取');
    }

    if (desc('好的').exists()) {
        clicks.centerXyByDesc('好的');
    }

    if (descStartsWith('今日元宝收完啦').exists()) {
        return true;
    }

    if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 302, 127)) {
        clicks.elementWidthHeight(className('android.widget.FrameLayout'), 302, 127);
    }

    if (exists.elementWidthHeight(className('android.widget.ImageView'), 92, 92)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 92, 92);
    }

    return true;
}

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, 'taskAd start ----------');

    if (!others.backToElement(desc('明天预计可领'))) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (desc('领取').exists()) {
            clicks.centerXyByDesc('领取');
        }

        if (desc('看视频领元宝(15/15)').exists()) {
            return true;
        }

        clicks.centerXyByDesc('去完成');
        closeAd();

        if (desc('领取').exists()) {
            clicks.centerXyByDesc('领取');
        }
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', s.PACKAGE_NAME, 'taskCashout start ----------');

    if (!others.backToElement(desc('提现'))) {
        return false;
    }

    if (!descStartsWith('约').exists()) {
        return false;
    }
    currentMoney = descStartsWith('约').findOne().contentDescription;
    currentMoney = currentMoney.toString();
    currentMoney = currentMoney.replace(/约/, '');
    currentMoney = currentMoney.replace(/元/, '');
    currentMoney = currentMoney * 100;
    if (currentMoney <= 0) {
        return true;
    }

    currentHours = new Date().getHours();
    if (currentHours < 18 || currentHours > 23) {
        return true;
    }

    if (!clicks.centerXyByDesc('兑现金')) {
        return false;
    }
    setText(currentMoney);
    sleeps.s1();
    if (!clicks.desc('立即兑换')) {
        return false;
    }

    if (!clicks.centerXyByDesc('提现')) {
        return false;
    }

    clicks.xy(885, 747);
    clicks.xy(265, 1138);
    others.back();
    clicks.xy(145, 1313);
    clicks.xy(500, 1500);

    return true;
}

/**
 * 关闭广告
 * @returns {boolean}
 */
function closeAd() {
    if (id('tt_top_mute').exists()) {
        clicks.centerXyById('tt_top_mute');
    }

    sleeps.s15();
    for (var j = 0; j < 15; j++) {
        sleeps.s3();

        if (id('ksad_end_close_btn').exists()) {
            clicks.centerXyById('ksad_end_close_btn');
            return true;
        } else if (id('tt_video_ad_close_layout').exists()) {
            clicks.centerXyById('tt_video_ad_close_layout');
            return true;
        } else if (id('sp').exists()) {
            clicks.centerXyById('sp');
            return true;
        } else if (text('关闭广告').exists()) {
            clicks.centerXyByText('关闭广告');
            return true;
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

        status0 = taskTreasureBox();
        status1 = taskAd();
        status2 = taskCashout();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send('uc');

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
