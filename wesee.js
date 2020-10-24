/**
 * 微视
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.tencent.weishi';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    others.back();
    status = taskVideo();

    if (status) {
        others.exit();
    }
}

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

    log('---------- taskCheckin end ----------');

    return false;
}

// 任务-小视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    status = taskCheckin();
    if (status) {
        return true;
    }

    for (var i = 0; i < 1200; i++) {
        if (text('取消').exists()) {
            clicks.text('取消');
        }

        swipes.down1600();
        sleeps.s2to10();
    }

    status = taskCheckin();
    if (status) {
        return true;
    }

    log('---------- taskVideo end ----------');

    return false;
}