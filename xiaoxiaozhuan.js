/**
 * 考拉消消赚
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'feka.games.koala.cancellation.pop.star.puzzle.android';

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
    // status = others.launch(PACKAGE_NAME);
    // if (!status) {
    //     return false;
    // }

    // toastLog('第x关 开始');
    // clicks.xy(530, 1730);

    // others.back();

    while (true) {
        var x = 150,
            xAdd = 100;
        var y = 1700,
            yAdd = 100;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (false) {

                    // } else if (id('ad_root').exists()) {
                    //     log('isPageAdBottom');
                    //     sleep(4000);
                    //     clicks.xy(540, 1240);
                    // } else if (id('backBtn').exists()) {
                    //     clicks.id('backBtn');
                } else if (currentPackage() != PACKAGE_NAME) {
                    app.launch(PACKAGE_NAME);
                    sleeps.s5to10();
                } else if (id('closeBtn').exists()) {
                    clicks.id('closeBtn');
                } else if (className('android.widget.LinearLayout').exists() || text('广告').exists() || text('下载').exists() || text('关闭').exists()) {
                    log('isPageAdFull');
                    clicks.xy(520, 1120);
                    sleeps.s60to70();
                    clicks.id('tt_video_ad_close_layout');
                    clicks.xy(186, 195);
                    clicks.xy(924, 162);
                    others.back();
                    // back
                    clicks.xy(60, 160);
                    clicks.xy(60, 160);
                } else {
                    click(x + xAdd * j, y - yAdd * i);
                    sleep(5);
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
