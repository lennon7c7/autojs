/**
 * 抖音-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.ss.android.ugc.aweme.lite';

while (true) {
    main()
}

function main() {
    others.initEnv();

    others.launchApp(PACKAGE_NAME);

    others.back();

    // 任务界面
    clicks.xy(479, 2216);

    status0 = taskCheckin();
    status1 = taskTreasureBox();
    status2 = taskLimit();
    status3 = taskSleep();
    status4 = taskVideo();

    if (status0 && status1 && status2 && status3 && status4) {
        others.exit();
    }
}

/**
 * 任务-签到
 */
function taskCheckin() {
    console.log("---------- taskCheckin start ----------");

    if (text("明日签到").exists()) {
        return true;
    }

    if (!clicks.text("签到")) {
        return false;
    }

    if (text("明日签到").exists()) {
        return true;
    }

    console.log("---------- taskCheckin end ----------");

    return false;
}

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    console.log("---------- taskTreasureBox start ----------");

    if (!clicks.text("开宝箱得金币")) {
        return false;
    }

    if (!clicks.text("看广告视频再赚")) {
        return false;
    }

    closeAd();

    console.log("---------- taskTreasureBox end ----------");

    return true;
}

// 任务-限时
// every 20m
function taskLimit() {
    console.log("---------- taskLimit start ----------");

    if (text('限时任务赚金币').findOne().parent().parent().findOne(text('已领取')) != null) {
        return true;
    }
    
    if (!clicks.text('限时任务赚金币')) {
        return false;
    }

    closeAd();

    console.log("---------- taskLimit end ----------");

    return true;
}

// 任务-睡觉赚钱
function taskSleep() {
    console.log("---------- taskSleep start ----------");

    if (!clicks.text("睡觉赚金币")) {
        return false;
    }

    if (clicks.text("我睡醒了")) {
        if (clicks.text("可领取")) {
            others.back();
            return true;
        }
    } else if (clicks.text("我要睡了")) {
        others.back();
        return true;
    }

    console.log("---------- taskSleep end ----------");

    return false;
}

// 任务-小视频
function taskVideo() {
    console.log("---------- taskVideo start ----------");

    others.back2();

    for (var i = 0; i < 1200; i++) {
        swipes.down();
        sleeps.s5to10();
    }

    console.log("---------- taskVideo end ----------");

    return true;
}

function closeAd() {
    clicks.xy(48, 162);
    sleeps.s35to40();

    if (!clicks.text('关闭广告')) {
        return false;
    }

    return true;
}
