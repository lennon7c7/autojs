/**
 * 陌陌-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.immomo.young';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskCheckin start ----------');

    if (text('稍后更新').exists()) {
        clicks.centerXyByText('稍后更新');
    }

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
 * 任务-提现
 */
function taskCashout() {
    log('----------', currentAPP.PACKAGE_NAME, 'taskCashout start ----------');

    if (!others.backToElement(text('签到领现金'))) {
        return false;
    }

    if (text('签到领现金').exists() && !text('已经连续签到21天').exists()) {
        return true;
    }

    swipes.down();
    if (!clicks.centerXyByText('累计活动收益')) {
        return false;
    }

    if (text('0.0元').exists() && !text('确认提现').exists()) {
        return true;
    }

    if (!clicks.text('确认提现')) {
        return false;
    }

    if (!clicks.text('确定')) {
        return false;
    }

    if (!clicks.text('知道了')) {
        return false;
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 6; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME);
        if (!status0) {
            return true;
        }


        status0 = taskCheckin();
        status1 = taskCashout();

        if (status0 && status1) {
            return true;
        }
    }

    others.send(currentAPP.PACKAGE_NAME);

    return false;
};

module.exports = currentAPP;
