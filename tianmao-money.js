/**
 * 天猫-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

while (true) {
    main();
}

function main() {
    var status = taskCheckin();

    if (status) {
        exit();
    }
}

function taskCheckin() {
    others.initEnv();

    others.launchApp('com.tmall.wireless');

    if (!clicks.text("我")) {
        return false;
    }

    if (!clicks.text("红包签到")) {
        return false;
    }

    if (text("明日来领翻倍红包").exists()) {
        others.exitApp('com.tmall.wireless');
        return true;
    }

    if (!clicks.text("点击领取今日奖励")) {
        return false;
    }

    others.exitApp('com.tmall.wireless');
}