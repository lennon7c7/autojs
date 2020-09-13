/**
 * 淘宝-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.taobao.taobao';

while (true) {
    main();
}

function main() {
    others.initEnv();

    var status = others.launchApp(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.desc("我的淘宝")) {
        return false;
    }

    if (!clicks.desc("淘金币")) {
        return false;
    }

    sleeps.s2to3();

    status1 = taskMoneyPower();
    status2 = taskHelpFriend();
    status3 = taskShop();

    if (status1 && status2 && status3) {
        others.clear();
        exit();
    }
}

// 任务-逛店铺
function taskShop() {
    toastLog("---------- task start ----------");

    clicks.xy(33, 1404);

    if (desc('已完成').find().size() > 2) {
        others.back();
        return true;
    }

    for (var i = 0; i < 4; i++) {
        if (clicks.desc('逛10秒+10')) {
            clicks.text('关注+10');

            sleeps.s15to20();
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

    swipes.down();
    others.back();

    toastLog("---------- task end ----------");

    return false;
}

// 任务-帮好友
function taskHelpFriend() {
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

    others.back();

    return false;
}

// 任务-金币能量
function taskMoneyPower() {
    if (!clicks.text("赚金币")) {
        others.back();
        return false;
    }

    for (var i = 0; i < 7; i++) {
        if (clicks.text("浏览10s 立得")) {
            swipes.down();
            sleeps.s2to3();
            swipes.down();
            sleeps.s15to20();
            others.back();
            clicks.text("领取奖励");
        }
    }

    if (clicks.text("浏览10秒立得")) {
        swipes.down();
        sleeps.s2to3();
        swipes.down();
        sleeps.s15to20();
        others.back();
        clicks.text("领取奖励");
    }

    if (clicks.text("浏览页面立得")) {
        swipes.down();
        sleeps.s2to3();
        swipes.down();
        sleeps.s15to20();
        others.back();
        clicks.text("领取奖励");
    }

    others.back();

    return false;
}
