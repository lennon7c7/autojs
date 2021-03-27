/**
 * 百度贴吧-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.baidu.tieba';

// 任务-限时
// every 20m
function taskLimit() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskLimit start ----------');

    if (!others.backToElement(text('我的'))) {
        return false;
    }

    swipes.down();
    swipes.down();
    clicks.xy(500, 1700);

    if (!text('领现金').exists()) {
        return false;
    }

    if (text('疯狂赚金币').exists() && clicks.x1y1x2y2(99, 600, 234, 735) && !text('疯狂赚金币').exists()) {
        closeAd();
    }

    if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
        clicks.elementWidthHeight(className('android.view.View'), 84, 81);
    }

    if (text('轻松赚金币').exists() && clicks.x1y1x2y2(348, 600, 483, 735) && !text('轻松赚金币').exists()) {
        closeAd();
    }
    if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
        clicks.elementWidthHeight(className('android.view.View'), 84, 81);
    }

    return true;
}

// 任务-Ad
function taskAd() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskAd start ----------');

    if (!others.backToElement(text('领现金'))) {
        return false;
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

    if (text('试玩领金币').exists() && clicks.text('试玩领金币')) {
        sleeps.s2to3();
        for (var i = 0; i < 5; i++) {
            clicks.text('看视频赚金币');

            if (text('看视频赚金币').exists()) {
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

    if (text('看视频赚金币').exists()) {
        for (var i = 0; i < 5; i++) {
            clicks.text('看视频赚金币');

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
currentAPP.start = function () {
    for (var i = 0; i < 3; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME);
        if (!status0) {
            return true;
        }


        status0 = taskLimit();
        status1 = taskAd();

        if (status0 && status1) {
            return true;
        }
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

/**
 * 定时入口调用
 * @returns {boolean}
 */
currentAPP.cron = function () {
    status0 = others.launch(currentAPP.PACKAGE_NAME);
    if (!status0) {
        return true;
    }


    taskLimit();
};

module.exports = currentAPP;
