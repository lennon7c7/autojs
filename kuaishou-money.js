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

    console.log("---------- button 任务界面 ----------")
    id("menu_recycler_view").findOne().children().forEach(child => {
        if (child.findOne(id("title")).text() == "去赚钱") {
            clicks.click(192, 979);
            // child.findOne(id("title")).click();
        }
    })

    taskAd10();
    taskVideo();
}

// 任务-10次广告
function taskAd10() {
    console.log("---------- taskLimit start ----------")

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

    console.log("---------- taskLimit end ----------")

    return true;
}

// 任务-视频
function taskVideo() {
    console.log("---------- task video start ----------")

    var buttonClickTask = className("android.widget.Button").text("去赚钱");
    if (!buttonClickTask.exists()) {
        console.log("---------- task video nothing ----------")
        return false;
    }
    console.log("---------- click video ----------")
    buttonClickTask.findOne().click();
    sleeps.s3();

    while (true) {
        sleeps.custom(sleeps.getRandomInt(5));
        swipes.down1600();
    }
}

/**
 * 初始化环境
 */
function initEnv() {
    auto();

    setScreenMetrics(1080, 2340);
}
