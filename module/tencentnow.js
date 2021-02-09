/**
 * 腾讯NOW直播-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.tencent.now';
s.VERSION = '1.56.0.42';
s.APK = 'https://android-apps.pp.cn/fs08/2020/11/23/0/120_d596d531e1400aead0ff3d2179fb76fb.apk';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    others.back3();

    clicks.textIfExists('我知道了');

    if (!clicks.centerXyByText('首页')) {
        return false;
    }

    if (!clicks.centerXyByText('热门')) {
        return false;
    }
    if (!clicks.elementWidthHeight(className('android.widget.FrameLayout'), 219, 273)) {
        return false;
    }

    if (textEndsWith('已签到').exists()) {
        return true;
    }

    if (!clicks.textIfExists('签到领取红包')) {
        return false;
    } else if (!clicks.textIfExists('签到') || !clicks.textIfExists('签到领取红包')) {
        return false;
    }

    if (textEndsWith('已签到').exists()) {
        return true;
    }

    return false;
}

/**
 * 随机答题抢红包
 */
s.redPackage = function () {
    log('----------', s.PACKAGE_NAME, 'redPackage start ----------');

    others.back3();

    for (var i = 0; i < 600; i++) {
        if (clicks.elementWidthHeight(className('android.widget.FrameLayout'), 219, 273)) {
            swipes.scrollDown();
        }

        if (!clicks.centerXyByText('去领取')) {
            others.back();
            continue;
        }

        sleeps.s3();
        textStartsWith('NOW ID:').exists() && clicks.xy(30, 471);
        sleeps.s3();

        if (!clicks.element(textStartsWith('发答案领红包'))) {
            others.back();
            continue;
        }

        wordArray = ['hi', '美女', 'no', '加油', '不知道', '可能', '好', '恩', '真爱', '路过', '打酱油',
            '中国欧阳兄弟', '中国第一名', '中国第一', '中国红包', '哈哈', '嘿嘿', '我爱中国', '中国加油',
            ':-D', ':-*', '╭（╯_╰）╭', '(=^_^=)', '<※', '*\(^_^)/*', 'b（￣▽￣）d', '>3<',
            '主播加油', '主播最棒', '主播威武', '主播厉害', '主播好酷', '主播好美'];
        setText(wordArray[random(0, wordArray.length - 1)]);
        sleeps.s2to3();
        clicks.text('发送');

        textStartsWith('NOW ID:').exists() && clicks.xy(30, 471);

        if (!text('已参与，等待抢红包').exists()) {
            others.back2();
            continue;
        }

        for (var j = 0; j < 3000; j++) {
            sleep(100);
            if (!text('活动主页>').exists()) {
                text('最高').exists() && clicks.xy(769, 1466);
                text('最高').exists() && clicks.xy(769, 1466);

                others.back2();
                break;
            }

            if (text('首页').exists()) {
                break;
            }
        }

        others.back();
        clicks.textIfExists('直接退出');
    }
};

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        status0 = taskCheckin();

        if (status0) {
            return true;
        }
    }

    others.send(s.PACKAGE_NAME);

    return false;
};

module.exports = s;
