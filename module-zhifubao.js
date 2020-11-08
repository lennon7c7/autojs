/**
 * 支付宝-任务
 */
var clicks = require('./function-clicks.js');
var others = require('./function-others.js');
var sleeps = require('./function-sleeps.js');
var swipes = require('./function-swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.eg.android.AlipayGphone';

/**
 * 任务-天天抽奖
 */
function taskEverydayLottery() {
    toastLog('---------- taskEverydayLottery start ----------');

    for (var i = 0; i < 5; i++) {
        if (!clicks.centerXyByText('天天抽奖-每日领免费福利')) {
            return false;
        }

        if (clicks.centerXyByText('0元抽奖')) {
            if (clicks.centerXyByText('参与抽奖')) {
                others.back2();
            }

            if (clicks.centerXyByText('去领卡')) {
                others.back2();
                return true;
            }
        }
    }

    return false;
}

/**
 * 任务-0元抽奖
 */
function task0Lottery() {
    log('---------- task0Lottery start ----------');

    if (!text("Yu'E Bao").exists()) {
        return false;
    }

    clicks.centerXyByText("Yu'E Bao");
    clicks.centerXyByDesc('关闭');
    clicks.centerXyByDesc('立即抽奖');

    for (var i = 0; i < 5; i++) {
        clicks.centerXyByText('一分惊喜');

        if (clicks.centerXyByText('0元抽奖')) {
            if (clicks.centerXyByText('今日抽奖机会已用完')) {
                others.back2();

                return true;
            }

            clicks.centerXyByText('暂不进店');
        }

        if (clicks.centerXyByText('0元抽奖')) {
            clicks.centerXyByText('关注');
            others.back();
        }
    }

    others.back2();

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        clicks.centerXyByText('Later');
        status1 = task0Lottery();
        status2 = taskEverydayLottery();
    
        if (status1 && status2) {
                return true;
        }
    }

    others.send('zhifubao');

    return false;
};

module.exports = s;
