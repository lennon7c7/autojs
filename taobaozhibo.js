/**
 * 淘宝直播
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.taobao.live';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    // status = others.launch(PACKAGE_NAME);
    // if (!status) {
    //     return false;
    // }

    status1 = taskVideo();

    if (status1) {
        others.exit();
    }
}

// 任务-视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    for (var i = 0; i < 50; i++) {
        swipes.down900();
        sleeps.s2to3();
    }

    log('---------- taskVideo end ----------');

    return true;
}
