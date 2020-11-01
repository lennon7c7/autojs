/**
 * QQ浏览器
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.tencent.mtt';

for (var i = 0; i < 10; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    status1 = taskClear();
    status2 = taskNews();

    if (status1 && status2) {
        others.exit();
    }
}

/**
 * 任务-清理
 */
function taskClear() {
    toastLog('---------- taskClear start ----------');

    others.back();
    if (!clicks.centerXyByText('我的')) {
        return false;
    }

    if (!clicks.centerXyByText('更多任务')) {
        return false;
    }

    swipes.down();
    if (clicks.textIfExists('立即签到')) {
        clicks.centerXyByText('知道了');
    }

    if (clicks.textIfExists('领奖励')) {
        clicks.centerXyByText('知道了');
    }

    if (text('完成1次手机空间清理（1/1）').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('去清理')) {
        return false;
    }
    sleeps.s2to3();

    if (!clicks.centerXyByText('放心清理')) {
        return false;
    }

    others.back2();

    if (clicks.centerXyByText('领奖励')) {
        clicks.centerXyByText('知道了');
    }

    toastLog('---------- taskClear end ----------');

    return false;
}

/**
 * 任务-新闻
 */
function taskNews() {
    toastLog('---------- taskNews start ----------');

    swipes.down();
    if (text('完整阅读5篇资讯文章（5/5）').exists()) {
        return true;
    }

    if (!clicks.textIfExists('去阅读') && !clicks.textIfExists('继续')) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        text('首页').exists() && swipes.refresh();
        text('首页').exists() && clicks.xy(36, 1348);
        for (var j = 0; j < 8; j++) {
            swipes.down();
            sleeps.s2to3();
        }

        if (text('任务完成，点击领取金币').exists()) {
            others.back();
            break;
        }

        others.back();
    }

    if (!clicks.centerXyByText('我的')) {
        return false;
    }

    if (!clicks.centerXyByText('更多任务')) {
        return false;
    }

    clicks.centerXyByText('领奖励');

    if (text('完整阅读5篇资讯文章（5/5）').exists()) {
        return true;
    }

    toastLog('---------- taskNews end ----------');

    return false;
}