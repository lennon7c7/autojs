/**
 * 酷狗大字版-任务
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.kugou.android.elder';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('---------- taskCheckin start ----------');

    if (text('明天签到').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('签到')) {
        return false;
    }
    others.back();

    if (text('明天签到').exists()) {
        return true;
    }

    return false;
}

// 任务-Ad
function taskAd() {
    log('---------- taskAd start ----------');

    for (var i = 0; i < 20; i++) {
        if (!clicks.textIfExists('去赚钱')) {
            break;
        }

        closeAd();
    }

    return true;
}

function closeAd() {
    if (id('tt_top_mute').exists()) {
        clicks.centerXyById('tt_top_mute');
    }

    sleeps.s35to40();

    if (id('ksad_end_close_btn').exists()) {
        clicks.centerXyById('ksad_end_close_btn');
    } else if (id('tt_video_ad_close_layout').exists()) {
        clicks.centerXyById('tt_video_ad_close_layout');
    } else {
        others.back();
    }

    others.back();

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        others.back();

        if (!clicks.centerXyByText('赚钱')) {
            return false;
        }

        swipes.down();

        status0 = taskCheckin();
        status1 = taskAd();

        if (status0 && status1) {
            return true;
        }
    }

    others.send('kugoudaziban');

    return false;
};

module.exports = s;
