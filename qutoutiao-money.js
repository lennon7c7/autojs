/**
 * 趣头条-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.jifen.qukan';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.text('任务')) {
        return false;
    }

    status1 = taskAd();
    status2 = taskVideo();
    status3 = taskNews();

    if (status1 && status2 && status3) {
        others.exit();
    }
}

// 任务-文章
function taskNews() {
    log('---------- taskNews start ----------');

    if (!clicks.text('立即阅读')) {
        return false;
    }

    text('日常任务').exists() && clicks.xy(24, 120);

    for (var i = 0; i < 10; i++) {
        swipes.refresh600();
        clicks.xy(0, 811);

        for (var j = 0; j < 4; j++) {
            swipes.down();
            sleeps.s2to3();
        }

        others.back();
    }

    others.back();

    log('---------- taskNews end ----------');

    return false;
}

// 任务-视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    if (!clicks.text('观看视频')) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        swipes.refresh600();
        clicks.xy(495, 457);
        sleeps.s10to20();

        clicks.xy(852, 1800);
        if (text('恭喜获得').exists() || text('阅读收益').exists()) {
            others.back();
        }
    }

    others.back();

    log('---------- taskVideo end ----------');

    return false;
}

// 任务-Ad
function taskAd() {
    log('---------- taskAd start ----------');

    for (var i = 0; i < 5; i++) {
        if (text('日常任务').exists() && clicks.text('看视频领金币') && !text('日常任务').exists()) {
            clicks.xy(945, 111);
            sleeps.s60();
            others.back();
            others.back();
            others.back();
        }
    }

    log('---------- taskAd end ----------');

    return false;
}
