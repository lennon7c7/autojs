var clicks = require('function/clicks.js');
var others = require('function/others.js');
var sleeps = require('function/sleeps.js');
var swipes = require('function/swipes.js');

main();

function main() {
    // others.initEnv();



    oldDir = files.cwd() + '/';
  
    newDir = oldDir + 'function/';
    filename = ['clicks.js', 'others.js', 'sleeps.js', 'swipes.js'];
    filename.forEach((value, key) => {
        if (!files.exists(oldDir + value)) {
            return false;
        }
    
        status = files.move(oldDir + value, newDir + value);
        if (!status) {
            log('files.move error: ' + value);
        }
    });

    newDir = oldDir + 'module/';
    filename = ['baidu.js', 'douyin.js', 'douyinhuoshan.js', 'fanqie.js', 'huoshan.js', 'kaola.js', 'kuaishou.js', 'mojitianqi.js', 'momo.js', 'pinduoduo.js', 'qqbrowser.js', 'qutoutiao.js', 'tianmao.js', 'taobao.js', 'toutiao.js', 'weishi.js', 'ximalaya.js', 'zhifubao.js', 'zuiqiangdaren.js'];
    filename.forEach((value, key) => {
        if (!files.exists(oldDir + value)) {
            return false;
        }
    
        status = files.move(oldDir + value, newDir + value);
        if (!status) {
            log('files.move error: ' + value);
        }
    });

    

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


function closeAd() {
    clicks.centerXyById('tt_top_mute');

    sleeps.s35to40();

    clicks.centerXyById('tt_video_ad_close_layout');

    return true;
}
