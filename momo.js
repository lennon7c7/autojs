/**
 * 陌陌
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.immomo.young';

while (true) {
    main();
}

function main() {
    var status = taskCheckin();

    if (status) {
        others.exit();
    }
}

/**
 * 任务-签到
 */
function taskCheckin() {
    others.initEnv();

    var status = others.launchApp(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.id('maintab_layout_profile')) {
        return false;
    }

    if (!clicks.id('ad_banner_page')) {
        return false;
    }

    if (text("已签").exists()) {
        return true;
    }

    if (!clicks.text('立即签到领现金')) {
        return false;
    }

    if (text("已签").exists()) {
        return true;
    }

    return false;
}