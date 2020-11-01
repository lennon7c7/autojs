/**
 * 头条-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.ss.android.article.lite';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    clicks.textIfExists('以后再说');
    status = task();

    if (status) {
        others.exit();
    }
}

// 任务
function task() {
    log('---------- task start ----------');

    taskVideo();

    log('---------- task end ----------');

    return true;
}

// 任务-视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    swipes.right();
    swipes.refresh();

    text('小视频').exists() && text('南宁').exists() && clicks.xy(465, 597);

    for (var i = 0; i < 1200; i++) {
        swipes.right();
        elementParent = className('android.widget.FrameLayout').findOne();
        if (elementParent.find(className('android.widget.RelativeLayout')).size() <= 9) {
            continue;
        } else {
            sleeps.s2to10();
        }
    }

    others.back();

    log('---------- taskVideo end ----------');

    return true;
}
