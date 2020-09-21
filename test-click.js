var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

main();

function main() {
    toastLog(currentPackage());
  

    // clicks.xy(750, 411);
    // if (text('明日再来领现金').exists()) {
    //     return true
    // }
    // others.back();
    // clicks.xy(10, 2200);

    // clicks.xy(777, 111);
    // toastLog(text('已完成').find().size());
    // toastLog(text('去完成').find().size());
    // toastLog(id('vl_type_video_text_title').exists());
    // toastLog(id('vl_type_video_panel_author_text').exists());
    // toastLog(id('vl_type_video_panel_fond_text').exists());
    // toastLog(text('开宝箱得金币').exists());
    // toastLog(clicks.id('redFloat'));
    // toastLog(clicks.text('取消'));

    // id('video_audio_btn').click();
    // clicks.id('video_audio_btn');
    // var buttonClickTask = className('android.view.View').text('看视频赚海量金币');
    // if (!buttonClickTask.exists()) {
    //     log('---------- task ad nothing ----------');
    //     return false;
    // }
    // log('---------- click ad ----------');
    // clicks.findOne(buttonClickTask)
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
