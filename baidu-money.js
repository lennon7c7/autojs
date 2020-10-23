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

    others.back();
    if (!clicks.centerXyByText('任务') && !clicks.centerXyByText('去签到')) {
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

    for (var i = 0; i < 50; i++) {
        clicks.textIfExists('看视频最高再赚60金币');
        clicks.textIfExists('赚更多金币');
        clicks.textIfExists('看视频奖励翻倍');
        clicks.textIfExists('看视频赚金币');

        if (text('恭喜您已完成今日视频观看任务').exists()) {
            others.back();
            return true;
        }

        sleeps.s15();
        for (var j = 0; j < 10; j++) {
            sleeps.s3();
            if (text('恭喜已得金币').exists() || text('请稍后尝试再次观看').exists()) {
                others.back();
                break;
            }
        }
        others.back();
    }

    log('---------- taskAd end ----------');

    return false;
}
