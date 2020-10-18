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
s.launch = function (packageName) {
    s.clear();

    s.initEnv();

    status = app.launch(packageName);
    sleep(10 * 1000);
    if (!status) {
        return false;
    }

    return true;
};

/**
 * 返回
 * @returns {boolean}
 */
s.back = function () {
    if (!back()) {
        toastLog('fail: back');
        return false;
    }

    sleep(2000);

    return true;
};

/**
 * 返回次数 2
 * @returns {boolean}
 */
s.back2 = function () {
    if (!back()) {
        toastLog('fail: back 1');
        return false;
    }

    sleep(3000);

    if (!back()) {
        toastLog('fail: back 2');
        return false;
    }

    sleep(2000);

    return true;
};

/**
 * 返回次数 3
 * @returns {boolean}
 */
s.back3 = function () {
    if (!back()) {
        toastLog('fail: back 1');
        return false;
    }

    sleep(3000);

    if (!back()) {
        toastLog('fail: back 2');
        return false;
    }

    sleep(3000);

    if (!back()) {
        toastLog('fail: back 3');
        return false;
    }

    sleep(2000);

    return true;
};

/**
 * 清理应用
 * @returns {boolean}
 */
s.clear = function () {
    if (!recents()) {
        toastLog('fail: clear');
        return false;
    }

    sleep(2000);
    clicks.id('clear_all');
    clicks.id('clear_all_recents_image_button');
    sleep(3000);

    return true;
};

/**
 * 退出脚本
 * @returns {boolean}
 */
s.exit = function () {
    if (!recents()) {
        toastLog('fail: exit');
        return false;
    }

    sleep(2000);
    clicks.id('clear_all_recents_image_button');
    sleep(3000);

    exit();

    return true;
};

module.exports = s;
