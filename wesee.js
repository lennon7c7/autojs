/**
 * 微视
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.tencent.weishi';

while (true) {
    main();
}

function main() {
    others.initEnv();

    status = others.launchApp(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    status = taskVideo();

    if (status) {
        others.exit();
    }
}

// 任务-小视频
function taskVideo() {
    console.log("---------- taskVideo start ----------");

    clicks.xy(10, 2200);

    for (var i = 0; i < 2; i++) {
        if (text('取消').exists()) {
            clicks.text('取消');
        }

        swipes.down1600();
        sleeps.s5to10();
    }

    clicks.xy(888, 2200);
    clicks.xy(750, 411);
    sleeps.s2to3();
  
    if (text('明日再来领现金').exists()) {
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
    
    if (clicks.text('领取 x6')) {
        others.back();
        clicks.xy(750, 411);
    }
   
    if (text('明日再来领现金').exists()) {
        return true;
    }
   
    others.back();
    clicks.xy(10, 2200);

    others.back();

    console.log("---------- taskVideo end ----------");

    return false;
}