/**
 * 百度
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.baidu.searchbox.lite';

for (var i = 0; i < 10; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.text('任务') && !clicks.text('去签到')) {
        return false;
    }

    status1 = taskAd();

    if (status1) {
        others.exit();
    }
}

// 任务-Ad
function taskAd() {
    log('---------- taskAd start ----------');

    for (var i = 0; i < 100; i++) {
        clicks.textIfExists('看视频赚金币');
        clicks.textIfExists('看视频最高再赚60金币');
        clicks.textIfExists('赚更多金币');
        clicks.textIfExists('看视频奖励翻倍');

        if (text('恭喜您已完成今日视频观看任务').exists()) {
            others.back();
            return true;
        }

        sleeps.s35to40();
        others.back();
    }

    log('---------- taskAd end ----------');

    return false;
}
