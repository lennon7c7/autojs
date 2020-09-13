var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

main();

function main() {
    if (!clicks.text("睡觉赚金币")) {
        return false;
    }

    if (clicks.text("我睡醒了")) {
        if (clicks.text("领取1500金币")) {
            swipes.return();
            return true;
        }
    } else if (clicks.text("我要睡了")) {
        swipes.return();
        return true;
    }

    swipes.return();

    return false;

    // if (!clicks.text("去领取")) {
    //     return false;
    // }

    // if (!clicks.text("看广告视频再赚")) {
    //     return false;
    // }

    // clicks.xy(48, 162);
    // swipes.return();

    // clicks.xy(750, 411);
    // if (text('明日再来领现金').exists()) {
    //     return true
    // }
    // swipes.return();
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
