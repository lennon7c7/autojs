/**
 * 微信朋友圈-自动点赞
 */
main();

function main() {
    initEnv();

    momentAutoClickLike();

    console.log("---------- done ----------")
}

function momentAutoClickLike() {
    toast("启动 微信");
    app.launch("com.tencent.mm");
    sleep(3000);

    var buttonDiscover = id("cns").className("android.widget.TextView").text("Discover").findOne().parent()
    if (text("Discover").exists()) {
        toast("点击 发现");
        buttonDiscover.click()
        sleep(3000);
    }

    if (text("Moments").exists()) {
        toast("点击 朋友圈");
        click(0, 232, 1080, 384)
        sleep(3000);
    }

    if (!text("Tap to change album cover").exists()) {
        toast("双击 顶部-更新朋友圈");
        click(108, 136, 302, 198)
        sleep(100);
        click(108, 136, 302, 198)
        sleep(3000);
    }

    // 使得程序可以一直运行，向下滚动
    while (true) {
        clickLikeButton();
    }
}

// 点赞当前页面的动态
function clickLikeButton() {
    // 这里是需找到可以滚动的控件：ListView，className是不会改变的，这样写出来的程序会比较稳定
    var scroll = className("ListView").findOne();
    // 子控件
    var scroll_thing = scroll.children();
    // 遍历子控件
    scroll_thing.forEach((item, position) => {
        var comment = item.findOne(desc("Comment"));
        if (comment) {
            comment.click();
            sleep(200)

            // 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，如果找到符合条件的控件则返回该控件；否则返回null
            click("Like")
            count++;
            customSleep(getRandomInt(5));
        }
    });

    // 直接调用向下滚动的方法
    scrollDown();
    sleep(1000);
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

// 监听事件-音量上键退出
function registEventExit() {
    events.observeKey();
    events.onKeyDown("volume_down", function (event) {
        toast("manual exit");
        exit();
    });
}
