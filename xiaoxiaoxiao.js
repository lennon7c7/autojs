/**
 * 爱上消消消
 * 当前存在问题
 * 1. 某些点击失效
 * 2. 无法判断是否处于广告状态
 * 3. 无法判断是否处于游戏完成
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'love.match.set';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status1 = taskClick();
    if (status1) {
        others.exit();
    }
}
// 任务-点击
function taskClick() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    toastLog('重新开始');
    clicks.xy(550, 1200);

    others.back();

    while (true) {
        var x = 100,
            xAdd = 100;
        var y = 1900,
            yAdd = 100;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 10; j++) {
                if (currentPackage() != PACKAGE_NAME) {
                    app.launch(PACKAGE_NAME);
                    sleeps.s2to3();
                } else if (isPageRewardDouble()) {
                    log('isPageRewardDouble');
                    clicks.xy(540, 1040);
                    clicks.xy(520, 1320);
                    others.back();
                } else if (isPageAdBottom()) {
                    log('isPageAdBottom');
                    clicks.xy(540, 1040);
                    others.back();
                } else if (isPageAdFull()) {
                    log('isPageAdFull');
                    clicks.xy(186, 195);
                    sleeps.s60to70();
                    clicks.centerXyById('tt_video_ad_close_layout');
                    clicks.xy(924, 162);
                    others.back();
                } else if (id('tt_insert_dislike_icon_img').exists()) {
                    log('tt_insert_dislike_icon_img');
                    clicks.centerXyById('tt_insert_dislike_icon_img');
                    others.back();
                } else if (isPageGaming()) {
                    // log('isPageGaming');
                    click(x + xAdd * j, y - yAdd * i);
                    sleep(5);
                } else {
                    log('else');
                    others.back();
                }
            }
        }
    }

    return false;
}

function isPageGaming() {
    if (currentPackage() == PACKAGE_NAME && className('android.widget.ImageView').exists() && className('android.view.View').exists()) {
        return true;
    }

    return false;
}

function isPageAdBottom() {
    if (className('android.widget.LinearLayout').exists() && id('textView').exists()) {
        return true;
    }

    return false;
}

function isPageAdFull() {
    if (className('android.view.View').find().size() > 20) {
        return true;
    }

    return false;
}

function isPageRewardDouble() {
    if (className('android.widget.FrameLayout').find().size() == 1 && className('android.view.View').find().size() == 1
        && className('android.widget.ImageView').find().size() == 0) {
        return true;
    }

    return false;
}
