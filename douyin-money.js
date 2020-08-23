/**
 * 抖音-所有金币任务
 */
main();

function main() {
    initEnv();

    launchApp("抖音极速版");
    sleep10s();

    // 任务界面
    click(427, 2130, 652, 2304);
    sleep3s();

    taskTreasureBox();
    taskLimit();
}

// 限时任务
function taskLimit() {
    console.log("---------- taskLimit start ----------")

    var buttonCloseAd = className("android.view.View").text("去领取").depth(8);
    if (!buttonCloseAd.exists()) {
        console.log("---------- taskLimit nothing ----------")
        return false;
    }

    console.log("---------- 点击 去领取 ----------")
    buttonCloseAd.click();
    sleep35s();

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
    sleep3s();

    console.log("---------- 点击 宝箱-视频 ----------")
    click(231, 1288, 357, 1349);
    sleep35s();

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
