/**
 * 番茄-所有金币任务
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

    others.launchApp('com.dragon.read');

    task();
}

// 任务
function task() {
    console.log("---------- task start ----------");

    clicks.xy(432, 2166);

    taskTreasureBox();
    taskAd();
    taskBook();

    console.log("---------- task end ----------");

    return true;
}

// 任务-看书
function taskBook() {
    console.log("---------- task book start ----------");

    var buttonClickTask = className("android.widget.RadioButton").text("书架");
    if (!buttonClickTask.exists()) {
        console.log("---------- task book nothing ----------");
        return false;
    }
    console.log("---------- click book ----------");
    clicks.findOne(buttonClickTask);

    clicks.xy(72, 906);

    for (var i = 0; i < 10000; i++) {
        swipes.right2100();
        sleeps.s2to3();
    }

    console.log("---------- task book end ----------");

    return true;
}

// 任务-Ad
function taskAd() {
    console.log("---------- task ad start ----------");

    for (var i = 0; i < 10; i++) {
        var buttonClickTask = className("android.view.View").text("看视频赚海量金币");
        if (!buttonClickTask.exists()) {
            console.log("---------- task ad nothing ----------");
            return false;
        }
        console.log("---------- click ad ----------");
        clicks.findOne(buttonClickTask);

        var buttonMute = id("tt_top_mute");
        if (!buttonMute.exists()) {
            return false;
        }
        clicks.findOne(buttonMute);

        sleeps.s35to40();

        closeAd();
    }

    console.log("---------- task ad end ----------");

    return true;
}

// 任务-宝箱
// every 1h
function taskTreasureBox() {
    console.log("---------- taskTreasureBox start ----------");

    console.log("---------- 点击 宝箱 ----------");
    clicks.xy(750 + 100, 1860 + 70);

    console.log("---------- 点击 视频 ----------");
    clicks.xy(247, 1170);

    var buttonMute = id("tt_top_mute");
    if (!buttonMute.exists()) {
        return false;
    }
    clicks.findOne(buttonMute);

    sleeps.s35to40();

    closeAd();

    console.log("---------- taskTreasureBox end ----------");

    return true;
}

function closeAd() {
    var buttonMute = id("tt_video_ad_close_layout");
    if (!buttonMute.exists()) {
        console.log("---------- closeAd nothing ----------");
        return false;
    }
    clicks.findOne(buttonMute);

    return true;
}
