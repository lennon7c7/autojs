var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

main();

function main() {

    // clicks.id('close_volume');




    // clicks.text('签到');
    // clicks.text('领取奖励');
    // for (var i = 0; i < 40; i++) {
    //     if (!clicks.text('去浏览')) {
    //         sleeps.s3();
    //         continue;
    //     }

    //     sleeps.s20();

    //     others.back();
    // }
    // clicks.text('领取奖励');
    // clicks.text('领取奖励');



   
}

/**
 * 关闭广告
 * @param {int} x 
 * @param {int} y 
 */
function closeAd(x, y) {
    clicks.xy(x, y);

    sleeps.s60to70();

    others.back();
    if (!clicks.centerXyById('tt_video_ad_close_layout')) {
        toastLog('---------- click fail: closeAd ----------');
        return false;
    }

    return true;
}
