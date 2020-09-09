/**
 * 考拉海购-任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

main();

function main() {
    taskRandomPage();
}

// 任务-逛商品
function taskRandomPage() {
    console.log("---------- task start ----------");

    others.initEnv();

    others.launchApp('com.kaola');

    var buttonClickTask = text("领考拉豆");
    if (!buttonClickTask.exists()) {
        console.log("---------- click 领考拉豆 nothing ----------");
        return false;
    }
    clicks.text("领考拉豆");

    var buttonClickTask = text("每日赚豆");
    if (!buttonClickTask.exists()) {
        console.log("---------- click 每日赚豆 nothing ----------");
        return false;
    }
    clicks.text("每日赚豆");

    for (var i = 0; i < 12; i++) {
        var buttonClickTask = text("去逛逛");
        if (!buttonClickTask.exists()) {
            console.log("---------- click 去逛逛 nothing ----------");
            return false;
        }
        clicks.text("去逛逛");

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

        swipes.return();
    }

    swipes.exitApp('com.kaola');

    console.log("---------- task end ----------");

    return true;
}
