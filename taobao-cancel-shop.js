/**
 * 淘宝-取消关注店铺
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.taobao.live';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    // status = others.launch(PACKAGE_NAME);
    // if (!status) {
    //     return false;
    // }

    // if (!clicks.desc('我的淘宝')) {
    //     return false;
    // }

    // if (!clicks.desc('关注店铺')) {
    //     return false;
    // }

    status1 = taskCancelShop();

    if (status1) {
        others.exit();
    }
}

// 任务-取消关注店铺
function taskCancelShop() {
    log('---------- taskCancelShop start ----------');

    for (var i = 0; i < 100; i++) {
        desc('个关注店铺的宝贝上新').exists() && click(986, 565);
        sleep(500);
        desc('个关注店铺的宝贝上新').exists() && click(986, 565);
        sleeps.s2to3();
    }

    log('---------- taskCancelShop end ----------');

    return true;
}
