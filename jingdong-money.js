/**
 * 京东-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

while (true) {
    main();
}

function main() {
    others.initEnv();

    others.launchApp('com.jd.jdlite');

    console.log("---------- button 任务界面 ----------");
    var buttonMenu = className("android.view.View").desc("赚钱");
    if (!buttonMenu.exists()) {
        return false;
    }
    clicks.findOne(buttonMenu);

    // 多出的另外一个是：新手任务-开启通知
    if (text('已完成').find().size() === 4) {
        toast('---------- no shit ----------');
        swipes.exit();
    }

    taskProduct();
    taskRandomPage();
    taskVideo();
}

// 任务-逛商品赚金币
function taskProduct() {
    console.log("---------- task product start ----------");

    console.log("---------- button into ----------");
    clicks.click(807, 1693);

    var buttonMenu = className("android.view.View").desc("赚钱");
    if (buttonMenu.exists()) {
        return false;
    }

    for (var i = 0; i < 70; i++) {
        if (text('今日已完成').exists()) {
            console.log("---------- task product end ----------");
            return true;
        }

        swipes.down1600();
        sleeps.s2to4();

        swipes.down1600();
        sleeps.s2to3();

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
        var buttonMenu = className("android.view.View").desc("赚钱");
        if (buttonMenu.exists()) {
            return false;
        }

        swipes.return();
    }
    console.log("---------- task product end ----------");

    return true;
}

// 任务-逛活动赚金币
function taskRandomPage() {
    console.log("---------- task random start ----------");

    console.log("---------- button into ----------");
    clicks.click(807, 1894);

    var buttonMenu = className("android.view.View").desc("赚钱");
    if (buttonMenu.exists()) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (text('今日已完成').exists()) {
            console.log("---------- task random end ----------");
            return true;
        }

        swipes.down1600();
        sleeps.s2to4();

        swipes.down1600();
        sleeps.s2to3();

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
        var buttonMenu = className("android.view.View").desc("赚钱");
        if (buttonMenu.exists()) {
            return false;
        }

        swipes.return();
    }

    console.log("---------- task random end ----------");

    return true;
}

// 任务-看视频赚金币
function taskVideo() {
    console.log("---------- task video start ----------");

    console.log("---------- button into ----------");
    clicks.click(807, 2095);

    console.log("---------- first video into ----------");
    clicks.click(100, 700);

    var buttonMenu = className("android.view.View").desc("赚钱");
    if (buttonMenu.exists()) {
        return false;
    }

    for (var i = 0; i < 2000; i++) {
        if (text('今日已完成').exists()) {
            console.log("---------- task video end ----------");
            return true;
        }

        sleeps.s10to20();
        swipes.down1600();
    }

    console.log("---------- task video end ----------");

    return true;
}
