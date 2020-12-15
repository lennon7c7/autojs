/**
 * 百度-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.baidu.searchbox.lite';

// 任务-限时
// every 20m
function taskLimit() {
    log('----------', s.PACKAGE_NAME, 'taskLimit start ----------');

    others.back();

    if (!clicks.centerXyByText('任务') && !clicks.centerXyByText('去签到')) {
        return false;
    }

    if (text('看视频领金币').exists() && clicks.x1y1x2y2(99, 468, 234, 603) && !text('看视频领金币').exists()) {
        closeAd();
    }

    if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
        clicks.elementWidthHeight(className('android.view.View'), 84, 81);
    }

    return true;
}

// 任务-打开应用
function taskOpenApp() {
    log('----------', s.PACKAGE_NAME, 'taskOpenApp start ----------');

    if (!text('限时专享').exists()) {
        return true
    }

    if (clicks.textIfExists('打开好看视频')) {
        sleeps.s3();
        others.back();
        back();
        back();
        sleeps.s3();
        if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
            clicks.elementWidthHeight(className('android.view.View'), 84, 81);
        }
    }

    if (clicks.textIfExists('打开全民小视频')) {
        clicks.text('redpack_haokan');
        sleeps.s3();
        others.back();
        back();
        back();
        sleeps.s3();
        others.back();
        if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
            clicks.elementWidthHeight(className('android.view.View'), 84, 81);
        }
    }

    return true;
}

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, 'taskAd start ----------');

    others.back();

    if (!clicks.centerXyByText('任务') && !clicks.centerXyByText('去签到')) {
        return false;
    }

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

        others.back();
    }

    for (var i = 0; i < 20; i++) {
        clicks.centerXyByText('看视频赚金币');

        if (textStartsWith('恭喜您').exists()) {
            others.back();
            break;
        }

        closeAd();

        others.back();
        if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
            clicks.elementWidthHeight(className('android.view.View'), 84, 81);
        }
    }

    if (text('轻松赚金币').exists() && clicks.centerXyByText('轻松赚金币')) {
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
    }

    swipes.down();
    for (var i = 0; i < 20; i++) {
        clicks.centerXyByText('免费送金币');

        if (textStartsWith('恭喜您').exists()) {
            others.back();
            break;
        }

        closeAd();

        others.back();
        if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
            clicks.elementWidthHeight(className('android.view.View'), 84, 81);
        }
    }

    swipes.down();
    swipes.down();
    for (var i = 0; i < 20; i++) {
        clicks.centerXyByText('疯狂领金币');

        if (textStartsWith('恭喜您').exists()) {
            others.back();
            break;
        }

        closeAd();

        others.back();
        if (exists.elementWidthHeight(className('android.view.View'), 84, 81)) {
            clicks.elementWidthHeight(className('android.view.View'), 84, 81);
        }
    }

    return true;
}

// 任务-观看视频
function taskVideo() {
    log('----------', s.PACKAGE_NAME, 'taskVideo start ----------');

    others.back();

    if (!clicks.centerXyByText('任务') && !clicks.centerXyByText('去签到')) {
        return false;
    }

    if (!exists.parents(text('观看视频'), text('已完成'))) {
        return true;
    }

    if (!clicks.text('观看视频')) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (!text('推荐').exists() || !text('小视频').exists()) {
            log('---------- error ----------');
            return false;
        }

        if (!clicks.centerXyByText('好看视频')) {
            return false;
        }

        clicks.xy(477, 577);
        sleeps.s30to35();
    }

    if (!clicks.centerXyByText('任务')) {
        return false;
    }

    return true;
}

// 任务-看新闻
function taskNews() {
    log('----------', s.PACKAGE_NAME, 'taskNews start ----------');

    others.back();

    if (!clicks.centerXyByText('任务') && !clicks.centerXyByText('去签到')) {
        return false;
    }

    if (!exists.parents(text('阅读资讯'), text('已完成'))) {
        return true;
    }

    if (!clicks.text('阅读资讯')) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (!text('百度').exists() || !text('任务').exists() || !text('我的').exists()) {
            log('---------- error ----------');
            return false;
        }

        if (!clicks.centerXyByText('百度')) {
            return false;
        }

        clicks.xy(345, 1345);

        sleeps.s8();
        swipes.down();
        sleeps.s10();
        swipes.refresh();
        sleeps.s10();

        others.back();
    }

    if (!clicks.centerXyByText('任务')) {
        return false;
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
        status3 = taskNews();
        status4 = taskVideo();

        if (status0 && status1 && status2 && status3 && status4) {
            return true;
        }
    }

    others.send('baidu');

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
