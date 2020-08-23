/**
 * 火山-所有金币任务
 */
main();

function main() {
    initEnv();

    launchApp("火山极速版");
    sleep10s();

    if (!id("xc").exists()) {
        console.log("---------- 任务界面 nothing ----------")
  
        return false;
    }

    console.log("---------- click 任务界面 ----------")
    id("xc").click();
    sleep3s();

    taskTreasureBox();
    taskAd20();
}

// 任务-20次广告
function taskAd20() {
    console.log("---------- taskAd20 start ----------")

    for (var i = 0; i < 20; i++) {
        var buttonAd = className("android.view.View").text("领100金币");
        if (buttonAd.exists()) {
            buttonAd.click();
            sleep35s();
            closeAd();
        }
    }

    console.log("---------- taskAd20 end ----------")

    return true;
}

// 任务-宝箱
// every 30m
function taskTreasureBox() {
    console.log("---------- taskTreasureBox start ----------")

    var buttonBox = className("android.view.View").text("开宝箱得金币");
    if (!buttonBox.exists()) {
        console.log("---------- click 宝箱 nothing ----------")
        return false;
    }
    console.log("---------- click 宝箱 ----------")
    buttonBox.findOne().click();
    sleep1s();

    var buttonAd = className("android.view.View").text("看视频 金币翻8倍");
    if (!buttonAd.exists()) {
        console.log("---------- click ad nothing ----------")
        return false;
    }
    console.log("---------- click ad ----------")
    buttonAd.findOne().click();
    // click(201, 1398, 879, 1584);
    sleep35s();

    closeAd();

    console.log("---------- taskTreasureBox end ----------")

    return true;
}

// 关闭广告
function closeAd() {
    var buttonCloseAd = className("android.widget.TextView").text("关闭广告");
    if (!buttonCloseAd.exists()) {
        console.log("---------- click ad nothing ----------")
        return false;
    }
    console.log("---------- click ad ----------")
    buttonCloseAd.click();
    sleep3s();

    var buttonCloseAdConfirm = id("sp");
    if (!buttonCloseAdConfirm.exists()) {
        console.log("---------- close ad confirm nothing ----------")
        return false;
    }
    console.log("---------- click ad confirm ----------")
    buttonCloseAdConfirm.click();
    sleep3s();

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
