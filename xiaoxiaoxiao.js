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

for (var i = 0; i < 1000000; i++) {
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

    if (className('android.widget.ImageView').exists()) {
        toastLog('重新开始');
        clicks.xy(550, 1200);
        back();
    }

    for (var g = 0; g < 10; g++) {
        for (var h = 0; h < 10; h++) {
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
                        sleep(4000);
                        clicks.xy(540, 1040);
                        clicks.xy(520, 1320);
                    } else if (isPageAdBottom()) {
                        log('isPageAdBottom');
                        sleep(4000);
                        clicks.xy(540, 1040);
                    } else if (isPageAdFull()) {
                        log('isPageAdFull');
                        sleeps.s60to70();
                        clicks.id('tt_video_ad_close_layout');
                    } else if (id('tt_insert_dislike_icon_img').exists()) {
                        log('tt_insert_dislike_icon_img');
                        clicks.id('tt_insert_dislike_icon_img');
                    } else if (isPageGaming()) {
                        // log('isPageGaming');
                        click(x + xAdd * j, y - yAdd * i);
                        sleep(5);
                    } else {
                        log('else');
                    }
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
    if (id('tt_video_progress').exists() && className('android.view.View').find().size() > 20) {
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
