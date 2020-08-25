/**
 * 快手-所有金币任务
 */
main();

function main() {
    initEnv();

    launchApp("快手极速版");
    sleep10s();

    // 任务界面
    click(427, 2130, 652, 2304);
    sleep3s();

    taskAd20();
}

// 任务-10次广告
function taskAd20() {
    console.log("---------- taskLimit start ----------")

    for (var i = 0; i < 10; i++) {
        if (className("android.widget.Button").text("福利").exists()) {
            className("android.widget.Button").text("福利").click();
            sleep35s();
        }

        if (id("video_countdown").exists()) {
            id("video_countdown").click();
            sleep3s();
        }
    }

    console.log("---------- taskLimit end ----------")

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
