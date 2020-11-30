/**
 * 墨迹天气-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.moji.mjweather.light';

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, 'taskAd start ----------');

    if (exists.parent(text('看福利视频，赚更多金币'), text('已完成'))) {
        return true;
    }

    if (text('看视频').exists() && clicks.centerXyByText('看视频')) {
        closeAd();
    }

    for (var i = 1; i < 10; i++) {
        if (!text('进行中' + i + '/7').exists() || !clicks.centerXyByText('进行中' + i + '/7')) {
            continue;
        }

        closeAd();
    }

    if (!clicks.centerXyByText('领金币')) {
        return false;
    }

    if (exists.parent(text('看福利视频，赚更多金币'), text('已完成'))) {
        return true;
    }

    return false;
}

function closeAd() {
    if (id('tt_top_mute').exists()) {
        clicks.centerXyById('tt_top_mute');
    }

    sleeps.s35to40();

    if (id('tt_video_ad_close_layout').exists()) {
        clicks.centerXyById('tt_video_ad_close_layout');
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        if (!clicks.centerXyByText('福利')) {
            return false;
        }

        scrollDown();
        sleep(2 * 1000);

        status = taskAd();

        text('领奖励').exists() && clicks.centerXyByText('领奖励');
        text('领奖励').exists() && clicks.centerXyByText('领奖励');
        if (text('去查看').exists() && clicks.centerXyByText('去查看')) {
            others.back();
            text('领金币').exists() && clicks.centerXyByText('领金币');
            text('领奖励').exists() && clicks.centerXyByText('领奖励');
        }

        if (status) {
            return true;
        }
    }

    others.send('mojitianqi');

    return false;
};

module.exports = s;
