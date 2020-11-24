/**
 * 天猫-任务
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.tmall.wireless';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('---------- taskCheckin start ----------');

    if (!clicks.centerXyByText('我')) {
        return false;
    }

    if (!clicks.centerXyByText('红包签到')) {
        return false;
    }

    if (text('明日来领翻倍红包').exists() || text('记得明天再来哦').exists() || text('明日再来').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('点击领取今日奖励')) {
        return false;
    }

    if (text('开心收下，明天继续领').exists()) {
        return true;
    }

    if (text('明日来领翻倍红包').exists() || text('记得明天再来哦').exists() || text('明日再来').exists()) {
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

    others.send('tianmao');

    return false;
};

module.exports = s;
