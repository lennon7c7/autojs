/**
 * 一些比较杂的功能不好分类，就放这里吧
 */
var clicks = require('./clicks.js');
var sleeps = require('./sleeps.js');
var swipes = require('./swipes.js');
var others = {};

/**
 * 修复文件分类目录存放
 * 因为PC保存子目录有BUG，所以只能用那么low的方法
 * @returns {boolean}
 */
others.fixDir = function () {
    var oldDir = files.cwd() + '/';

    var newDir = oldDir + 'function/';
    var filename = ['clicks.js', 'exists.js', 'others.js', 'sleeps.js', 'swipes.js'];
    filename.forEach((value, key) => {
        var oldPath = oldDir + value;
        var newPath = newDir + value;
        if (!files.exists(oldPath)) {
            return false;
        }

        if (!files.exists(newPath)) {
            return false;
        }

        var status = files.move(oldPath, newPath);
        if (!status) {
            log('---------- files.move error: oldPath =', oldPath, ' newPath =', newPath, ' ----------');
        }
    });

    newDir = oldDir + 'module/';
    filename = ['baidu.js', 'baiduhaokan.js', 'baidutieba.js',
        'diandiancaige.js', 'douyin.js', 'douyinlite.js', 'douyinhuoshan.js',
        'fanqie.js', 'fanqiechangting.js',
        'huohuoshipin.js', 'huoshan.js',
        'jibubao.js', 'jingdonglite.js', 'jukandian.js',
        'kaola.js', 'kuaikandian.js', 'kuaishou.js', 'kuaiyin.js', 'kugoudaziban.js',
        'mojitianqi.js', 'momo.js',
        'oupenglite.js', 'pinduoduo.js',
        'qqbrowser.js', 'qqreader.js', 'qutoutiao.js', 'shuqi.js', 'tianmao.js',
        'taobao.js', 'taobaolive.js', 'tencentnews.js', 'tencentnow.js', 'toutiao.js',
        'uc.js',
        'weishi.js', 'weixin.js', 'ximalaya.js', 'zhifubao.js', 'zhongqingkandian.js', 'zuiqiangdaren.js'];
    filename.forEach((value, key) => {
        var oldPath = oldDir + value;
        var newPath = newDir + value;
        if (!files.exists(oldPath)) {
            return false;
        }

        if (!files.exists(newPath)) {
            return false;
        }

        var status = files.move(oldPath, newPath);
        if (!status) {
            log('---------- files.move error: oldPath =', oldPath, ' newPath =', newPath, ' ----------');
        }
    });
};

/**
 * 初始化环境
 * @returns {boolean}
 */
others.initEnv = function () {
    auto();

    setScreenMetrics(1080, 2340);

    if (!others.isInternetOk()) {
        return false;
    }

    // 设置当前亮度模式为手动亮度
    device.setBrightnessMode(0);
    // 设置当前手动亮度为最暗
    device.setBrightness(0);

    others.fixDir();

    return true;
};

/**
 * 启动应用
 * @param {string} packageName
 * @returns {boolean}
 */
others.launch = function (packageName) {
    if (!getAppName(packageName)) {
        log('----------', packageName, '!getAppName ----------');
        return false;
    }

    others.initEnv();

    if (currentPackage() === packageName) {
        return true;
    }

    others.clear();
    app.launch(packageName);
    sleep(3 * 1000);

    // 如果应用被锁，就输入密码解锁
    if (clicks.idIfExists('app_lock_change_to_pin_btn')) {
        for (var i = 0; i < 6; i++) {
            id('app_lock_password_num0').click();
            sleep(100);
        }
    }

    sleep(15 * 1000);

    return true;
};

/**
 * 返回
 * @returns {boolean}
 */
others.back = function () {
    back();
    sleep(3000);

    return true;
};

/**
 * 返回次数 2
 * @returns {boolean}
 */
