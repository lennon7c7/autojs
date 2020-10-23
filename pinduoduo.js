/**
 * 拼多多-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.xunmeng.pinduoduo';

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

    if (!clicks.centerXyByText('现金签到')) {
        return false;
    }
    sleeps.s2to3();

    if (text('还有现金权益待领取').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('立即签到')) {
        return false;
    }

    return true;
}