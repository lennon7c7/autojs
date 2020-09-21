/**
 * 番茄-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.dragon.read';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    task();
}

// 任务
function task() {
    log('---------- task start ----------');

    clicks.xy(432, 2166);

    taskTreasureBox();
    taskAd();
    taskBook();

    log('---------- task end ----------');

    return true;
}

// 任务-看书
function taskBook() {
    log('---------- task book start ----------');

    var buttonClickTask = className('android.widget.RadioButton').text('书架');
    if (!buttonClickTask.exists()) {
        log('---------- task book nothing ----------');
        return false;
    }
    log('---------- click book ----------');
    clicks.findOne(buttonClickTask);

    clicks.xy(72, 906);

    for (var i = 0; i < 10000; i++) {
        swipes.right2100();
        sleeps.s2to3();
    }

    log('---------- task book end ----------');

    return true;
}

// 任务-Ad
function taskAd() {
    log('---------- task ad start ----------');

    for (var i = 0; i < 10; i++) {
        var buttonClickTask = className('android.view.View').text('看视频赚海量金币');
        if (!buttonClickTask.exists()) {
            log('---------- task ad nothing ----------');
            return false;
        }
        log('---------- click ad ----------');
        clicks.findOne(buttonClickTask);

        var buttonMute = id('tt_top_mute');
        if (!buttonMute.exists()) {
            return false;
        }
        clicks.findOne(buttonMute);

        sleeps.s35to40();

        closeAd();
    }

    log('---------- task ad end ----------');

    return true;
}

// 任务-宝箱
// every 1h
function taskTreasureBox() {
    log('---------- taskTreasureBox start ----------');

    log('---------- 点击 宝箱 ----------');
    clicks.xy(750 + 100, 1860 + 70);

    log('---------- 点击 视频 ----------');
    clicks.xy(247, 1170);

    var buttonMute = id('tt_top_mute');
    if (!buttonMute.exists()) {
        return false;
    }
    clicks.findOne(buttonMute);

    sleeps.s35to40();

    closeAd();

    log('---------- taskTreasureBox end ----------');

    return true;
}

function closeAd() {
    var buttonMute = id('tt_video_ad_close_layout');
    if (!buttonMute.exists()) {
        log('---------- closeAd nothing ----------');
        return false;
    }
    clicks.findOne(buttonMute);

    return true;
}
