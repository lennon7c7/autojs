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

    if (click(99, 600, 234, 735) && !text('领现金').exists()) {
        closeAd();
    }
    if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
        clicks.elementWidthHeight(className('android.view.View'), 84, 81);
    }

    if (click(597, 600, 732, 735) && !text('领现金').exists()) {
        closeAd();
    }
    if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
        clicks.elementWidthHeight(className('android.view.View'), 84, 81);
    }

    return false;
}

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, ' taskAd start ----------');

    for (var i = 0; i < 20; i++) {
        clicks.textIfExists('看视频赚金币');
        clicks.textIfExists('看视频再赚60金币');
        clicks.textIfExists('看视频最高再赚60金币');
        clicks.textIfExists('看视频奖励翻倍');
        clicks.textIfExists('赚更多金币');

        if (textStartsWith('恭喜您').exists()) {
            others.back();
            break;
        }

        closeAd();
    }

    text('领现金').exists() && swipes.down();
    if (!clicks.centerXyByText('轻松赚金币')) {
        return false;
    }
    sleeps.s2to3();
    for (var i = 0; i < 20; i++) {
        clicks.centerXyByText('看视频赚金币');

        if (textStartsWith('恭喜您').exists()) {
            others.back();
            break;
        }

        closeAd();

        sleeps.s4();
    }
    others.back();
    if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
        clicks.elementWidthHeight(className('android.view.View'), 84, 81);
    }

    for (var i = 0; i < 20; i++) {
        text('领现金').exists() && swipes.down();
        text('领现金').exists() && swipes.down();
        clicks.centerXyByText('免费送金币');

        if (textStartsWith('恭喜您').exists()) {
            others.back();
            break;
        }

        closeAd();

        if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
            clicks.elementWidthHeight(className('android.view.View'), 84, 81);
        }
    }

    for (var i = 0; i < 20; i++) {
        text('领现金').exists() && swipes.down();
        text('领现金').exists() && swipes.down();
        clicks.centerXyByText('疯狂领金币');

        if (textStartsWith('恭喜您').exists()) {
            others.back();
            break;
        }

        closeAd();

        if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
            clicks.elementWidthHeight(className('android.view.View'), 84, 81);
        }
    }

    return true;
}

// 关闭Ad
function closeAd() {
    sleeps.s20();
    clicks.textIfExists('取消');
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

        others.back();

        if (!clicks.centerXyByText('我的') || !clicks.centerXyByText('任务中心')) {
            return false;
        }

        status0 = taskLimit();
        status1 = taskAd();

        if (status0 && status1) {
            return true;
        }
    }

    others.send('baiduhaokan');

    return false;
};

module.exports = s;
