/**
 * 京东-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.jingdong.app.mall';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);
currentAPP.VERSION = '9.4.6';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2021/04/06/7/120_da18100cae7d790437e6bb03be0a99d7.apk';

// 任务-签到
function taskCheckin() {
    log('----------', currentAPP.NAME, 'taskCheckin start ----------');

    if (!exists.backToElement(desc('首页'))) {
        return false;
    }

    if (!clicks.textParent('领京豆')) {
        return false;
    }
    sleeps.s5()

    if (text('签到领京豆').exists()) {
        clicks.centerXyByText('签到领京豆');
    }

    if (textStartsWith('已连签').exists() && !text('签到领京豆').exists()) {
        return true;
    }

    return false;
}

// 任务-浏览3个商品
function taskProduuct3() {
    log('----------', currentAPP.NAME, 'taskProduuct3 start ----------');

    swipes.scrollDown();

    if (text('浏览3个商品').exists()) {
        i = 0;
        className('android.widget.TextView').depth(3).find().forEach((value1, key1) => {
            if (i === 4 ||
                value1.bounds().centerX() <= 0 || value1.bounds().centerY() <= 0 ||
                value1.text().indexOf('¥') === -1) {
                return;
            }

            clicks.element(value1);
            i++;
            others.back();
        });
    }

    if (text('点我领取京豆').exists()) {
        clicks.centerXyByText('点我领取京豆');
    }

    if (text('已领取奖励').exists()) {
        scrollUp();
        sleeps.s3();
        return true;
    }

    return false;
}

// 任务-升级赚京豆
function taskSJZJD() {
    log('----------', currentAPP.NAME, 'taskSJZJD start ----------');

    for (var i = 0; i < 1; i++) {
        isClick = false;
        className('android.view.ViewGroup').depth(2).drawingOrder(9).indexInParent(8).find().forEach((value1, key1) => {
            if (isClick) {
                return;
            }

            clicks.element(value1);
            isClick = true;
        });
        if (!isClick) {
            return false;
        }

        sleeps.s2to3();

        exists.backToElement(text('去完成'));
    }
    sleeps.s5();

    for (var i = 0; i < 50; i++) {
        if (text('去完成').exists() && clicks.centerXyByText('去完成')) {
            sleeps.s2to3();
            others.back();
        }
    }

    return true;
}

// 任务-抽京豆
function taskCJD() {
    log('----------', currentAPP.NAME, 'taskCJD start ----------');

    if (!exists.backToElement(desc('首页'))) {
        return false;
    }

    if (!clicks.textParent('领京豆')) {
        return false;
    }

    isClick = false;
    className('android.view.ViewGroup').depth(2).drawingOrder(10).indexInParent(9).find().forEach((value1, key1) => {
        if (isClick) {
            return;
        }

        clicks.element(value1);
        isClick = true;
    });
    if (!isClick) {
        return false;
    }
    sleeps.s15();

    if (text('今日还可以抽 0 次哦～').exists() || desc('今日还可以抽 0 次哦～').exists()) {
        return true;
    }

    clicks.xy(device.width / 2, device.height / 2);

    if (text('今日还可以抽 0 次哦～').exists() || desc('今日还可以抽 0 次哦～').exists()) {
        return true;
    }

    return false;
}

// 任务-摇京豆
function taskYJD() {
    log('----------', currentAPP.NAME, 'taskYJD start ----------');

    if (!exists.backToElement(desc('首页'))) {
        return false;
    }

    if (!clicks.textParent('领京豆')) {
        return false;
    }

    isClick = false;
    className('android.view.ViewGroup').depth(2).drawingOrder(11).indexInParent(10).find().forEach((value1, key1) => {
        if (isClick) {
            return;
        }

        clicks.element(value1);
        isClick = true;
    });
    if (!isClick) {
        return false;
    }
    sleeps.s15();

    if (text('立即签到 领京豆 ').exists()) {
        clicks.centerXyByText('立即签到 领京豆 ');
    }
    if (desc('立即签到 领京豆').exists()) {
        clicks.centerXyByDesc('立即签到 领京豆');
    }

    if (text('去摇盒子').exists()) {
        clicks.centerXyByText('去摇盒子');
    }

    if (text('再摇一次').exists()) {
        clicks.centerXyByText('再摇一次');
    }
    if (text('摇一摇 有惊喜剩余摇奖1次').exists()) {
        clicks.centerXyByText('摇一摇 有惊喜剩余摇奖1次');
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 10; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME);
        if (!status0) {
            return true;
        }


        status0 = taskCheckin();
        if (status0) {
            status0 = taskProduuct3();
        }
        if (status0) {
            status0 = taskSJZJD();
        }
        if (status0) {
            status0 = taskCJD();
        }
        if (status0) {
            status0 = taskYJD();
        }

        if (status0) {
            return true;
        }

        others.clear();
    }

    others.send(currentAPP.NAME);

    return false;
};

module.exports = currentAPP;
