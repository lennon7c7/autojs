/**
 * 抖音-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

while (true) {
    main()
}

function main() {
    others.initEnv();

    others.launchApp('com.ss.android.ugc.aweme.lite');

    swipes.return();

    // 任务界面
    clicks.click(427, 2130);

    taskTreasureBox();
    taskLimit();
    taskVideo();
}

// 任务-小视频
function taskVideo() {
    console.log("---------- task video start ----------")

    console.log("---------- index page ----------")
    swipes.return();

    for (var i = 0; i < 200; i++) {
        swipes.down();
        sleeps.s5to10();
    }

    console.log("---------- task video end ----------")

    return true;
}

// 任务-限时
// every 20m
function taskLimit() {
    console.log("---------- taskLimit start ----------")

    var buttonCloseAd = className("android.view.View").text("去领取").depth(8);
    if (!buttonCloseAd.exists()) {
        console.log("---------- taskLimit nothing ----------")
        return false;
    }

    console.log("---------- 点击 去领取 ----------")
    buttonCloseAd.click();
    sleeps.s35to40();

    closeAd();

    console.log("---------- taskLimit end ----------")

    return true;
}

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    console.log("---------- taskTreasureBox start ----------")

    console.log("---------- 点击 宝箱 ----------")
    clicks.click(801, 2004);

    console.log("---------- 点击 宝箱-视频 ----------")
    clicks.click(231, 1288);

    closeAd();

    console.log("---------- taskTreasureBox end ----------")

    return true;
}

function closeAd() {
    var buttonCloseAd = className("android.widget.TextView").text("关闭广告");
    if (!buttonCloseAd.exists()) {
        console.log("---------- closeAd nothing ----------")
        return false;
    }

    console.log("---------- 点击 关闭广告 ----------")
    buttonCloseAd.click();
    sleeps.s3();

    return true;
}
