/**
 * 微视-所有金币任务
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

    others.launchApp('com.tencent.weishi');

    task();
}

// 任务
function task() {
    console.log("---------- task start ----------");

    taskVideo();

    console.log("---------- task end ----------");

    return true;
}

// 任务-小视频
function taskVideo() {
    console.log("---------- task video start ----------");

    for (var i = 0; i < 100000; i++) {
        swipes.down1600();
        sleeps.s5to10();
    }

    swipes.return();

    console.log("---------- task video end ----------");

    return true;
}
