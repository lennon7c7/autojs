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

    log('---------- click 任务界面 ----------');
    clicks.xy(621, 2201);

    taskTreasureBox();
    // taskAd20();
    taskVideo();
}

// 任务-小视频
function taskVideo() {
    log('---------- task video start ----------');

    log('---------- index page ----------');
    clicks.xy(87, 2205);

    for (var i = 0; i < 50; i++) {
        swipes.down();
        sleeps.s5to10();
    }

    others.back();

    log('---------- task video end ----------');

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

    var buttonBox = className('android.view.View').text('开宝箱得金币');
    if (!buttonBox.exists()) {
        log('---------- click 宝箱 nothing ----------');
        return false;
    }
    log('---------- click 宝箱 ----------');
    buttonBox.findOne().click();
    sleeps.s1();

    var buttonAd = className('android.view.View').text('看视频 金币翻8倍');
    if (!buttonAd.exists()) {
        log('---------- click ad nothing ----------');
        return false;
    }
    log('---------- click ad ----------');
    buttonAd.findOne().click();
    sleeps.s35to40();

    closeAd();

    log('---------- taskTreasureBox end ----------');

    return true;
}

// 关闭广告
function closeAd() {
    var buttonCloseAd = className('android.widget.TextView').text('关闭广告');
    if (!buttonCloseAd.exists()) {
        log('---------- click ad nothing ----------');
        return false;
    }
    log('---------- click ad ----------');
    buttonCloseAd.click();
    sleeps.s3();

    var buttonCloseAdConfirm = id('sp');
    if (!buttonCloseAdConfirm.exists()) {
        log('---------- close ad confirm nothing ----------');
        return false;
    }
    log('---------- click ad confirm ----------');
    buttonCloseAdConfirm.click();
    sleeps.s3();

    return true;
}
