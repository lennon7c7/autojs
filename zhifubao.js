/**
 * 支付宝
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.eg.android.AlipayGphone';

while (true) {
    main();
}

function main() {
    others.initEnv();

    status = others.launchApp(PACKAGE_NAME);
    if (!status) {
        return false;
    }

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
    for (var i = 0; i < 4; i++) {
        if (!clicks.text('天天抽奖-每日领免费福利')) {
            return false;
        }

        if (clicks.text("0元抽奖")) {
            if (clicks.text("参与抽奖")) {
                others.back2();
            }

            if (clicks.text("去领卡")) {
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
    console.log("---------- task0Lottery start ----------");

    clicks.xy(676, 795);

    for (var i = 0; i < 4; i++) {
        clicks.xy(405, 2025);

        if (clicks.text("0元抽奖")) {
            if (clicks.text("今日抽奖机会已用完")) {
                others.back2();

                return true;
            }

            clicks.text("暂不进店")
        }

        if (clicks.text("0元抽奖")) {
            clicks.text("关注")
            others.back();
        }
    }

    others.back2();

    console.log("---------- task0Lottery start ----------");

    return false;
}
