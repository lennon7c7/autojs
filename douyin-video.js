/**
 * 抖音-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.ss.android.ugc.aweme.lite';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    status = taskVideo();

    if (status) {
        others.exit();
    }
}

// 任务-小视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    others.back2();

    for (var i = 0; i < 1200; i++) {
        swipes.down();
        sleeps.s2to10();
    }

    log('---------- taskVideo end ----------');

    return true;
}
