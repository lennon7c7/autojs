/**
 * 头条极速版-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.ss.android.article.lite';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (text('明日签到').exists()) {
        return true;
    }

    if (textStartsWith('立即签到').exists()) {
        clicks.element(textStartsWith('立即签到'));
    }

    if (text('看视频再领').exists()) {
        clicks.centerXyByText('看视频再领');
        closeAd();
    }

    if (text('明日签到').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-今日搜索任务
 */
function taskSearch() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!text('今日搜索任务').exists()) {
        return false;
    }

    if (!clicks.parents(text('今日搜索任务'), text('去搜索'))) {
        return false;
    }

    myKeyword = className('android.widget.EditText').findOne().text();
    for (var i = 0; i < 3; i++) {
        clicks.centerXyByDesc('清除');
        setText(myKeyword.split(',')[i]);
        clicks.centerXyByText('搜索');
    }
    others.back2();

    return true;
}

/**
 * 任务-淘宝
 */
function taskTaobao() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!text('去淘宝抽购物红包').exists()) {
        return false;
    }

    if (!clicks.parents(text('去淘宝抽购物红包'), text('去抽奖'))) {
        return false;
    }

    others.back();

    return true;
}

// 任务-抽奖
function taskLottery() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!clicks.centerXyByText('去抽奖') || !text('集齐碎片得手机').exists()) {
        return false;
    }

    if (text('今日次数已用完').exists()) {
        others.back();
        return true;
    }

    for (var i = 1; i <= 3; i++) {
        if (clicks.text('今日剩' + i + '次')) {
            others.back();
        }
    }

    if (text('今日次数已用完').exists()) {
        others.back();
        return true;
    }

    others.back();

    return false;
}

// 任务-睡觉赚钱
function taskSleep() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!clicks.text('睡觉赚钱')) {
        return false;
    }

    if (clicks.textIfExists('我要睡了')) {
    } else if (clicks.textIfExists('我睡醒了') || (!text('我要睡了').exists() && !text('我睡醒了').exists())) {
        clicks.xy(429, 984);
    }

    others.back();

    return true;
}

// 任务-小说
function taskNovel() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    var buttonClickTask = className('android.widget.Button').text('看小说');
    if (!buttonClickTask.exists()) {
        return false;
    }
    log('----------', currentAPP.NAME, 'click novel ----------');
    buttonClickTask.findOne().parent().click();
    sleeps.s3();

    log('----------', currentAPP.NAME, 'click last novel ----------');
    clicks.xy(264, 687);

    for (var i = 0; i < 50; i++) {
        swipes.right200();
        sleeps.s2to3();

        // 随机出现奖励金币，但是无法定位，只能先关闭
        // click(477, 1637);

        var buttonAd = id('ant');
        if (buttonAd.exists()) {
            log('this is ad, next');
            swipes.right200();
        }
    }

    others.back();

    return true;
}

// 任务-宝箱
// every 10m
function taskTreasureBox() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!text('任务中心').exists()) {
        return false;
    }

    clicks.xy(750 + 100, 1860 + 70);

    if (text('Close').exists()) {
        clicks.xy(750 + 100, 1860 + 70);
        return false;
    }

    if (!clicks.text('看完视频再领')) {
        return false;
    }

    closeAd();

    return true;
}

function closeAd() {
    sleeps.s35to40();

    clicks.element(className('android.widget.LinearLayout'));

    return true;
}


// 任务-新闻
function taskNews() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    others.back();

    if (text('继续阅读').exists() || !clicks.textIfExists('去阅读')) {
        return true;
    }

    for (var i = 0; i < 10; i++) {
        if (!text('首页').exists() || !text('我的').exists()) {
            log('---------- error ----------');
            return false;
        }

        if (!clicks.centerXyByText('首页')) {
            return false;
        }

        clicks.xy(145, 888);

        for (var j = 0; j < 8; j++) {
            swipes.down();
            sleeps.s2to3();
        }
        others.back();
    }

    return true;
}

// 任务-视频
function taskVideo() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    swipes.right();
    swipes.right();
    swipes.right();

    for (var i = 0; i < 10; i++) {
        swipes.refresh();
        clicks.xy(477, 577);
        sleeps.s20();

        for (var j = 0; j < 60; j++) {
            clicks.textIfExists('关闭广告');

            if (text('分享到').exists() && text('重播').exists()) {
                swipes.refresh();
                break;
            }

            sleeps.s10();
        }
    }

    return true;
}

// 任务-小视频
function taskLittleVideo() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    swipes.right();
    swipes.refresh();

    text('小视频').exists() && text('南宁').exists() && clicks.xy(465, 597);

    for (var i = 0; i < 10; i++) {
        swipes.right();
        elementParent = className('android.widget.FrameLayout').findOne();
        if (elementParent.find(className('android.widget.RelativeLayout')).size() <= 9) {

        } else {
            sleeps.s2to10();
        }
    }

    others.back();

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 3; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME);
        if (!status0) {
            return true;
        }


        clicks.textIfExists('以后再说');
        if (!clicks.centerXyByText('任务') || !text('任务中心').exists()) {
            return false;
        }

        if (text('看视频再领').exists()) {
            clicks.text('看完视频再领');
            closeAd();
        }

        status0 = taskCheckin();
        // status2 = taskLottery();
        taskSleep();
        taskTreasureBox();
        taskTaobao();
        taskSearch();
        // taskNovel();
        taskNews();

        if (status0) {
            return true;
        }
    }

    others.send(currentAPP.NAME);

    return false;
};

/**
 * 定时入口调用
 * @returns {boolean}
 */
currentAPP.cron = function () {
    status0 = others.launch(currentAPP.PACKAGE_NAME);
    if (!status0) {
        return true;
    }


    clicks.textIfExists('以后再说');
    if (!clicks.centerXyByText('任务') || !text('任务中心').exists()) {
        return false;
    }

    taskTreasureBox();
};

module.exports = currentAPP;
