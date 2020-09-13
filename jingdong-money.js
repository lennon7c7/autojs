/**
 * 京东-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.jd.jdlite';

while (true) {
    main();
}

function main() {
    others.initEnv();

    var status = others.launchApp(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.desc('赚钱')) {
        return true;
    }

    // 多出的另外一个是：新手任务-开启通知
    if (text('已完成').find().size() === 4) {
        exit();
    }

    status1 = taskProduct();
    status2 = taskRandomPage();
    status3 = taskVideo();
    // status4 = taskCheckin();

    if (status1 && status2 && status3) {
        others.exitApp(PACKAGE_NAME);
        exit();
    }
}

// 任务-签到
function taskCheckin() {
    console.log("---------- taskCheckin start ----------");

    swipes.down();
    swipes.down();
    swipes.down();

    if (!clicks.text('去签到')) {
        return false;
    }

    if (!clicks.text('立即签到')) {
        return false;
    }

    if (text('邀好友解锁额外红包').exists()) {
        swipes.return();
        return true;
    }

    if (text('残忍拒绝').exists()) {
        swipes.return();
        return true;
    }

    swipes.return();
    clicks.text('残忍拒绝');

    console.log("---------- taskCheckin end ----------");

    return false;
}

// 任务-逛商品赚金币
function taskProduct() {
    console.log("---------- taskProduct start ----------");

    console.log("---------- button into ----------");
    clicks.xy(807, 1693);

    if (desc('赚钱').exists()) {
        return true;
    }

    for (var i = 0; i < 50; i++) {
        if (text('今日已完成').exists()) {
            return true;
        }

        swipes.down1600();
        sleeps.s2to4();

        swipes.down1600();
        sleeps.s2to4();

        swipes.down1600();
        sleeps.s2to5();

        if (id("ll_task_bottom_next").exists()) {
            id("ll_task_bottom_next").click();
            sleeps.s2to3();
        } else {
            swipes.return();
        }
    }

    for (var i = 0; i < 5; i++) {
        if (desc('赚钱').exists()) {
            return false;
        }

        swipes.return();
    }
    console.log("---------- taskProduct end ----------");

    return true;
}

// 任务-逛活动赚金币
function taskRandomPage() {
    console.log("---------- taskRandomPage start ----------");

    console.log("---------- button into ----------");
    clicks.xy(807, 1894);

    if (desc('赚钱').exists()) {
        return true;
    }

    for (var i = 0; i < 20; i++) {
        if (text('今日已完成').exists()) {
            return true;
        }

        swipes.down1600();
        sleeps.s2to4();

        swipes.down1600();
        sleeps.s2to4();

        swipes.down1600();
        sleeps.s2to5();

        if (id("ll_task_bottom_next").exists()) {
            id("ll_task_bottom_next").click();
            sleeps.s2to3();
        } else {
            swipes.return();
        }
    }

    for (var i = 0; i < 5; i++) {
        if (desc('赚钱').exists()) {
            return false;
        }

        swipes.return();
    }

    console.log("---------- taskRandomPage end ----------");

    return true;
}

// 任务-看视频赚金币
function taskVideo() {
    console.log("---------- taskVideo start ----------");

    console.log("---------- button into ----------");
    clicks.xy(807, 2095);
 
    if (!id('task_float_base_fl').exists()) {
        toastLog('---------- shit happen: taskVideo ----------');
        return false;
    }

    console.log("---------- first video into ----------");
    clicks.xy(469, 1373);

    // none sure is in first or not
    if (desc('赚钱').exists()) {
        return false;
    }

    for (var i = 0; i < 1200; i++) {
        if (text('今日已完成').exists()) {
            return true;
        }

        if (!id('progressbar2').exists() && !text('金币大宝箱').exists()) {
            toastLog('---------- shit happen: taskVideo ----------');
            return false;
        }

        sleeps.s10to20();
        swipes.down1600();
        sleeps.s2to3();
  }

    console.log("---------- taskVideo end ----------");

    return true;
}