others.back2 = function () {
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
others.back3 = function () {
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
others.back4 = function () {
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
others.back6 = function () {
    for (var i = 0; i < 7; i++) {
        back();
        sleep(3000);
    }

    return true;
};

/**
 * 回到指定元素存在的页面
 * @param {string} element 指定元素
 * @returns {boolean}
 */
others.backToElement = function (element) {
    if (!element || element.exists === undefined) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (element.exists && element.exists()) {
            element = element.findOne().bounds();
            x = element.centerX();
            y = element.centerY();
            if (x >= 0 && y >= 0) {
                click(x, y);
                sleep(3 * 1000);
                return true;
            }
        }

        others.back();
    }

    return false;
};

/**
 * 回到指定包名
 * @param {string} packageName 指定包名
 * @returns {boolean}
 */
others.backToPackageName = function (packageName) {
    if (packageName === '') {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        app.launch(packageName);
        sleep(3 * 1000);
        if (currentPackage() !== packageName) {
            continue
        }

        if (currentPackage() === packageName) {
            return true;
        }
    }

    return false;
};

/**
 * 关闭广告，并返回到指定元素存在的页面
 * @param {string} element 指定元素
 * @returns {boolean}
 */
others.closeAdBackToElement = function (element) {
    others.muteMusicVolume();
    if (id('tt_top_mute').exists()) {
        clicks.centerXyById('tt_top_mute');
    } else if (id('video_audio_btn').exists()) {
        clicks.centerXyById('video_audio_btn');
    }

    sleeps.s30();

    swipes.down();

    for (var i = 0; i < 10; i++) {
        sleeps.s3();

        if (id('ksad_end_close_btn').exists()) {
            clicks.centerXyById('ksad_end_close_btn');
            break;
        } else if (id('tt_video_ad_close').exists()) {
            clicks.centerXyById('tt_video_ad_close');
            break;
        } else if (id('tt_video_ad_close_layout').exists()) {
            clicks.centerXyById('tt_video_ad_close_layout');
            break;
        } else if (idContains('tt_video_ad_close_layout').exists()) {
            idContains('tt_video_ad_close_layout').click();
            sleep(3 * 1000);
            break;
        } else if (id('sp').exists()) {
            clicks.centerXyById('sp');
            break;
        } else if (text('关闭').exists()) {
            clicks.centerXyByText('关闭');
            break;
        } else if (text('关闭广告').exists()) {
            clicks.centerXyByText('关闭广告');
            break;
        } else if (text('关闭试玩').exists()) {
            clicks.centerXyByText('关闭试玩');
            break;
        } else if (id('video_countdown').exists()) {
            clicks.centerXyById('video_countdown');
            break;
        } else if (id('video_close_icon').exists()) {
            clicks.centerXyById('video_close_icon');
            break;
        } else if (id(currentAPP.PACKAGE_NAME + ':id/video_close_icon').exists()) {
            clicks.centerXyById('video_close_icon');
            break;
        }
    }

    clicks.xy(944, 188);

    for (var i = 0; i < 10; i++) {
        if (element.exists()) {
            return true;
        }

        others.back();
    }

    return false;
};

/**
 * 清理应用
 * @returns {boolean}
 */
others.clear = function () {
    if (!recents()) {
        toastLog('fail: clear');
        return false;
    }

    sleep(2000);

    if (id('clear_all').exists()) {
        clicks.centerXyById('clear_all');
    } else if (id('clear_all_recents_image_button').exists()) {
        clicks.centerXyById('clear_all_recents_image_button');
    } else if (id('recent_igmbutton_clear_all').exists()) {
        clicks.centerXyById('recent_igmbutton_clear_all');
    } else if (id('stack_clear_all').exists()) {
        clicks.centerXyById('stack_clear_all');
    }

    return true;
};

/**
 * 发送报警信息
 * @param {string} message
 * @returns {boolean}
 */
others.send = function (message) {
    url = 'https://oapi.dingtalk.com/robot/send?access_token=9189c02ffd38ffaf091bcc3a07558c83cf961780360e73ccbfcb24dd25db95fd';
    response = http.postJson(url, {
        'msgtype': 'markdown',
        'markdown': {
            'title': '监控报警',
            'text': '#### ' + message + "\n\n" + device
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
others.exit = function () {
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
others.lockScreen = function () {
    if (!home()) {
        toastLog('fail: home');
        return false;
    }

    sleep(2000);
    desc('一键锁屏').click();

    return true;
};

/**
 * 设置当前媒体音量 为 静音
 * @returns {boolean}
 */
others.muteMusicVolume = function () {
    if (device.getMusicVolume() === 0) {
        return true;
    }

    device.setMusicVolume(0);

    return true;
};

/**
 * 是否网络正常
 * @returns {boolean}
 */
others.isInternetOk = function () {
    var url = 'www.baidu.com';
    var res = http.get(url);
    if (res.statusCode !== 200) {
        toastLog('网络断开');
        return false;
    }

    return true;
}

module.exports = others;
