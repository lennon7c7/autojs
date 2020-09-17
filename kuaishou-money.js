/**
 * 快手-所有金币任务
 * 当前存在问题
 * 1. 无法判断是否成功通过验证码（就随便滑动，瞎蒙呗）
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.kuaishou.nebula';

while (true) {
    main();
}

function main() {
    others.initEnv();

    var status = others.launchApp(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.id('redFloat')) {
        return false;
    }

    status1 = taskTreasureBox();
    status4 = taskAd10();
    status2 = task0Lottery();
    status3 = taskVideo();

    if (status1 && status2 && status3 && status4) {
        others.exit();
    }
}

// 任务-0元抽奖
function task0Lottery() {
    console.log("---------- task0Lottery start ----------");

    others.back3();

    if (!clicks.id('left_btn')) {
        return false;
    }

    if (!clicks.text('More')) {
        return false;
    }

    if (!clicks.text('Kwai Shop')) {
        return false;
    }

    if (!clicks.text('0元抽奖')) {
        return false;
    }

    if (text('提高中奖率').find().size() == 3) {
        swipes.down();
        clicks.xy(396, 1386);
    }

    if (text('提高中奖率').find().size() == 10) {
        return true;
    }

    // switch (text('提高中奖率').find().size()) {
    //     case 3:
    //         clicks.text('免费抽')
    //         swipes.down();
    //         swipes.down();     
    //         break;
    //     default:
    //         break;
    // }

    for (var i = 0; i < 10; i++) {
        if (!clicks.text('免费抽')) {
            continue;
        }

        if (!clicks.text('分享活动 立即参与')) {
            others.back();
            continue;
        }

        clicks.xy(207, 1293);
        app.launch('com.kuaishou.nebula');
        sleeps.s2to3();
        others.back();
    }

    others.back();

    console.log("---------- task0Lottery end ----------");

    return false;
}

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    console.log("---------- taskTreasureBox start ----------");

    if (!clicks.text("开宝箱得金币")) {
        return true;
    }

    clicks.xy(480, 1620);

    console.log("---------- taskTreasureBox end ----------");

    return true;
}

// 任务-10次广告
function taskAd10() {
    console.log("---------- taskAd10 start ----------");

    if (text("明日再来").exists()) {
        return true;
    }

    for (var i = 0; i < 10; i++) {
        if (className("android.widget.Button").text("福利").exists()) {
            className("android.widget.Button").text("福利").click();
        } else if (className("android.widget.Button").text("福利 领金币").exists()) {
            className("android.widget.Button").text("福利 领金币").click();
        } else {
            continue;
        }

        clicks.id('video_audio_btn');
        sleeps.s35();
        if (id("video_countdown").exists()) {
            id("video_countdown").click();
            sleeps.s3();
        }
    }

    console.log("---------- taskAd10 end ----------");

    return true;
}

// 任务-视频
function taskVideo() {
    console.log("---------- taskVideo start ----------");

    others.back();
    others.back();

    for (var i = 0; i < 1200; i++) {
        if (text('Drag the slider').exists()) {
            swipe(87, 969, 700, 969, 700);
            sleeps.s2to3();
            others.back();
        }

        swipes.down1600();
        sleeps.s10to30();
    }

    console.log("---------- taskVideo end ----------");

    return true;
}
