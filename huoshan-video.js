/**
 * 火山-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.ss.android.ugc.livelite';

for (var i = 0; i < 10; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    others.back();
    status = taskVideo();

    if (status) {
        others.clear();
        exit();
    }
}

// 任务-小视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    if (!clicks.text('首页')) {
        return false;
    }

    for (var i = 0; i < 7200; i++) {
        swipes.down();
        if (text('15S').exists() || text('14S').exists() || text('13S').exists() || text('12S').exists() || text('11S').exists()
            || text('10S').exists() || text('9S').exists() || text('8S').exists()
        ) {
            sleeps.s15();
            clicks.text('领取')
        } else if (text('剩余2次').exists()) {
            sleeps.s10();
            clicks.text('剩余2次');
        } else if (text('剩余1次').exists()) {
            sleeps.s10();
            clicks.text('剩余1次'); Í
        } else {
            continue;
        }
    }

    others.back();

    log('---------- taskVideo end ----------');

    return true;
}
