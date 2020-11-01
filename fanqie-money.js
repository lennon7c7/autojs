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

    status = task();

    if (status) {
        others.exit();
    }
}

// 任务
function task() {
    log('---------- task start ----------');

    if (!clicks.centerXyByText('福利')) {
        return false;
    }

    status1 = taskTreasureBox();
    status2 = taskAd();
    // taskBook();

    log('---------- task end ----------');

    return status1 && status2;
}

// 任务-看书
function taskBook() {
    log('---------- taskBook start ----------');

    if (!clicks.centerXyByText('微信')) {
        return false;
    }

    if (!clicks.centerXyByText('书架')) {
        return false;
    }

    clicks.xy(72, 906);

    for (var i = 0; i < 1000; i++) {
        swipes.right2100();
        sleeps.s2to3();
    }

    log('---------- taskBook end ----------');

    return true;
}

// 任务-Ad
function taskAd() {
    log('---------- taskAd start ----------');

    for (var i = 0; i < 3; i++) {
        if (!clicks.text('立即观看')) {
            continue;
        }
  
        closeAd();
    }

    log('---------- taskAd end ----------');

    return true;
}

// 任务-宝箱
// every 1h
function taskTreasureBox() {
    log('---------- taskTreasureBox start ----------');

    if (text('开宝箱得金币').find().size() == 1) {
        return true;
    }

    if (!clicks.text('开宝箱得金币')) {
        return true;
    }

    others.back();

    log('---------- taskTreasureBox end ----------');

    return true;
}

function closeAd() {
    clicks.centerXyById('tt_top_mute');

    sleeps.s35to40();

    clicks.centerXyById('tt_video_ad_close_layout');

    return true;
}
