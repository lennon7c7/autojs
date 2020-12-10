/**
 * 微视-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.tencent.weishi';

// 任务-签到领红包
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    clicks.xy(888, 2200);

    if (text('微信登录').exists()) {
        clicks.centerXyByText('微信登录');

        if (text('Confirm Login').exists()) {
            clicks.centerXyByText('Confirm Login');
        }
    }

    clicks.xy(750, 411);
    sleeps.s2to3();

    if (text('明日再领现金').exists() || text('明日再来领现金').exists()) {
        return true;
    }

    if (clicks.textIfExists('签到领红包')) {
        others.back();
        clicks.xy(750, 411);
    }

    if (textStartsWith('领取 ').exists()) {
        clicks.element(textStartsWith('领取 '));
        others.back();
        clicks.xy(750, 411);
    }

    if (clicks.textIfExists('提现')) {
        if (clicks.textIfExists('去提现')) {
            others.back();
        }
        others.back();
    }

    if (text('明日再领现金').exists() || text('明日再来领现金').exists()) {
        return true;
    }

    // 红包
    scrollDown();
    scrollDown();
    scrollDown();
    clicks.element(text('查看').find()[3]);
    clicks.centerXyByText('前往腾讯新闻领取');
    sleeps.s3();
    others.back3();
    back();
    back();
    sleeps.s3();
    others.back();

    clicks.element(text('查看').find()[4]);
    others.back();

    others.back();
    clicks.xy(10, 2200);

    return false;
}

// 任务-小视频
function taskVideo() {
    log('----------', s.PACKAGE_NAME, 'taskVideo start ----------');

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
