/**
 * 陌陌
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.immomo.young';

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

    clicks.centerXyByText('稍后更新');

    if (!clicks.centerXyById('maintab_layout_profile')) {
        return false;
    }

    if (!clicks.centerXyById('ad_banner_page')) {
        return false;
    }

    if (text('已签').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('立即签到领现金')) {
        return false;
    }
    sleeps.s2to3();

    if (text('已签').exists()) {
        return true;
    }

    return false;
}