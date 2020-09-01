/**
 * 抖音-所有金币任务
 */
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

main();

function main() {
    initEnv();

    launchApp("抖音极速版");
    sleeps.s10();

    swipes.return();

    // 任务界面
    click(427, 2130, 652, 2304);
    sleeps.s3();

    taskTreasureBox();
    taskLimit();
    taskVideo();
}

// 任务-小视频
function taskVideo() {
    console.log("---------- task video start ----------")

    console.log("---------- index page ----------")
    swipes.return();
    sleeps.s3();

    for (var i = 0; i < 50; i++) {
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
    click(801, 2004, 1035, 2238);
    sleeps.s3();

    console.log("---------- 点击 宝箱-视频 ----------")
    click(231, 1288, 357, 1349);
    sleeps.s35to40();

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

/**
 * 初始化环境
 */
function initEnv() {
    auto();

    setScreenMetrics(1080, 2340);
}
