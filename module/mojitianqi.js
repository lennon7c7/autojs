/**
 * 墨迹天气-任务
 */
var clicks = require('./function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.moji.mjweather.light';

// 任务-Ad
function taskAd() {
    log('---------- taskAd start ----------');

    if (clicks.parent(text('看福利视频，赚更多金币'), text('已完成'))) {
        return true;
    }

    if (clicks.centerXyByText('看视频')) {
        closeAd();
    }

    for (var i = 1; i < 10; i++) {
        if (!clicks.centerXyByText('进行中' + i + '/9')) {
            continue;
        }

        closeAd();
    }

    if (!clicks.centerXyByText('领金币')) {
        return false;
    }

    if (clicks.parent(text('看福利视频，赚更多金币'), text('已完成'))) {
        return true;
    }

    return false;
}

function closeAd() {
    clicks.centerXyById('tt_top_mute');

    sleeps.s35to40();

    clicks.centerXyById('tt_video_ad_close_layout');

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

        clicks.centerXyByText('领奖励');
        clicks.centerXyByText('领奖励');
        if (clicks.centerXyByText('去查看')) {
            others.back();
            clicks.centerXyByText('领金币');
            clicks.centerXyByText('领奖励');
        }

        if (status) {
            return true;
        }
    }

    others.send('mojitianqi');

    return false;
};

module.exports = s;
