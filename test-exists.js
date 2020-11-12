var clicks = require('function/clicks.js');
var others = require('function/others.js');
var sleeps = require('function/sleeps.js');
var swipes = require('function/swipes.js');

main();

function main() {
    log(text('trigger').exists());
    // log(text('0').exists());
    // log(id('yueshijina').text('0').exists());




    // clicks.text('招财猫');

    // clicks.text('领猫粮');
    // clicks.text('选我');
    // others.back();
    // clicks.text('招财猫');

    // clicks.text('喂养');
    // clicks.text('喂养100克猫粮');

    // clicks.text('赚现金');
    // clicks.text('摸一摸');
    // sleeps.s2to3();
    // clicks.text('收下礼物');



    // log(className('android.widget.FrameLayout').find().size() == 1 && className('android.view.View').find().size() == 1
    // && className('android.widget.ImageView').find().size() == 1);


    // log(className('android.widget.FrameLayout').exists());
    // log(className('android.widget.FrameLayout').find().size());
    // log(className('android.view.View').find().size());

    // log(className('android.widget.ImageView').exists());

    // log(id('ad_btn_layout').exists());
    // log(text('查看详情').exists());
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
    if (!clicks.id('tt_video_ad_close_layout')) {
        toastLog('---------- click fail: closeAd ----------');
        return false;
    }

    return true;
}
