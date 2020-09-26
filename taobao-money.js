/**
 * 淘宝-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.taobao.taobao';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.desc('我的淘宝')) {
        return false;
    }

    if (!clicks.desc('淘金币')) {
        return false;
    }

    sleeps.s5to10();

    if (text('签到领淘金币').exists()) {
        clicks.text('签到领淘金币');
        others.back();
    }

    for (var i = 0; i < 3; i++) {
        clicks.text('合力');
    }

    status1 = taskMoneyPower();
    // status1 = true;
    status2 = taskHelpFriend();
    status3 = taskShop();

    if (status1 && status2 && status3) {
        others.exit();
    }
}

// 任务-逛店铺
function taskShop() {
    toastLog('---------- taskShop start ----------');

    clicks.xy(33, 1404);

    if (desc('已完成').find().size() > 2) {
        others.back();
        return true;
    }

    for (var i = 0; i < 4; i++) {
        if (clicks.desc('逛10秒+10')) {
            sleeps.s15to20();
            clicks.text('关注+10');
            others.back();
        }
    }

    swipes.down();
    swipes.down();

    for (var i = 0; i < 3; i++) {
        if (clicks.desc('逛10秒+10')) {
            clicks.text('关注+10');

            sleeps.s15to20();
            others.back();
        }
    }

    if (desc('已完成').find().size() > 2) {
        others.back();
        return true;
    }

    others.back();

    toastLog('---------- taskShop end ----------');

    return false;
}

// 任务-帮好友
function taskHelpFriend() {
    toastLog('---------- taskHelpFriend start ----------');

    clicks.xy(912, 1203);

    if (!text('去助力').exists() && text('去拜访').exists()) {
        others.back();
        return true;
    }

    for (var i = 0; i < 6; i++) {
        if (!clicks.text('去助力')) {
            return false;
        }

        clicks.xy(393, 567);
        others.back();
    }

    for (var i = 0; i < 6; i++) {
        if (!clicks.text('喊Ta回来')) {
            return false;
        }

        clicks.text('喊Ta回来得');

        others.back();
    }

    if (!text('去助力').exists() && text('去拜访').exists()) {
        others.back();
        return true;
    }

    others.back();

    toastLog('---------- taskHelpFriend end ----------');

    return false;
}

// 任务-金币能量
function taskMoneyPower() {
    toastLog('---------- taskMoneyPower start ----------');

    if (!clicks.text('赚金币')) {
        others.back();
        return false;
    }

    if (text('已完成').find().size() > 2 && text('去完成').find().size() < 6) {
        others.back();
        return true;
    }

    clicks.text('一键领取');

    if (text('今日任务').exists() && clicks.text('浏览10秒立得') && !text('今日任务').exists()) {
        if (!id('taolive_frame_video_layout').exists()) {
            swipes.down();
        }

        sleeps.s2to3();
        if (!id('taolive_frame_video_layout').exists()) {
            swipes.down();
        }

        sleeps.s15to20();
        others.back();
        clicks.text('领取奖励');
    }

    if (text('今日任务').exists() && clicks.text('逛10s立得') && !text('今日任务').exists()) {
        if (!id('taolive_frame_video_layout').exists()) {
            swipes.down();
        }

        sleeps.s2to3();
        if (!id('taolive_frame_video_layout').exists()) {
            swipes.down();
        }

        sleeps.s15to20();
        others.back();
        clicks.text('领取奖励');
    }

    if (text('今日任务').exists() && clicks.text('浏览页面立得') && !text('今日任务').exists()) {
        if (!id('taolive_frame_video_layout').exists()) {
            swipes.down();
        }

        sleeps.s2to3();
        if (!id('taolive_frame_video_layout').exists()) {
            swipes.down();
        }

        sleeps.s15to20();
        others.back();
        clicks.text('领取奖励');
    }

    for (var i = 0; i < 7; i++) {
        if (text('今日任务').exists() && clicks.text('浏览10s 立得') && !text('今日任务').exists()) {
            if (!id('taolive_frame_video_layout').exists()) {
                swipes.down();
            }

            sleeps.s2to3();
            if (!id('taolive_frame_video_layout').exists()) {
                swipes.down();
            }

            sleeps.s15to20();
            others.back();
            clicks.text('领取奖励');
        }
    }
    clicks.text('一键领取');

    if (text('已完成').find().size() > 2 && text('去完成').find().size() < 6) {
        others.back();
        return true;
    }

    others.back();

    toastLog('---------- taskMoneyPower end ----------');

    return false;
}
