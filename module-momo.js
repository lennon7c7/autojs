/**
 * 陌陌-任务
 */
var clicks = require('./function-clicks.js');
var others = require('./function-others.js');
var sleeps = require('./function-sleeps.js');
var swipes = require('./function-swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.immomo.young';

/**
 * 任务-签到
 */
function taskCheckin() {
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

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        status = taskCheckin();

        if (status) {
            return true;
        }
    }

    others.send('momo');

    return false;
};

module.exports = s;
