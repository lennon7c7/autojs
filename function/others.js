/**
 * 一些比较杂的功能不好分类，就放这里吧
 */
var s = {};

/**
 * 修复文件分类目录存放
 * 因为PC保存子目录有BUG，所以只能用那么low的方法
 * @returns {boolean}
 */
s.fixDir = function () {
    oldDir = files.cwd() + '/';

    newDir = oldDir + 'function/';
    filename = ['clicks.js', 'exists.js', 'others.js', 'sleeps.js', 'swipes.js'];
    filename.forEach((value, key) => {
        if (!files.exists(oldDir + value)) {
            return false;
        }

        status = files.move(oldDir + value, newDir + value);
        if (!status) {
            log('files.move error: ' + value);
        }
    });

    newDir = oldDir + 'module/';
    filename = ['baidu.js', 'baiduhaokan.js', 'baidutieba.js',
        'diandiancaige.js', 'douyin.js', , 'douyinlite.js', 'douyinhuoshan.js', 'fanqie.js', 'huoshan.js', 'jingdonglite.js',
        'kaola.js', 'kuaishou.js', 'kugoudaziban.js', 'mojitianqi.js', 'momo.js', 'pinduoduo.js',
        'qqbrowser.js', 'qqreader.js', 'qutoutiao.js', 'shuqi.js', 'tianmao.js',
        'taobao.js', 'tencentnews.js', 'tencentnow.js', 'toutiao.js',
        'uc.js',
        'weishi.js', 'weixin.js', 'ximalaya.js', 'zhifubao.js', 'zhongqingkandian.js', 'zuiqiangdaren.js'];
    filename.forEach((value, key) => {
        if (!files.exists(oldDir + value)) {
            return false;
        }

        status = files.move(oldDir + value, newDir + value);
        if (!status) {
            log('files.move error: ' + value);
        }
    });
};

/**
 * 初始化环境
 * @returns {boolean}
 */
s.initEnv = function () {
    auto();

    setScreenMetrics(1080, 2340);

    s.fixDir();
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
    back();
    sleep(3000);

    return true;
};

/**
 * 返回次数 2
 * @returns {boolean}
 */
s.back2 = function () {
    for (var i = 0; i < 2; i++) {
        back();
        sleep(3000);
    }

    return true;
};

/**
 * 返回次数 3
 * @returns {boolean}
 */
s.back3 = function () {
    for (var i = 0; i < 3; i++) {
        back();
        sleep(3000);
    }

    return true;
};

/**
 * 返回次数 4
 * @returns {boolean}
 */
s.back4 = function () {
    for (var i = 0; i < 5; i++) {
        back();
        sleep(3000);
    }

    return true;
};

/**
 * 返回次数 6
 * @returns {boolean}
 */
s.back6 = function () {
    for (var i = 0; i < 7; i++) {
        back();
        sleep(3000);
    }

    return true;
};

/**
 * 回到指定元素存在的页面
 * @param {int} element 指定元素
 * @returns {boolean}
 */
s.backToElement = function (element) {
    if (!element || element.exists === undefined) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (element.exists()) {
            element = element.findOne().bounds();
            x = element.centerX();
            y = element.centerY();
            if (x >= 0 && y >= 0) {
                click(x, y);
                sleep(3 * 1000);
                return true;
            }
        }
  
        s.back();
    }

    return false;
}

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
    if (responseJson.errcode !== 0 || responseJson.errmsg !== 'ok') {
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
