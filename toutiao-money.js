/**
 * 头条-所有金币任务
 */
var sleeps = require('sleep.js');
var swipes = require('swipe.js');

main();

function main() {
    initEnv();

    launchApp("今日头条极速版");
    sleeps.s10();

    while (true) {
        task();
    }
}

// 任务
function task() {
    console.log("---------- task start ----------")

    swipes.return();

    var buttonClickTask = id("ey").className("android.widget.TextView").text("任务");
    if (!buttonClickTask.exists()) {
        console.log("---------- 任务界面 nothing ----------")
        return false;
    }
    console.log("---------- 点击 任务界面 ----------")
    buttonClickTask.findOne().parent().click();
    sleeps.s3();

    taskTreasureBox();
    taskVideo();
    // taskNovel();

    console.log("---------- task end ----------")

    return true;
}

// 任务-小说
function taskNovel() {
    console.log("---------- task novel start ----------")

    var buttonClickTask = className("android.widget.Button").text("看小说");
    if (!buttonClickTask.exists()) {
        console.log("---------- task novel nothing ----------")
        return false;
    }
    console.log("---------- click novel ----------")
    buttonClickTask.findOne().parent().click();
    sleeps.s3();

    console.log("---------- click last novel ----------")
    click(264, 687, 429, 738);
    sleeps.s3();

    for (var i = 0; i < 50; i++) {
        swipes.right200();
        sleeps.s2to3();

        // // 随机出现奖励金币，但是无法定位，只能先关闭
        // click(477, 1637, 603, 1763);

        var buttonAd = id("ant");
        if (buttonAd.exists()) {
            console.log("this's ad, next")
            swipes.right200();
        }
    }

    swipes.return();

    console.log("---------- task novel end ----------")

    return true;
}

// 任务-小视频
function taskVideo() {
    console.log("---------- task video start ----------")

    var buttonClickTask = className("android.widget.Button").text("去阅读");
    if (!buttonClickTask.exists()) {
        console.log("---------- task video nothing ----------")
        return false;
    }
    console.log("---------- click video ----------")
    buttonClickTask.findOne().parent().click();
    sleeps.s3();

    swipes.right();
    swipes.right();

    console.log("---------- click first video ----------")
    click(24, 1025, 515, 1147);
    sleeps.s3();

    for (var i = 0; i < 50; i++) {
        swipes.right();
        sleeps.s5to10();

        var buttonAd = text("广告");
        if (buttonAd.exists()) {
            swipes.right();
        }
    }

    swipes.return();

    console.log("---------- task video end ----------")

    return true;
}

// 任务-宝箱
// every 10m
function taskTreasureBox() {
    console.log("---------- taskTreasureBox start ----------")

    console.log("---------- 点击 宝箱 ----------")
    click(750, 1860, 1038, 2151);
    sleeps.s3();

    var buttonClickAd = className("android.view.View").text("看完视频再领");
    if (!buttonClickAd.exists()) {
        console.log("---------- taskTreasureBox nothing ----------")
        return false;
    }

    console.log("---------- 点击 视频 ----------")
    buttonClickAd.click();
    sleeps.s35to40();

    closeAd();

    console.log("---------- taskTreasureBox end ----------")

    return true;
}

function closeAd() {
    var buttonCloseAd = className("android.widget.LinearLayout");
    if (!buttonCloseAd.exists()) {
        console.log("---------- closeAd nothing ----------")
        return false;
    }

    console.log("---------- 点击 关闭广告 ----------")
    buttonCloseAd.click();
    sleeps.s3();


    console.log("---------- 点击 关闭奖励提醒 ----------")
    click(477, 1158, 603, 1284);

    return true;
}

/**
 * 初始化环境
 */
function initEnv() {
    auto();

    setScreenMetrics(1080, 2340);
}
