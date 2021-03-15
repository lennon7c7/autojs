/**
 * 中青看点-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'cn.youth.news';
s.VERSION = '2.4.6';
s.APK = 'https://android-apps.pp.cn/fs08/2020/09/04/3/120_f074497d052d75bf003c1f10f13e24c5.apk';

// 任务-限时
// every 20m
function taskLimit() {
    log('----------', s.PACKAGE_NAME, 'taskLimit start ----------');

    clicks.textIfExists('我知道了');
    sleeps.s10();

    others.back();

    text('我的').exists() && clicks.xy(850, 150);
    others.back();
    text('我的').exists() && clicks.xy(850, 150);
    others.back();
    if (!text('我的').exists()) {
        others.closeAdBackToElement(text('我的'));
    }

    return true;
}

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (textStartsWith('明日签到').exists()) {
        return true;
    }

    clicks.textIfExists('签到领现金');

    if (clicks.textIfExists('青豆翻倍')) {
        others.closeAdBackToElement(text('任务'));
    }

    if (textStartsWith('看视频再赚').exists() && clicks.element(textStartsWith('看视频再赚'))) {
        others.closeAdBackToElement(text('任务'));
    }

    if (textStartsWith('看视频翻').exists()) {
        clicks.element(textStartsWith('看视频翻'));
    }

    if (textStartsWith('明日签到').exists()) {
        return true;
    }

    return false;
}

// 任务-看新闻
function taskNews() {
    log('----------', s.PACKAGE_NAME, 'taskNews start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (text('领奖励').exists()) {
        clicks.centerXyByText('领奖励');
    }

    if (text('幸运奖励').exists()) {
        clicks.centerXyByText('幸运奖励');
        others.back();
    }

    if (clicks.textIfExists('青豆翻倍')) {
        others.closeAdBackToElement(text('任务'));
    }

    if (text('每日任务').exists() && !text('去阅读').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('去阅读')) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (!others.backToElement(text('刷新'))) {
            return false;
        }

        clicks.xy(608, 608);

        for (var j = 0; j < 5; j++) {
            sleeps.s2to3();
            swipes.down1000_100();
            sleeps.s2to3();
            swipes.refresh400_100();
        }
    }

    return true;
}

// 任务-观看视频
function taskVideo() {
    log('----------', s.PACKAGE_NAME, 'taskVideo start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (text('领奖励').exists()) {
        clicks.centerXyByText('领奖励');
    }

    if (text('每日任务').exists() && !text('去观看').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('去观看')) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (!others.backToElement(text('刷新'))) {
            return false;
        }

        clicks.xy(477, 577);

        if (text('转发朋友圈').exists() && !text('刷新').exists()) {
            return false;
        }

        sleeps.s30();
    }

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (text('领奖励').exists()) {
        clicks.centerXyByText('领奖励');
    }

    return true;
}

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, 'taskAd start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (text('领奖励').exists()) {
        clicks.centerXyByText('领奖励');
    }

    for (var i = 0; i < 5; i++) {
        if (text('看福利视频 (5 /5)').exists()) {
            break;
        }

        if (text('每日任务').exists() && !textStartsWith('看福利视频').exists()) {
            break;
        }

        if (clicks.parents(textStartsWith('看福利视频'), text('去完成'))) {
            others.closeAdBackToElement(text('每日任务'));
        }
    }

    if (text('领奖励').exists()) {
        clicks.centerXyByText('领奖励');
    }

    return true;
}

// 任务-火爆转发
function taskShare() {
    log('----------', s.PACKAGE_NAME, 'taskShare start ----------');

    if (!clicks.backToElement(text('我的'))) {
        return false;
    }

    if (!clicks.rectByText('火爆转发')) {
        return false;
    }
    sleeps.s2to3();

    if (!clicks.rectByText('转发赚钱')) {
        return false;
    }

    if (!clicks.rectByText('share-4327')) {
        return false;
    }

    if (!clicks.rectByText('Share')) {
        return false;
    }

    if (!clicks.rectByText('Stay in WeChat')) {
        return false;
    }

    if (text('share-4327').exists() && !clicks.rectByText('share-4327')) {
        return false;
    } else {
        // 因为无法查询元素，所以用土办法
        !text('中青看点').exists() && clicks.xy(500, 250) && !text('中青看点').exists() && others.back();
        !text('中青看点').exists() && clicks.xy(500, 500) && !text('中青看点').exists() && others.back();
        !text('中青看点').exists() && clicks.xy(500, 750) && !text('中青看点').exists() && others.back();
        !text('中青看点').exists() && clicks.xy(500, 900) && !text('中青看点').exists() && others.back();
        !text('中青看点').exists() && clicks.xy(500, 1050) && !text('中青看点').exists() && others.back();
    }

    if (!clicks.rectByLastText('中青看点')) {
        return false;
    }

    clicks.textIfExists('点击查看全文');

    swipes.down();

    app.launch(s.PACKAGE_NAME);
    sleep(10 * 1000);

    return true
}

// 任务-抽奖
function taskLottery() {
    log('----------', s.PACKAGE_NAME, 'taskLottery start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (!clicks.centerXyByText('抽奖赚')) {
        return false;
    }
    others.back();

    if (!clicks.centerXyByText('抽奖赚')) {
        return false;
    }

    for (var i = 0; i < 110; i++) {
        if (text('0').exists()) {
            return true
        }

        clicks.centerXyByText('抽奖赚');

        click(318, 822);
        back();
    }

    return false;
}

// 任务-抽奖ad
function taskLotteryAd() {
    log('----------', s.PACKAGE_NAME, 'taskLotteryAd start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (!clicks.centerXyByText('抽奖赚')) {
        return false;
    }

    if (!text('0').exists()) {
        return false
    }

    if (clicks.xy(220, 1850) && !text('天天抽奖').exists()) {
        others.closeAdBackToElement(text('天天抽奖'));
    }
    if (exists.elementWidthHeight(className('android.widget.ImageView'), 135, 150)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 135, 150);
    }

    if (clicks.xy(440, 1850) && !text('天天抽奖').exists()) {
        others.closeAdBackToElement(text('天天抽奖'));
    }
    if (exists.elementWidthHeight(className('android.widget.ImageView'), 135, 150)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 135, 150);
    }

    if (clicks.xy(660, 1850) && !text('天天抽奖').exists()) {
        others.closeAdBackToElement(text('天天抽奖'));
    }
    if (exists.elementWidthHeight(className('android.widget.ImageView'), 135, 150)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 135, 150);
    }

    if (clicks.xy(880, 1850) && !text('天天抽奖').exists()) {
        others.closeAdBackToElement(text('天天抽奖'));
    }
    if (exists.elementWidthHeight(className('android.widget.ImageView'), 135, 150)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 135, 150);
    }

    return true;
}

// 任务-看看赚
function taskKankanzhuang() {
    log('----------', s.PACKAGE_NAME, 'taskKankanzhuang start ----------');

    app.launch(s.PACKAGE_NAME);
    sleep(10 * 1000);

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (!clicks.centerXyByText('看看赚')) {
        return false;
    }
    sleeps.s3();

    for (var i = 0; i < 72; i++) {
        if (!text('去完成').exists() && !text('进行中').exists()) {
            break;
        }

        text('去完成').exists() && clicks.centerXyByText('去完成');
        text('进行中').exists() && clicks.centerXyByText('进行中');
        sleeps.s3();

        if (text('看看赚').exists()) {
            break;
        }

        if (id('pop_close').exists()) {
            clicks.id('pop_close');
        } else if (text('closebtn').exists()) {
            clicks.centerXyByText('closebtn');
        } else if (exists.elementWidthHeight(className('android.view.View'), 90, 90)) {
            clicks.elementWidthHeight(className('android.view.View'), 90, 90);
        } else if (exists.elementWidthHeight(className('android.view.View'), 120, 120)) {
            clicks.elementWidthHeight(className('android.view.View'), 120, 120);
        }

        randomClick = random();
        if (randomClick > 0.7) {
            clicks.xy(100, 350);
        } else if (randomClick > 0.3) {
            clicks.xy(100, 850);
        } else {
            clicks.xy(100, 1250);
        }

        if (!others.backToPackageName(s.PACKAGE_NAME)) {
            return false;
        }

        sleeps.s3();
        if (id('pop_close').exists()) {
            clicks.id('pop_close');
        } else if (text('closebtn').exists()) {
            clicks.centerXyByText('closebtn');
        } else if (exists.elementWidthHeight(className('android.view.View'), 90, 90)) {
            clicks.elementWidthHeight(className('android.view.View'), 90, 90);
        } else if (exists.elementWidthHeight(className('android.view.View'), 120, 120)) {
            clicks.elementWidthHeight(className('android.view.View'), 120, 120);
        }

        clicks.textIfExists('展开全文');
        clicks.textIfExists('点击阅读全文');
        swipes.down();
        clicks.textIfExists('加载更多');
        sleeps.s10();
        !text('看看赚').exists() && others.back();
        !text('看看赚').exists() && others.back();
        !text('看看赚').exists() && others.back();
        !text('看看赚').exists() && others.back();
    }

    others.back3();

    if (!clicks.centerXyByText('看看赚')) {
        return false;
    }

    for (var i = 0; i < 3; i++) {
        if (!text('点击领取').exists()) {
            break;
        }

        clicks.text('点击领取');
        if (!text('看看赚').exists()) {
            others.closeAdBackToElement(text('看看赚'));
        }
    }

    if (text('领奖励').exists()) {
        clicks.centerXyByText('领奖励');
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', s.PACKAGE_NAME, 'taskCashout start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (!clicks.centerXyByText('去提现')) {
        return false;
    }

    if (!clicks.centerXyByText('0.1元天天提')) {
        return false;
    }

    if (!clicks.centerXyByText('立即提现')) {
        return false;
    }

    if (text('提现成功').exists() || text('我知道了').exists() || text('马上去赚钱').exists()) {
        return true;
    }

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 24; i++) {
        others.launch(s.PACKAGE_NAME);

        status4 = taskLimit();
        status0 = taskCheckin();
        taskNews();
        taskVideo();
        status1 = taskAd();
        status2 = taskLottery();
        if (status2) {
            taskLotteryAd();
        }
        status2 = taskShare();
        taskKankanzhuang();
        status3 = taskCashout();

        if (status0 && status1 && status2 && status3 && status4) {
            return true;
        }
    }

    others.send(s.PACKAGE_NAME);

    return false;
};

/**
 * 定时入口调用
 */
s.cron = function () {
    others.launch(s.PACKAGE_NAME);

    taskLimit();
};

module.exports = s;
