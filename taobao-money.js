/**
 * 淘宝-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

main();

function main() {
    others.initEnv();

    others.launchApp('com.taobao.taobao');

    var buttonClickTask = className("android.widget.FrameLayout").desc("我的淘宝");
    if (!buttonClickTask.exists()) {
        console.log("---------- task nothing ----------");
        return false;
    }
    clicks.findOne(buttonClickTask);

    var buttonClickTask = className("android.widget.FrameLayout").desc("淘金币");
    if (!buttonClickTask.exists()) {
        console.log("---------- task nothing ----------");
        return false;
    }
    clicks.findOne(buttonClickTask);
    sleeps.s2to3();

    taskMoneyPower();
    taskHelpFriend();
    taskShop();
}

// 任务-逛店铺
function taskShop() {
    var buttonClickTask = className("android.view.View").desc("逛10秒+10");
    if (!buttonClickTask.exists()) {
        console.log("---------- task nothing ----------");
        return false;
    }
    clicks.findOne(buttonClickTask);

    clicks.xy(781, 391);
    sleeps.s15to20();
    swipes.return();

    clicks.xy(781, 924);
    sleeps.s15to20();
    swipes.return();

    clicks.xy(781, 1457);
    sleeps.s15to20();
    swipes.return();

    clicks.xy(781, 1990);
    sleeps.s15to20();
    swipes.return();

    swipes.down();
    swipes.down();

    clicks.xy(781, 924);
    sleeps.s15to20();
    swipes.return();

    clicks.xy(781, 1457);
    sleeps.s15to20();
    swipes.return();

    clicks.xy(781, 1990);
    sleeps.s15to20();
    swipes.return();

    swipes.down();

    swipes.return();

}

// 任务-帮好友
function taskHelpFriend() {
    clicks.xy(912, 1203);

    for (var i = 0; i < 6; i++) {
        var buttonClickTask = text("去助力");
        if (!buttonClickTask.exists()) {
            console.log("---------- task nothing ----------");
            return false;
        }
        clicks.findOne(buttonClickTask);
        sleeps.s2to3();
        clicks.xy(393, 567);
        swipes.return();
    }

    swipes.return();
}

// 任务-金币能量
function taskMoneyPower() {
    console.log("---------- task start ----------");

    var buttonClickTask = text("赚金币");
    if (!buttonClickTask.exists()) {
        console.log("---------- task nothing ----------");
        return false;
    }
    clicks.findOne(buttonClickTask);

    var buttonClickTask = text("领取奖励");
    if (buttonClickTask.exists()) {
        clicks.findOne(buttonClickTask);
    }

    for (var i = 0; i < 7; i++) {
        var buttonClickTask = text("浏览10s 立得");
        if (!buttonClickTask.exists()) {
            console.log("---------- task nothing ----------");
            return false;
        }
        clicks.findOne(buttonClickTask);
        swipes.down();
        sleeps.s2to3();
        swipes.down();
        sleeps.s15to20();
        swipes.return();
        var buttonClickTask = text("领取奖励");
        if (!buttonClickTask.exists()) {
            console.log("---------- task nothing ----------");
            return false;
        }
        clicks.findOne(buttonClickTask);
    }

    // var buttonClickTask = text("浏览10秒立得");
    // if (!buttonClickTask.exists()) {
    //     console.log("---------- task nothing ----------");
    //     return false;
    // }
    // clicks.findOne(buttonClickTask);
    // swipes.down();
    // sleeps.s2to3();
    // swipes.down();
    // sleeps.s15to20();
    // swipes.return();
    // var buttonClickTask = text("领取奖励");
    // if (!buttonClickTask.exists()) {
    //     console.log("---------- task nothing ----------");
    //     return false;
    // }
    // clicks.findOne(buttonClickTask);

    // var buttonClickTask = text("浏览页面立得");
    // if (!buttonClickTask.exists()) {
    //     console.log("---------- task nothing ----------");
    //     return false;
    // }
    // clicks.findOne(buttonClickTask);
    // swipes.down();
    // sleeps.s2to3();
    // swipes.down();
    // sleeps.s15to20();
    // swipes.return();
    // swipes.return();
    // var buttonClickTask = text("领取奖励");
    // if (!buttonClickTask.exists()) {
    //     console.log("---------- task nothing ----------");
    //     return false;
    // }
    // clicks.findOne(buttonClickTask);

    swipes.return();

    console.log("---------- task end ----------");

    return true;
}
