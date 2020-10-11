/**
 * 火山-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.ss.android.ugc.livelite';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    taskTreasureBox();
    // taskAd20();
    taskVideo();
}

// 任务-小视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    if (!clicks.text('首页')) {
        return false;
    }

    for (var i = 0; i < 500; i++) {
        swipes.down();
        if (text('13S').exists()) {
            sleeps.s15();
            clicks.text('领取')
        } else {
            sleeps.s2to3();
        }
    }

    others.back();

    log('---------- taskVideo end ----------');

    return true;
}

// 任务-20次广告
function taskAd20() {
    log('---------- taskAd20 start ----------');

    for (var i = 0; i < 20; i++) {
        var buttonAd = className('android.view.View').text('领100金币');
        if (buttonAd.exists()) {
            buttonAd.click();
            sleeps.s35to40();
            closeAd();
        } else if (className('android.view.View').text('去赚钱').exists()) {
            className('android.view.View').text('去赚钱').click();
            sleeps.s35to40();
            closeAd();
        }
    }

    log('---------- taskAd20 end ----------');

    return true;
}

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    log('---------- taskTreasureBox start ----------');

    if (!clicks.text('红包')) {
        return false;
    }

    clicks.text('开宝箱得金币');
    if (clicks.text('看视频 金币翻8倍')) {
        sleeps.s35to40();
        closeAd();
    }
    clicks.text('javascript:;')

    log('---------- taskTreasureBox end ----------');

    return true;
}

// 关闭广告
function closeAd() {
    clicks.text('关闭广告');
    clicks.id('sp');

    return true;
}
