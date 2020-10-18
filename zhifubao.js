/**
 * 支付宝
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.eg.android.AlipayGphone';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    clicks.text('Later');
    status1 = task0Lottery();
    status2 = taskEverydayLottery();

    if (status1 && status2) {
        others.exit();
    }
}

/**
 * 任务-天天抽奖
 */
function taskEverydayLottery() {
    toastLog('---------- taskEverydayLottery start ----------');

    for (var i = 0; i < 5; i++) {
        if (!clicks.text('天天抽奖-每日领免费福利')) {
            return false;
        }

        if (clicks.text('0元抽奖')) {
            if (clicks.text('参与抽奖')) {
                others.back2();
            }

            if (clicks.text('去领卡')) {
                others.back2();
                return true;
            }
        }
    }

    toastLog('---------- taskEverydayLottery end ----------');

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

    clicks.text("Yu'E Bao");
    clicks.desc('关闭');
    clicks.desc('立即抽奖');

    for (var i = 0; i < 5; i++) {
        clicks.text('一分惊喜');

        if (clicks.text('0元抽奖')) {
            if (clicks.text('今日抽奖机会已用完')) {
                others.back2();

                return true;
            }

            clicks.text('暂不进店');
        }

        if (clicks.text('0元抽奖')) {
            clicks.text('关注');
            others.back();
        }
    }

    others.back2();

    log('---------- task0Lottery start ----------');

    return false;
}
