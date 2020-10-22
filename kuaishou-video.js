/**
 * 快手-所有金币任务
 * 当前存在问题
 * 1. 无法判断是否成功通过验证码（就随便滑动，瞎蒙呗）
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.kuaishou.nebula';

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

// 任务-视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    others.back();

    for (var i = 0; i < 1200; i++) {
        if (text('Drag the slider').exists()) {
            swipe(87, 969, 700, 969, 700);
            sleeps.s2to3();
            others.back();
        }

        swipes.down1600();
        if (className('android.widget.FrameLayout').find().size() < 4) {
            continue;
        } else {
            sleeps.s2to10();
        }
    }

    log('---------- taskVideo end ----------');

    return true;
}
