/**
 * QQ浏览器-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.tencent.mtt';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    if (!others.backToElement(text('我的'))) {
        return false;
    }

    if (!clicks.centerXyByText('更多任务')) {
        return false;
    }

    if (text('已签到').exists()) {
        return true;
    }

    if (clicks.textIfExists('立即签到')) {
        clicks.centerXyByText('知道了');
    }

    if (text('已签到').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-清理
 */
function taskClear() {
    log('----------', s.PACKAGE_NAME, 'taskClear start ----------');

    if (!exists.backToElement(text('福利中心'))) {
        return false;
    }

    if (clicks.textIfExists('领奖励')) {
        clicks.centerXyByText('知道了');
    }

    if (text('完成1次手机空间清理（1/1）').exists()) {
        return true;
    }

    swipes.down();
    if (!clicks.centerXyByText('去清理')) {
        return false;
    }
    sleeps.s2to3();

    if (!clicks.centerXyByText('放心清理')) {
        return false;
    }
    sleeps.s2to3();

    if (!exists.backToElement(text('福利中心'))) {
        return false;
    }

    if (clicks.centerXyByText('领奖励')) {
        clicks.centerXyByText('知道了');
    }

    if (text('完成1次手机空间清理（1/1）').exists()) {
        return true;
    }

    return false;
}

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, 'taskAd start ----------');

    if (!exists.backToElement(text('福利中心'))) {
        return false;
    }

    if (clicks.textIfExists('领奖励')) {
        clicks.centerXyByText('知道了');
    }

    if (text('福利中心').exists() && !textStartsWith('观看2个视频得').exists()) {
        return true;
    }

    if (text('观看2个视频得10金币（2/2）').exists()) {
        return true;
    }

    swipes.down();
    if (text('去观看').exists() && clicks.centerXyByText('去观看')) {
        others.closeAdBackToElement(text('福利中心'));
    }

    if (text('继续').exists() && clicks.centerXyByText('继续')) {
        others.closeAdBackToElement(text('福利中心'));
    }

    if (clicks.textIfExists('领奖励')) {
        clicks.centerXyByText('知道了');
    }

    if (text('观看2个视频得10金币（2/2）').exists()) {
        return true;
    }

    return false;
}

// 任务-搜索
function taskSearch() {
    log('----------', s.PACKAGE_NAME, 'taskSearch start ----------');

    if (!exists.backToElement(text('福利中心'))) {
        return false;
    }

    if (clicks.textIfExists('领奖励')) {
        clicks.centerXyByText('知道了');
    }

    if (text('逛5秒或点击任意内容（1/1）').exists()) {
        return true;
    }

    swipes.down();
    if (text('去搜索').exists() && clicks.centerXyByText('去搜索')) {
        sleeps.s10();
    }

    if (!exists.backToElement(text('福利中心'))) {
        return false;
    }

    if (clicks.textIfExists('领奖励')) {
        clicks.centerXyByText('知道了');
    }

    if (text('逛5秒或点击任意内容（1/1）').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-新闻
 */
function taskNews() {
    log('----------', s.PACKAGE_NAME, 'taskNews start ----------');

    if (!exists.backToElement(text('福利中心'))) {
        return false;
    }

    if (clicks.textIfExists('领奖励')) {
        clicks.centerXyByText('知道了');
    }

    if (text('完整阅读5篇资讯文章（5/5）').exists()) {
        return true;
    }

    swipes.down();
    if (!clicks.textIfExists('去阅读') && !clicks.textIfExists('继续')) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        text('首页').exists() && swipes.refresh();
        text('首页').exists() && clicks.xy(345, 1048);
        for (var j = 0; j < 8; j++) {
            swipes.down();
            sleeps.s2to3();
        }

        if (text('任务完成，点击领取金币').exists()) {
            break;
        }

        others.back();
    }

    if (!others.backToElement(text('我的'))) {
        return false;
    }

    if (!clicks.centerXyByText('更多任务')) {
        return false;
    }

    if (clicks.textIfExists('领奖励')) {
        clicks.centerXyByText('知道了');
    }

    if (text('完整阅读5篇资讯文章（5/5）').exists()) {
        return true;
    }

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 10; i++) {
        others.launch(s.PACKAGE_NAME);

        status0 = taskCheckin();
        status1 = taskClear();
        status3 = taskAd();
        status4 = taskSearch();
        status2 = taskNews();

        if (status0 && status1 && status2 && status3 && status4) {
            return true;
        }
    }

    others.send(s.PACKAGE_NAME);

    return false;
};

module.exports = s;
