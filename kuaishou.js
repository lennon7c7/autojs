/**
 * 快手-所有金币任务
 * 当前存在问题
 * 1. 无法判断是否成功通过验证码（就随便滑动，瞎蒙呗）
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.kuaishou.nebula';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    others.back2();
    if (!clicks.centerXyById('redFloat')) {
        return false;
    }

    status0 = taskCheckin();
    status1 = taskTreasureBox();
    status2 = taskAd10();
    // status3 = task0Lottery();

    if (status1 && status2) {
        others.exit();
    }
}

/**
 * 任务-签到
 */
function taskCheckin() {
    log('---------- taskCheckin start ----------');

    if (text('去查看').exists()) {
        return true;
    }

    if (!clicks.text('去签到') || !clicks.text('立即签到')) {
        return false;
    }

    clicks.xy(93, 387);

    if (text('去查看').exists()) {
        return true;
    }

    log('---------- taskCheckin end ----------');

    return false;
}

// 任务-0元抽奖
function task0Lottery() {
    log('---------- task0Lottery start ----------');

    others.back3();

    if (!clicks.centerXyById('left_btn')) {
        return false;
    }

    if (!clicks.centerXyByText('More')) {
        return false;
    }

    if (!clicks.centerXyByText('Kwai Shop')) {
        return false;
    }

    if (!clicks.centerXyByText('0元抽奖')) {
        return false;
    }

    if (text('提高中奖率').find().size() == 3) {
        swipes.down();
        clicks.xy(396, 1386);
    }

    if (text('提高中奖率').find().size() == 10) {
        return true;
    }

    // switch (text('提高中奖率').find().size()) {
    //     case 3:
    //         clicks.centerXyByText('免费抽')
    //         swipes.down();
    //         swipes.down();     
    //         break;
    //     default:
    //         break;
    // }

    for (var i = 0; i < 10; i++) {
        if (!clicks.centerXyByText('免费抽')) {
            continue;
        }

        if (!clicks.centerXyByText('分享活动 立即参与')) {
            others.back();
            continue;
        }

        clicks.xy(207, 1293);
        app.launch('com.kuaishou.nebula');
        sleeps.s2to3();
        others.back();
    }

    others.back();

    log('---------- task0Lottery end ----------');

    return false;
}

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    log('---------- taskTreasureBox start ----------');

    if (!clicks.centerXyByText('开宝箱得金币')) {
        return true;
    }

    clicks.xy(480, 1620);

    log('---------- taskTreasureBox end ----------');

    return true;
}

// 任务-10次广告
function taskAd10() {
    log('---------- taskAd10 start ----------');

    if (text('明日再来').exists()) {
        return true;
    }

    for (var i = 0; i < 3; i++) {
        if (clicks.element(className('android.widget.Button').text('福利'))) {
        } else if (clicks.element(className('android.widget.Button').text('福利 领金币'))) {
        } else {
            continue;
        }

        clicks.centerXyById('video_audio_btn');
        sleeps.s35to40();
        clicks.centerXyById('video_countdown');
        clicks.centerXyById('video_close_icon');
    }

    log('---------- taskAd10 end ----------');

    return true;
}
