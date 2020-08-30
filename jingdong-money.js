/**
 * 京东-所有金币任务
*/
var sleeps = require('sleep.js');
var swipes = require('swipe.js');

main();

function main() {
    initEnv();

    launchApp("京东极速版");
    sleeps.s10();

    console.log("---------- button 任务界面 ----------")
    className("android.view.View").desc("赚钱").findOne().click();
    sleeps.s3();

    taskVideo();
    taskProduct();
}

// 任务-浏览商品
function taskProduct() {
    console.log("---------- task product start ----------")

    console.log("---------- button into ----------")
    click(807, 2095);
    sleeps.s3();

    console.log("---------- first video into ----------")
    click(59, 1233);
    sleeps.s3();

    for (var i = 0; i < 100; i++) {
        swipes.down1600();
        sleeps.s2to4();

        swipes.down1600();
        sleeps.s2to3();

        swipes.down1600();
        sleeps.s2to5();

        if (id("ll_task_bottom_next").exists()) {
            id("ll_task_bottom_next").click();
            sleeps.s2to3();
        } else {
            swipes.return();
        }
    }

    console.log("---------- task product end ----------")

    return true;
}

// 任务-小视频
function taskVideo() {
    console.log("---------- task video start ----------")

    console.log("---------- button into ----------")
    click(807, 2095);
    sleeps.s3();

    console.log("---------- first video into ----------")
    click(59, 1233);
    sleeps.s3();

    for (var i = 0; i < 100000; i++) {
        sleeps.s10to20();
        swipes.down1600();
    }

    console.log("---------- task video end ----------")

    return true;
}

/**
 * 初始化环境
 */
function initEnv() {
    auto();

    setScreenMetrics(1080, 2340);
}
