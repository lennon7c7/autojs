/**
 * 一些比较杂的功能不好分类，就放这里吧
 */
var clicks = require('./clicks.js');
var sleeps = require('./sleeps.js');
var swipes = require('./swipes.js');
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
        'diandiancaige.js', 'douyin.js', 'douyinlite.js', 'douyinhuoshan.js',
        'fanqie.js', 'fanqiechangting.js',
        'huohuoshipin.js', 'huoshan.js',
        'jibubao.js', 'jingdonglite.js', 'jukandian.js',
        'kaola.js', 'kuaishou.js', 'kuaiyin.js', 'kugoudaziban.js', 'mojitianqi.js', 'momo.js', 'pinduoduo.js',
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
    s.initEnv();

    if (currentPackage() === packageName) {
        return true;
    }

    s.clear();
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
 * @param {string} element 指定元素
 * @returns {boolean}
 */
s.backToElement = function (element) {
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

        s.back();
    }

    return false;
};

/**
 * 回到指定包名
 * @param {string} packageName 指定包名
 * @returns {boolean}
 */
s.backToPackageName = function (packageName) {
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
s.closeAdBackToElement = function (element) {
    s.muteMusicVolume();
    if (id('tt_top_mute').exists()) {
        clicks.centerXyById('tt_top_mute');
    } else if (id('video_audio_btn').exists()) {
        clicks.centerXyById('video_audio_btn');
    }

    sleeps.s30();

    if (textContains('浏览').exists()) {
        swipes.down();
    }

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
        }
    }

    clicks.xy(944, 188);

    for (var i = 0; i < 10; i++) {
        if (element.exists()) {
            return true;
        }

        s.back();
    }

    return false;
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
s.send = function (message) {
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

/**
 * 设置当前媒体音量 为 静音
 * @returns {boolean}
 */
s.muteMusicVolume = function () {
    if (device.getMusicVolume() === 0) {
        return true;
    }

    device.setMusicVolume(0);

    return true;
};

module.exports = s;
