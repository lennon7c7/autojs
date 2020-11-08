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
    sleep(15 * 1000);
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

    if (id('clear_all').exists()) {
        id('clear_all').click();
    } else if (id('clear_all_recents_image_button').exists()) {
        id('clear_all_recents_image_button').click();
    }

    sleep(3000);

    return true;
};

/**
 * 发送报警信息
 * @param {string} message 
 * @returns {boolean}
 */
s.send = function (message) {
    url = 'https://oapi.dingtalk.com/robot/send?access_token=9189c02ffd38ffaf091bcc3a07558c83cf961780360e73ccbfcb24dd25db95fd';
    response = http.postJson(url, {
        'msgtype': 'markdown',
        'markdown': {
            'title': '监控报警',
            'text': '#### ' + message
        }
    });
 
    responseJson = response.body.json();
    if (responseJson.errcode != 0 || responseJson.errmsg != 'ok') {
        log('---------- dingtalk log error ----------');

        return false;
    }

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
    id('clear_all_recents_image_button').click();
    sleep(3000);

    exit();

    return true;
};

/**
 * 一键锁屏
 * @returns {boolean}
 */
s.lockScreen = function () {
    if (!home()) {
        toastLog('fail: home');
        return false;
    }

    sleep(2000);
    desc('一键锁屏').click();

    return true;
};

module.exports = s;
