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

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    swipes.scrollDown();

    if (exists.parent(text('看福利视频，赚更多金币'), text('已完成'))) {
        return true;
    }

    if (text('看视频').exists() && clicks.centerXyByText('看视频')) {
        others.closeAdBackToElement(text('日常任务'));
    }

    for (var i = 1; i < 10; i++) {
        if (!text('进行中' + i + '/7').exists() || !clicks.centerXyByText('进行中' + i + '/7')) {
            continue;
        }

        others.closeAdBackToElement(text('日常任务'));
    }

    if (!clicks.centerXyByText('领金币')) {
        return false;
    }

    if (exists.parent(text('看福利视频，赚更多金币'), text('已完成'))) {
        return true;
    }

    return false;
}

// 任务-看每日天气
function taskEverydayWeather() {
    log('----------', s.PACKAGE_NAME, 'taskEverydayWeather start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    if (exists.parent(text('看每日天气'), text('已完成'))) {
        return true;
    }

    if (text('去查看').exists() && clicks.centerXyByText('去查看')) {
        if (!others.backToElement(text('福利'))) {
            return false;
        }
    }

    text('领奖励').exists() && clicks.centerXyByText('领奖励');
    text('领金币').exists() && clicks.centerXyByText('领金币');

    if (text('翻倍金币').exists() && clicks.centerXyByText('翻倍金币')) {
        if (!others.closeAdBackToElement(text('日常任务'))) {
            return false;
        }
    }

    if (exists.parent(text('看每日天气'), text('已完成'))) {
        return true;
    }

    return false;
}

// 任务-看短时天气
function taskShortWeather() {
    log('----------', s.PACKAGE_NAME, 'taskShortWeather start ----------');

    if (!others.backToElement(text('福利'))) {
        return false;
    }

    if (exists.parent(text('看短时天气'), text('已完成'))) {
        return true;
    }

    if (text('去查看').exists() && clicks.centerXyByText('去查看')) {
        if (!others.backToElement(text('福利'))) {
            return false;
        }
    }

    text('领奖励').exists() && clicks.centerXyByText('领奖励');
    text('领金币').exists() && clicks.centerXyByText('领金币');

    if (text('翻倍金币').exists() && clicks.centerXyByText('翻倍金币')) {
        if (!others.closeAdBackToElement(text('日常任务'))) {
            return false;
        }
    }

    if (exists.parent(text('看短时天气'), text('已完成'))) {
        return true;
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

        status0 = taskAd();
        status1 = taskShortWeather();
        status2 = taskEverydayWeather();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send('mojitianqi');

    return false;
};

module.exports = s;
