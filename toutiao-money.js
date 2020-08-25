/**
 * 头条-所有金币任务
 */
main();

function main() {
    initEnv();

    launchApp("今日头条极速版");
    sleep10s();

    task();
    // closeAd();

    console.log("---------- done ----------")
}

// 任务
function task() {
    console.log("---------- task start ----------")

    var buttonClickTask = id("ey").className("android.widget.TextView").text("任务");
    if (!buttonClickTask.exists()) {
        console.log("---------- 任务界面 nothing ----------")
        return false;
    }
    console.log("---------- 点击 任务界面 ----------")
    buttonClickTask.findOne().parent().click();
    sleep3s();

    taskTreasureBox();
    taskNovel();
    taskVideo();

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
    sleep3s();

    console.log("---------- click last novel ----------")
    click(264, 687, 429, 738);
    sleep3s();

    for (var i = 0; i < 50; i++) {
        customSleep(1);
        swipeRight();

        // // 随机出现奖励金币，但是无法定位，只能先关闭
        // click(477, 1637, 603, 1763);
        // sleep1s();

        var buttonAd = id("ant");
        if (buttonAd.exists()) {
            console.log("this's ad, next")
            swipeRight();
        }
    }

    swipeReturn();

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
    sleep3s();

    swipeRight();
    swipeRight();

    console.log("---------- click first video ----------")
    click(24, 1025, 515, 1147);
    sleep3s();

    for (var i = 0; i < 50; i++) {
        customSleep(getRandomInt(5));
        swipeRight();

        var buttonAd = text("广告");
        if (buttonAd.exists()) {
            swipeRight();
        }
    }

    swipeReturn();

    console.log("---------- task video end ----------")

    return true;
}

// 任务-宝箱
// every 10m
function taskTreasureBox() {
    console.log("---------- taskTreasureBox start ----------")

    console.log("---------- 点击 宝箱 ----------")
    click(750, 1860, 1038, 2151);
    sleep3s();

    var buttonClickAd = className("android.view.View").text("看完视频再领");
    if (!buttonClickAd.exists()) {
        console.log("---------- taskTreasureBox nothing ----------")
        return false;
    }

    console.log("---------- 点击 视频 ----------")
    buttonClickAd.click();
    customSleep(35);

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
    sleep3s();


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

    registEventExit();
}

/**
 * 滑动-退出
 */
function swipeReturn() {
    console.log("---------- return ----------")
    swipe(0, 1000, 500, 1000, 50);
    sleep3s();
}

/**
 * 滑动-右到左
 */
function swipeRight() {
    swipe(900, 1100, 100, 1100, 500);
    sleep1s();
}

/**
 * 滑动-下到上
 */
function swipeDown() {
    swipe(500, 1600, 500, 600, 500);
    sleep1s();
}

/**
 * 获取随机整数
 */
function getRandomInt(max) {
    let value = Math.floor(Math.random() * Math.floor(max));
    return value >= 2 ? value : 2;
}

// 延迟执行-x秒
function customSleep(time) {
    sleep(time * 1000);
}

// 延迟执行-1秒
function sleep1s() {
    sleep(1 * 1000);
}

// 延迟执行-3秒
function sleep3s() {
    sleep(3 * 1000);
}

// 延迟执行-5秒
function sleep5s() {
    sleep(5 * 1000);
}

// 延迟执行-10秒
function sleep10s() {
    sleep(10 * 1000);
}

// 延迟执行-30秒
function sleep30s() {
    sleep(30 * 1000);
}

// 延迟执行-35秒
function sleep35s() {
    sleep(35 * 1000);
}

// 监听事件-音量上键退出
function registEventExit() {
    events.observeKey();
    events.onKeyDown("volume_down", function (event) {
        toast("manual exit");
        exit();
    });
}
