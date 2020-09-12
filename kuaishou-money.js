/**
 * 快手-所有金币任务
 * 当前存在问题
 * 1. 无法判断是否处于验证码状态
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

while (true) {
    main();
}

function main() {
    others.initEnv();

    others.launchApp('com.kuaishou.nebula');

    var buttonMenu = id("left_btn");
    if (!buttonMenu.exists()) {
        return false;
    }
    clicks.findOne(buttonMenu);

    console.log("---------- button 任务界面 ----------");
    if (text('去赚钱').exists()) {
        clicks.text('去赚钱');
    }

    taskTreasureBox();
    taskAd10();
    taskVideo();
}

// 任务-宝箱
// every 5m
function taskTreasureBox() {
    console.log("---------- task start ----------");

    var buttonClickTask = className("android.view.View").text("开宝箱得金币");
    if (!buttonClickTask.exists()) {
        console.log("---------- task nothing ----------");
        return false;
    }
    clicks.findOne(buttonClickTask);

    console.log("---------- task end ----------");

    return true;
}

// 任务-10次广告
function taskAd10() {
    console.log("---------- task start ----------");

    for (var i = 0; i < 10; i++) {
        if (className("android.widget.Button").text("福利").exists()) {
            className("android.widget.Button").text("福利").click();
            sleeps.s35();
        } else if (className("android.widget.Button").text("福利 领金币").exists()) {
            className("android.widget.Button").text("福利 领金币").click();
            sleeps.s35();
        } else {
            continue;
        }

        if (id("video_countdown").exists()) {
            id("video_countdown").click();
            sleeps.s3();
        }
    }

    console.log("---------- task end ----------");

    return true;
}

// 任务-视频
function taskVideo() {
    console.log("---------- task start ----------");

    var buttonClickTask = className("android.widget.Button").text("去赚钱");
    if (!buttonClickTask.exists()) {
        console.log("---------- task nothing ----------");
        return false;
    }
    buttonClickTask.findOne().click();
    sleeps.s3();

    for (var i = 0; i < 1000; i++) {
        swipes.down1600();
        sleeps.s10to30();
    }
}
