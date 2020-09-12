/**
 * 一些比较杂的功能不好分类，就放这里吧
 */
var s = {};

/**
 * 初始化环境
 * @returns {boolean}
 */
s.initEnv = function () {
    auto();

    setScreenMetrics(1080, 2340);
};

/**
 * 启动应用
 * @param {string} packageName
 * @returns {boolean}
 */
s.launchApp = function (packageName) {
    // 避免当前有应用，先退出一次
    swipe(0, 1000, 500, 1000, 50);
    sleep(100);
    swipe(0, 1000, 500, 1000, 50);
    sleep(100);
    swipe(0, 1000, 500, 1000, 50);
    sleep(100);
    swipe(0, 1000, 500, 1000, 50);
    sleep(100);
    swipe(0, 1000, 500, 1000, 50);
    sleep(3 * 1000);

    for (var i = 0; i < 3; i++) {
        app.launch(packageName);
        sleep(10 * 1000);
    
        if (currentPackage() == packageName) {
            return true;
        }
    }

    if (currentPackage() != packageName) {
        toastLog('fail: launch');
        return false;
    }

    return false;
};


/**
 * 退出应用
 * @param {string} packageName
 * @returns {boolean}
 */
s.exitApp = function (packageName) {
    for (var i = 0; i < 3; i++) {
        swipe(0, 1000, 500, 1000, 50);
        sleep(100);
        swipe(0, 1000, 500, 1000, 50);
        sleep(100);

        if (currentPackage() != packageName) {
            return true;
        }
    }

    if (currentPackage() == packageName) {
        toastLog('fail: exit');
        return false;
    }

    return true;
};

module.exports = s;
