/**
 * 京东极速版-任务
 * 1. v1.0.0版本已无法使用
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.jd.jdlite';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);
currentAPP.VERSION = '3.0.0';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2021/02/01/2/120_0b3410dfd1b5b561503a600d1683f21a.apk';

// 任务-签到
function taskCheckin() {
    log('----------', currentAPP.NAME, 'taskCheckin start ----------');

    if (!others.backToElement(desc('首页'))) {
        return false;
    }

    if (text('现金签到').exists() && !clicks.centerXyByText('现金签到')) {
        return false;
    } else if (text('签到领现金').exists() && !clicks.centerXyByText('签到领现金')) {
        return false;
    }

    if (text('邀好友解锁额外红包').exists()) {
        others.back();
        if (text('残忍拒绝').exists() && clicks.centerXyByText('残忍拒绝')) {
        } else if (text('残忍离开').exists() && clicks.centerXyByText('残忍离开')) {
        } else if (text('不想开启').exists() && clicks.centerXyByText('不想开启')) {
        }

        return true;
    }

    if (text('立即签到').exists() && !clicks.centerXyByText('立即签到')) {
        return false;
    }

    if (text('邀好友解锁额外红包').exists()) {
        others.back();
        if (text('残忍拒绝').exists() && clicks.centerXyByText('残忍拒绝')) {
        } else if (text('残忍离开').exists() && clicks.centerXyByText('残忍离开')) {
        } else if (text('不想开启').exists() && clicks.centerXyByText('不想开启')) {
        }

        return true;
    }

    return false;
}

// 任务-逛商品赚金币
function taskProduct() {
    log('----------', currentAPP.NAME, 'taskProduct start ----------');

    if (text('残忍拒绝').exists() && clicks.centerXyByText('残忍拒绝')) {
    } else if (text('残忍离开').exists() && clicks.centerXyByText('残忍离开')) {
    } else if (text('不想开启').exists() && clicks.centerXyByText('不想开启')) {
    }

    if (!others.backToElement(desc('我的'))) {
        return false;
    }

    if (exists.parent(text('逛商品赚金币'), text('已完成'))) {
        return true;
    }

    if (!clicks.centerXyByText('逛商品赚金币')) {
        return false;
    }

    for (var i = 0; i < 60; i++) {
        if (text('今日已完成').exists()) {
            return true;
        }

        for (var j = 0; j < 4; j++) {
            swipes.down1600();
            sleeps.s2to4();
        }

        if (!clicks.centerXyById('ll_task_bottom_next')) {
            return false;
        }
    }

    return false;
}

// 任务-逛活动赚金币
function taskRandomPage() {
    log('----------', currentAPP.NAME, 'taskRandomPage start ----------');

    if (!others.backToElement(desc('我的'))) {
        return false;
    }

    if (exists.parent(text('逛活动赚金币'), text('已完成'))) {
        return true;
    }

    if (!clicks.centerXyByText('逛活动赚金币')) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (text('今日已完成').exists()) {
            return true;
        }

        for (var j = 0; j < 4; j++) {
            swipes.down1600();
            sleeps.s2to4();
        }

        if (!clicks.centerXyById('ll_task_bottom_next')) {
            return false;
        }
    }

    return false;
}

// 任务-看视频赚金币
function taskVideo() {
    log('----------', currentAPP.NAME, 'taskVideo start ----------');

    if (!others.backToElement(desc('我的'))) {
        return false;
    }

    if (exists.parent(text('看视频赚金币'), text('已完成'))) {
        return true;
    }

    if (!clicks.centerXyByText('看视频赚金币')) {
        return false;
    }

    clicks.descIfExists('关闭');

    // first video into
    clicks.xy(469, 1373);

    for (var i = 0; i < 100; i++) {
        if (text('今日已完成').exists()) {
            return true;
        } else if (id('vi_btn_close').exists() && !text('分享').exists()) {
            log('---------- shit happen: video ----------');
            return false;
        }

        sleeps.s10();

        if (id('com.jd.jdlite:id/task_float_fengkong_goon').find().size()) {
            clicks.centerXyById('com.jd.jdlite:id/task_float_fengkong_goon');
        }

        swipes.down1600();
    }

    return false;
}

// 任务-活动任务
function taskActivity() {
    log('----------', currentAPP.NAME, 'taskActivity start ----------');

    if (!others.backToElement(desc('赚钱'))) {
        return false;
    }

    swipes.scrollDown();
    swipes.scrollDown();

    var element = id('com.jd.jdlite.lib.mission:id/lib_mission_active_button');
    element.find().forEach((value2, key2) => {
        if (value2.text() === '已完成' || value2.text().indexOf('继续') === 0) {
            return;
        }

        clicks.centerXyByText(value2.text());
        others.back();

        if (text('残忍拒绝').exists() && clicks.centerXyByText('残忍拒绝')) {
        } else if (text('残忍离开').exists() && clicks.centerXyByText('残忍离开')) {
        } else if (text('不想开启').exists() && clicks.centerXyByText('不想开启')) {
        }
    });

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
        status1 = taskProduct();
        status2 = taskRandomPage();
        status3 = taskVideo();
        status4 = taskActivity();

        if (status0 && status1 && status2 && status3 && status4) {
            return true;
        }

        others.clear();
    }

    others.send(currentAPP.NAME);

    return false;
};

module.exports = currentAPP;
