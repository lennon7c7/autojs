/**
 * 天猫
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.tmall.wireless';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = taskCheckin();

    if (status) {
        others.exit();
    }
}

/**
 * 任务-签到
 */
function taskCheckin() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.text('我')) {
        return false;
    }

    if (!clicks.text('红包签到')) {
        return false;
    }

    if (text('明日来领翻倍红包').exists() || text('记得明天再来哦').exists()) {
        return true;
    }

    if (!clicks.text('点击领取今日奖励')) {
        return false;
    }

    if (text('开心收下，明天继续领').exists()) {
        return true;
    }

    return false;
}
