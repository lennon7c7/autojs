/**
 * 微视-任务
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.tencent.weishi';

// 任务-签到领红包
function taskCheckin() {
    log('---------- taskCheckin start ----------');

    clicks.xy(888, 2200);
    clicks.xy(750, 411);
    sleeps.s2to3();

    if (text('明日再领现金').exists() || text('明日再来领现金').exists()) {
        return true;
    }

    if (clicks.text('签到领红包')) {
        others.back();
        clicks.xy(750, 411);
    }

    if (clicks.text('领取 x1')) {
        others.back();
        clicks.xy(750, 411);
    }

    if (clicks.text('领取 x2')) {
        others.back();
        clicks.xy(750, 411);
    }

    if (clicks.text('领取 x3')) {
        others.back();
        clicks.xy(750, 411);
    }

    if (clicks.text('领取 x4')) {
        others.back();
        clicks.xy(750, 411);
    }

    if (clicks.text('领取 x5')) {
        others.back();
        clicks.xy(750, 411);
    }

    if (clicks.text('领取 x6')) {
        others.back();
        clicks.xy(750, 411);
    }

    if (clicks.text('提现')) {
        if (clicks.text('去提现')) {
            others.back();
        }
        others.back();
    }

    if (text('明日再领现金').exists() || text('明日再来领现金').exists()) {
        return true;
    }

    others.back();
    clicks.xy(10, 2200);

    return false;
}

// 任务-小视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    status = taskCheckin();
    if (status) {
        return true;
    }

    clicks.textIfExists('取消');

    for (var i = 0; i < 200; i++) {
        if (!text('关注').exists() || !text('推荐').exists() || !className('android.widget.ProgressBar').exists()) {
            return false;
        }

        swipes.down1600();
        sleeps.s2to5();
        swipes.refresh1300();
    }

    status = taskCheckin();
    if (status) {
        return true;
    }

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        others.back();
        status = taskVideo();

        if (status) {
            return true;
        }
    }

    others.send('weishi');

    return false;
};

module.exports = s;
