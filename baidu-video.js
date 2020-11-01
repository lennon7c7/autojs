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

    status1 = taskVideo();

    if (status1) {
        others.exit();
    }
}

// 任务-小视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    others.back();
    if (!clicks.centerXyByText('好看视频')) {
        return false;
    }

    for (var i = 0; i < 10000; i++) {
        swipes.refresh600();
        clicks.xy(477, 577);
        sleeps.s30to35();
    }

    log('---------- taskVideo end ----------');

    return true;
}
