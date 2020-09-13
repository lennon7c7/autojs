var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

main();

function main() {
    // kuaishou
    setInterval(function () {
        if (!clicks.text("开宝箱得金币")) {
            return true;
        }

        clicks.xy(480, 1620);
    }, 1000 * 60 * 20);

    // clicks.xy(48, 162);
    // others.back();

    // clicks.xy(750, 411);
    // if (text('明日再来领现金').exists()) {
    //     return true
    // }
    // others.back();
    // clicks.xy(10, 2200);

    // clicks.xy(777, 111);
    // toastLog(id('task_float_base_fl').exists());
    // toastLog(id('vl_type_video_text_title').exists());
    // toastLog(id('vl_type_video_panel_author_text').exists());
    // toastLog(id('vl_type_video_panel_fond_text').exists());
    // toastLog(text('开宝箱得金币').exists());
    // toastLog(clicks.id("redFloat"));
    // toastLog(clicks.text('取消'));

    // id('video_audio_btn').click();
    // clicks.id('video_audio_btn');
    // var buttonClickTask = className("android.view.View").text("看视频赚海量金币");
    // if (!buttonClickTask.exists()) {
    //     console.log("---------- task ad nothing ----------");
    //     return false;
    // }
    // console.log("---------- click ad ----------");
    // clicks.findOne(buttonClickTask)
}
