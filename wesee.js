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

    if (text('明日再来领现金').exists()) {
        others.back2();
        clicks.xy(10, 2200);
        return true;
    }

    if (clicks.text('签到领红包')) {
        others.back();
        clicks.xy(750, 411);
    }

    if (text('领取 x1').exists()) {
        clicks.text('领取 x1');
        others.back();
        clicks.xy(750, 411);
    }

    if (text('领取 x2').exists()) {
        clicks.text('领取 x2');
        others.back();
        clicks.xy(750, 411);
    }

    if (text('领取 x3').exists()) {
        clicks.text('领取 x3');
        others.back();
        clicks.xy(750, 411);
    }

    if (text('领取 x6').exists()) {
        clicks.text('领取 x6');
        others.back();
        clicks.xy(750, 411);
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
        sleeps.s5to10();
    }

    status = taskCheckin();
    if (status) {
        return true;
    }

    log('---------- taskVideo end ----------');

    return false;
}