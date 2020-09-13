/**
 * 考拉海购-任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.kaola';

while (true) {
    main();
}

function main() {
    var status = taskRandomPage();

    if (status) {
        exit();
    }
}

// 任务-逛商品
function taskRandomPage() {
    others.initEnv();

    var status = others.launchApp(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.text("领考拉豆")) {
        return false;
    }

    if (!clicks.text("每日赚豆")) {
        return false;
    }

    if (!text('去逛逛').exists() && text('已完成').exists()) {
        others.clear();
        return true;
    }

    for (var i = 0; i < 12; i++) {
        if (!clicks.text("去逛逛")) {
            return false;
        }

        if (text("进店浏览15秒得考拉豆").exists()) {
            for (var j = 0; j < 10; j++) {
                if (!clicks.text("进店领豆")) {
                    return false;
                }

                swipes.down();
                sleeps.s2to3();
                swipes.down();
                sleeps.s2to3();
                swipes.down();
                sleeps.s2to3();
                swipes.down();
                sleeps.s2to3();
                swipes.down();
                sleeps.s2to3();
                swipes.down();
                sleeps.s2to3();
                swipes.down();
                sleeps.s2to3();
                swipes.down();
                sleeps.s2to3();

                others.back();
            }

            others.back();
            continue;
        }

        swipes.down();
        sleeps.s2to3();
        swipes.down();
        sleeps.s2to3();
        swipes.down();
        sleeps.s2to3();
        swipes.down();
        sleeps.s2to3();
        swipes.down();
        sleeps.s2to3();
        swipes.down();
        sleeps.s2to3();
        swipes.down();
        sleeps.s2to3();
        swipes.down();
        sleeps.s2to3();

        others.back();
    }

    var status = others.clear();
    if (!status) {
        return false;
    }

    return true;
}
