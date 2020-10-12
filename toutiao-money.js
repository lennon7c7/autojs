/**
 * 头条-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.ss.android.article.lite';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    status = task();

    if (status) {
        others.exit();
    }
}

// 任务
function task() {
    log('---------- task start ----------');

    if (!clicks.text('任务') || !text('任务中心').exists()) {
        return false;
    }

    status1 = taskCheckin();
    status2 = taskLottery();
    taskSleep();
    taskTreasureBox();
    taskTaobao();
    taskSearch();
    taskVideo();
    // taskNovel();

    log('---------- task end ----------');

    return status1 && status2;
}

/**
 * 任务-签到
 */
function taskCheckin() {
    if (text('明日签到').exists()) {
        return true;
    }

    if (text('立即签到 +100金币').exists()) {
        clicks.text('立即签到 +100金币');
        clicks.xy(477, 1710);
    }

    if (text('明日签到').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-今日搜索任务
 */
function taskSearch() {
    log('---------- taskSearch start ----------');

    if (!text('今日搜索任务').exists()) {
        return false;
    }

    buttonClick = text('今日搜索任务').findOne().parent().parent().findOne(text('去搜索'));
    if (buttonClick == null) {
        return false;
    }

    clicks.element(buttonClick);
    myKeyword = className('android.widget.EditText').findOne().text();
    for (var i = 0; i < 3; i++) {
        clicks.desc('清除');
        setText(myKeyword.split(',')[i]);
        clicks.text('搜索');
    }
    others.back2();

    log('---------- taskSearch end ----------');

    return true;
}

/**
 * 任务-淘宝
 */
function taskTaobao() {
    log('---------- taskTaobao start ----------');

    if (!text('去淘宝抽购物红包').exists()) {
        return false;
    }

    buttonClick = text('去淘宝抽购物红包').findOne().parent().parent().findOne(text('去抽奖'));
    if (buttonClick == null) {
        return false;
    }

    clicks.element(buttonClick);
    others.back();

    log('---------- taskTaobao end ----------');

    return true;
}

// 任务-抽奖
function taskLottery() {
    log('---------- taskLottery start ----------');

    if (!clicks.text('去抽奖') || !text('集齐碎片得手机').exists()) {
        return false;
    }

    if (text('今日次数已用完').exists()) {
        others.back();
        return true;
    }

    for (var i = 1; i <= 3; i++) {
        var buttonClickTask = className('android.view.View').text('今日剩' + i + '次');
        if (buttonClickTask.exists()) {
            clicks.findOne(buttonClickTask);
            others.back();
        }
    }

    if (text('今日次数已用完').exists()) {
        others.back();
        return true;
    }

    others.back();

    log('---------- taskLottery end ----------');

    return false;
}

// 任务-睡觉赚钱
function taskSleep() {
    log('---------- taskSleep start ----------');

    if (!clicks.text('睡觉赚钱')) {
        return false;
    }

    if (clicks.text('我要睡了')) {
        others.back();
        return true;
    } else if (clicks.text('我睡醒了')) {
        clicks.xy(429, 984);
        others.back();
        return true;
    }

    others.back();

    log('---------- taskSleep end ----------');

    return true;
}

// 任务-小说
function taskNovel() {
    log('---------- taskNovel start ----------');

    var buttonClickTask = className('android.widget.Button').text('看小说');
    if (!buttonClickTask.exists()) {
        return false;
    }
    log('---------- click novel ----------');
    buttonClickTask.findOne().parent().click();
    sleeps.s3();

    log('---------- click last novel ----------');
    clicks.xy(264, 687);

    for (var i = 0; i < 50; i++) {
        swipes.right200();
        sleeps.s2to3();

        // 随机出现奖励金币，但是无法定位，只能先关闭
        // click(477, 1637);

        var buttonAd = id('ant');
        if (buttonAd.exists()) {
            log('this is ad, next');
            swipes.right200();
        }
    }

    others.back();

    log('---------- taskNovel end ----------');

    return true;
}

// 任务-视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    if (!clicks.text('去阅读')) {
        return false;
    }

    swipes.right();
    swipes.right();
    swipes.right();

    swipes.refresh();

    text('热榜').exists() && text('抗疫').exists() && text('小视频').exists() && text('南宁').exists() && clicks.xy(465, 597);

    for (var i = 0; i < 100; i++) {
        swipes.right();
        elementParent = className('android.widget.FrameLayout').findOne();
        if (elementParent.find(className('android.widget.RelativeLayout')).size() <= 9) {
            continue;
        } else {
            sleeps.s2to10();
        }
    }

    others.back();

    log('---------- taskVideo end ----------');

    return true;
}

// 任务-宝箱
// every 10m
function taskTreasureBox() {
    log('---------- taskTreasureBox start ----------');

    log('---------- 点击 宝箱 ----------');
    text('任务中心').exists() && clicks.xy(750 + 100, 1860 + 70);

    if (text('Close').exists()) {
        clicks.xy(750 + 100, 1860 + 70);
        return false;
    }

    var buttonClickAd = className('android.view.View').text('看完视频再领');
    if (!buttonClickAd.exists()) {
        log('---------- taskTreasureBox nothing ----------');
        return false;
    }

    log('---------- 点击 视频 ----------');
    buttonClickAd.click();
    sleeps.s35to40();

    closeAd();

    log('---------- taskTreasureBox end ----------');

    return true;
}

function closeAd() {
    var buttonCloseAd = className('android.widget.LinearLayout');
    if (!buttonCloseAd.exists()) {
        log('---------- closeAd nothing ----------');
        return false;
    }

    log('---------- 点击 关闭广告 ----------');
    buttonCloseAd.click();
    sleeps.s3();

    return true;
}
