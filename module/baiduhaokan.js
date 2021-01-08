/**
 * 好看视频-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.baidu.haokan';

// 任务-限时
// every 20m
function taskLimit() {
    log('----------', s.PACKAGE_NAME, 'taskLimit start ----------');

    if (!others.backToElement(text('我的'))) {
        return false;
    }

    if (!clicks.centerXyByText('任务中心')) {
        return false;
    }

    if (text('领现金').exists() && clicks.x1y1x2y2(99, 600, 234, 735) && !text('领现金').exists()) {
        closeAd();
    }
    if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
        clicks.elementWidthHeight(className('android.view.View'), 84, 81);
    }

    if (text('领现金').exists() && clicks.x1y1x2y2(348, 600, 483, 735) && !text('领现金').exists()) {
        closeAd();
    }
    if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
        clicks.elementWidthHeight(className('android.view.View'), 84, 81);
    }

    // if (text('领现金').exists() && clicks.x1y1x2y2(597, 600, 732, 735) && !text('领现金').exists()) {
    //     closeAd();
    // }
    // if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
    //     clicks.elementWidthHeight(className('android.view.View'), 84, 81);
    // }

    return true;
}

// 任务-打开应用
function taskOpenApp() {
    log('----------', s.PACKAGE_NAME, 'taskOpenApp start ----------');

    if (!others.backToElement(text('领现金'))) {
        return false;
    }

    if (!text('限时专享').exists()) {
        return true
    }

    if (clicks.textIfExists('打开百度贴吧')) {
        clicks.text('redpack_haokan');
        if (clicks.textIfExists('取消')) {
            others.back();
        } else {
            sleeps.s10();
            others.back2();
            back();
            back();
            sleeps.s3();
            others.back();
        }
        if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
            clicks.elementWidthHeight(className('android.view.View'), 84, 81);
        }
    }

    if (clicks.textIfExists('打开全民小视频')) {
        clicks.text('redpack_haokan');
        if (clicks.textIfExists('取消')) {
            others.back();
        } else {
            sleeps.s3();
            others.back2();
            back();
            back();
            sleeps.s3();
            others.back();
        }
        if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
            clicks.elementWidthHeight(className('android.view.View'), 84, 81);
        }
    }

    return true;
}

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, 'taskAd start ----------');

    if (!others.backToElement(text('领现金'))) {
        return false;
    }

    for (var i = 0; i < 5; i++) {
        clicks.textIfExists('看视频赚金币');
        clicks.textIfExists('看视频再赚60金币');
        clicks.textIfExists('看视频最高再赚60金币');
        clicks.textIfExists('看视频奖励翻倍');
        clicks.textIfExists('赚更多金币');

        if (text('领现金').exists()) {
            break;
        }

        if (textStartsWith('恭喜您').exists()) {
            break;
        }

        closeAd();
    }

    if (!others.backToElement(text('领现金'))) {
        return false;
    }

    if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
        clicks.elementWidthHeight(className('android.view.View'), 84, 81);
    }

    if (text('轻松赚金币').exists() && clicks.text('轻松赚金币')) {
        sleeps.s2to3();
        for (var i = 0; i < 5; i++) {
            clicks.centerXyByText('看视频赚金币');

            if (text('看视频赚金币').exists()) {
                break;
            }

            if (textStartsWith('恭喜您').exists()) {
                break;
            }

            closeAd();

            sleeps.s4();
        }

        if (!others.backToElement(text('领现金'))) {
            return false;
        }

        if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
            clicks.elementWidthHeight(className('android.view.View'), 84, 81);
        }
    }

    if (text('免费送金币').exists()) {
        for (var i = 0; i < 5; i++) {
            clicks.text('免费送金币');

            if (text('领现金').exists()) {
                break;
            }

            if (textStartsWith('恭喜您').exists()) {
                break;
            }

            closeAd();

            if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
                clicks.elementWidthHeight(className('android.view.View'), 84, 81);
            }
        }

        if (!others.backToElement(text('领现金'))) {
            return false;
        }
    }

    if (text('疯狂领金币').exists()) {
        for (var i = 0; i < 5; i++) {
            clicks.text('疯狂领金币');

            if (text('领现金').exists()) {
                break;
            }

            if (textStartsWith('恭喜您').exists()) {
                break;
            }

            closeAd();

            if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
                clicks.elementWidthHeight(className('android.view.View'), 84, 81);
            }
        }

        if (!others.backToElement(text('领现金'))) {
            return false;
        }
    }

    return true;
}

// 关闭Ad
function closeAd() {
    sleeps.s20();
    clicks.textIfExists('取消');
    clicks.textIfExists('拒绝');
    for (var j = 0; j < 15; j++) {
        sleeps.s3();
        if (text('恭喜已得金币').exists() || text('请稍后尝试再次观看').exists()) {
            others.back();
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

        status0 = taskLimit();
        status1 = taskOpenApp();
        status2 = taskAd();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send('baiduhaokan');

    return false;
};

/**
 * 定时入口调用
 * @returns {boolean}
 */
s.cron = function () {
    others.launch(s.PACKAGE_NAME);

    taskLimit();
};

module.exports = s;
