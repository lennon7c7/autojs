/**
 * 百度-任务
 */
var clicks = require('./function-clicks.js');
var others = require('./function-others.js');
var sleeps = require('./function-sleeps.js');
var swipes = require('./function-swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.baidu.searchbox.lite';

// 任务-Ad
function taskAd() {
    log('---------- taskAd start ----------');

    others.back();

    if (!clicks.centerXyByText('任务') && !clicks.centerXyByText('去签到')) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        clicks.textIfExists('看视频最高再赚60金币');
        clicks.textIfExists('赚更多金币');
        clicks.textIfExists('看视频奖励翻倍');
        clicks.textIfExists('看视频赚金币');

        if (text('恭喜您已完成今日视频观看任务').exists()) {
            others.back();
            return true;
        }

        sleeps.s15();
        for (var j = 0; j < 10; j++) {
            sleeps.s3();
            if (text('恭喜已得金币').exists() || text('请稍后尝试再次观看').exists()) {
                others.back();
                break;
            }
        }

        others.back();
    }

    return false;
}

// 任务-观看视频
function taskVideo() {
    log('---------- taskVideo start ----------');

    others.back();

    if (!clicks.centerXyByText('任务') && !clicks.centerXyByText('去签到')) {
        return false;
    }

    if (text('观看视频').findOne().parent().parent().findOne(text('已完成'))) {
        return true;
    }

    if (!clicks.text('观看视频')) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (!text('推荐').exists() || !text('小视频').exists()) {
            log('---------- error ----------');
            return false;
        }

        if (!clicks.centerXyByText('好看视频')) {
            return false;
        }

        clicks.xy(477, 577);
        sleeps.s30to35();
    }

    if (!clicks.centerXyByText('任务')) {
        return false;
    }

    if (text('观看视频').findOne().parent().parent().findOne(text('已完成'))) {
        return true;
    }

    return false;
}

// 任务-看新闻
function taskNews() {
    log('---------- taskNews start ----------');

    others.back();

    if (!clicks.centerXyByText('任务') && !clicks.centerXyByText('去签到')) {
        return false;
    }

    if (text('阅读资讯').findOne().parent().parent().findOne(text('已完成'))) {
        return true;
    }

    if (!clicks.text('阅读资讯')) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (!text('百度').exists() || !text('任务').exists() || !text('我的').exists()) {
            log('---------- error ----------');
            return false;
        }

        if (!clicks.centerXyByText('百度')) {
            return false;
        }

        clicks.xy(345, 1048);

        sleeps.s8();
        swipes.down();
        sleeps.s10();
        swipes.refresh();
        sleeps.s10();

        others.back();
    }

    if (!clicks.centerXyByText('任务')) {
        return false;
    }

    if (text('阅读资讯').findOne().parent().parent().findOne(text('已完成'))) {
        return true;
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        status0 = taskAd();
        status1 = taskVideo();
        status2 = taskNews();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send('baidu');

    return false;
};

module.exports = s;
