/**
 * 淘宝-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.taobao.taobao';

for (var i = 0; i < 10; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.desc('我的淘宝')) {
        return false;
    }

    if (!clicks.desc('淘金币')) {
        return false;
    }

    sleeps.s5to10();

    if (text('签到领淘金币').exists()) {
        clicks.text('签到领淘金币');
        others.back();
        clicks.desc('淘金币');
    }

    clicks.text('购后返 ');

    for (var i = 0; i < 3; i++) {
        clicks.text('合力');
    }

    status2 = taskHelpFriend();
    status3 = taskShop();
    status1 = taskMoneyPower();

    if (status1 && status2 && status3) {
        others.exit();
    }
}

// 任务-逛店铺
function taskShop() {
    toastLog('---------- taskShop start ----------');

    text('赚金币').exists() && clicks.xy(33, 1404);

    sleeps.s5to10();
    if (desc('已完成').find().size() > 6) {
        others.back();
        return true;
    }

    for (var i = 0; i < 4; i++) {
        if (clicks.desc('逛10秒+10')) {
            sleeps.s15to20();
            clicks.text('关注+10');
            !desc('金币好店').exists() && others.back();
        }
    }

    desc('金币好店').exists() && swipes.down();
    desc('金币好店').exists() && swipes.down();

    for (var i = 0; i < 3; i++) {
        if (clicks.desc('逛10秒+10')) {
            sleeps.s15to20();
            clicks.text('关注+10');
            !desc('金币好店').exists() && others.back();
        }
    }

    desc('金币好店').exists() && swipes.down();
    desc('金币好店').exists() && swipes.down();

    for (var i = 0; i < 3; i++) {
        if (clicks.desc('逛10秒+10')) {
            sleeps.s15to20();
            clicks.text('关注+10');
            !desc('金币好店').exists() && others.back();
        }
    }

    if (desc('已完成').find().size() > 6) {
        others.back();
        return true;
    }

    desc('金币好店').exists() && others.back();

    toastLog('---------- taskShop end ----------');

    return false;
}

// 任务-帮好友
function taskHelpFriend() {
    toastLog('---------- taskHelpFriend start ----------');

    text('赚金币').exists() && clicks.xy(912, 1203);

    sleeps.s5to10();
    for (var i = 0; i < 6; i++) {
        if (clicks.text('去助力')) {
            clicks.xy(393, 567);
            others.back();
        }
    }

    for (var i = 0; i < 6; i++) {
        if (clicks.text('喊Ta回来')) {
            clicks.xy(393, 507);
            clicks.xy(393, 567);
            others.back();
        }
    }

    others.back();

    toastLog('---------- taskHelpFriend end ----------');

    return true;
}

// 任务-金币能量
function taskMoneyPower() {
    toastLog('---------- taskMoneyPower start ----------');

    if (!clicks.text('赚金币')) {
        others.back();
        return false;
    }

    sleeps.s5to10();
    clicks.text('一键领取');

    if (text('每日7点/12点/18点可领').exists()) {
        buttonClick = text('每日7点/12点/18点可领').findOne().parent().parent().findOne(text('去完成'));
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);

            clicks.text('领取奖励');
        }
    }

    if (text('来访就可以拿').exists()) {
        buttonClick = text('来访就可以拿').findOne().parent().parent().findOne(text('去完成'));
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);

            clicks.text('领取奖励');
        }
    }

    if (text('逛菜鸟裹裹领寄件券（0/1）').exists()) {
        buttonClick = text('逛菜鸟裹裹领寄件券（0/1）').findOne().parent().parent().findOne(text('去完成'));
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);
            sleeps.s2to3();

            clicks.text('去领券');
            others.back();
            if (!text('今日任务').exists()) {
                return false;
            }
            clicks.text('领取奖励');
        }
    }

    if (text('每日使用拍立淘立得').exists()) {
        buttonClick = text('每日使用拍立淘立得').findOne().parent().parent().findOne(text('去完成'));
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);

            clicks.id('scan_icon');
            clicks.text('继续上传');
            others.back2();
            if (!text('今日任务').exists()) {
                return false;
            }
            clicks.text('领取奖励');
        }
    }

    if (text('逛农场领免费水果（0/1）').exists()) {
        buttonClick = text('逛农场领免费水果（0/1）').findOne().parent().parent().findOne(text('去施肥'));
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);
            sleeps.s5to10();

            clicks.text('签到领取');
            clicks.xy(765, 1253);
            clicks.text('去施肥，赚更多肥料');
            clicks.xy(560, 1660);
            others.back();
            if (!text('今日任务').exists()) {
                return false;
            }
            clicks.text('领取奖励');
        }
    }

    if (text('淘宝人生逛街领能量（0/1）').exists()) {
        buttonClick = text('淘宝人生逛街领能量（0/1）').findOne().parent().parent().findOne(text('去完成'));
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);
            sleeps.s10to20();

            for (var i = 1; i < 8; i++) {
                clicks.xy(530, 1000 + (i * 100));
            }

            for (var i = 1; i < 8; i++) {
                others.back();
                clicks.xy(530, 1000 + (i * 100));
                if (text('今日任务').exists()) {
                    break;
                }
            }

            if (!text('今日任务').exists()) {
                return false;
            }
            clicks.text('领取奖励');
        }
    }

    if (text('查看淘宝成就月账单（0/1）').exists()) {
        buttonClick = text('查看淘宝成就月账单（0/1）').findOne().parent().parent().findOne(text('去完成'));
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);

            if (text('月度账单').exists()) {
                clicks.text('月度账单');
                others.back();
            }
            others.back();
            if (!text('今日任务').exists()) {
                return false;
            }
            clicks.text('领取奖励');
        }
    }

    if (text('签到领话费充值金（0/1）').exists()) {
        buttonClick = text('签到领话费充值金（0/1）').findOne().parent().parent().findOne(text('去完成'));
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);
            sleeps.s10();
            clicks.text('立即收下');
            others.back();
            if (!text('今日任务').exists()) {
                return false;
            }
            clicks.text('领取奖励');
        }
    }

    if (text('淘宝成就签到（0/1）').exists()) {
        buttonClick = text('淘宝成就签到（0/1）').findOne().parent().parent().findOne(text('去完成'));
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);
            if (clicks.text('成就礼包')) {
                clicks.text('我收下了')
            }
            if (text('成就签到').exists()) {
                buttonClick = text('成就签到').findOne().parent().findOne(className('android.widget.Button'));
                if (buttonClick != null) {
                    clicks.element(buttonClick);
                    clicks.text('我收下了')
                }
            }

            others.back();
            if (!text('今日任务').exists()) {
                return false;
            }
            clicks.text('领取奖励');
        }
    }

    if (text('开启通知权限领能量（0/1）').exists()) {
        buttonClick = text('开启通知权限领能量（0/1）').findOne().parent().parent().findOne(text('去完成'));
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);

            notifications();
            sleeps.s1();
            clicks.text('Manage notifications');
            setText('手机淘宝');
            sleeps.s1();
            clicks.id('notification_package_text');
            className('android.widget.Switch').click();
            sleeps.s1();
            others.back3();

            if (!text('今日任务').exists()) {
                return false;
            }
            clicks.text('领取奖励');

            notifications();
            sleeps.s1();
            clicks.text('Manage notifications');
            setText('手机淘宝');
            sleeps.s1();
            clicks.id('notification_package_text');
            className('android.widget.Switch').click();
            sleeps.s1();
            others.back2();
        }
    }

    for (var i = 0; i < 15; i++) {
        buttonClick = null;
        if (text('边逛边领大额金币').exists()) {
            buttonClick = text('边逛边领大额金币').findOne().parent().parent().findOne(text('去完成'));
        }

        if (buttonClick == null && text('浏览页面立得').exists()) {
            buttonClick = text('浏览页面立得').findOne().parent().parent().findOne(text('去完成'));
        }

        if (buttonClick == null && text('浏览10s立得').exists()) {
            buttonClick = text('浏览10s立得').findOne().parent().parent().findOne(text('去完成'));
        }

        if (buttonClick == null && text('浏览10s 立得').exists()) {
            buttonClick = text('浏览10s 立得').findOne().parent().parent().findOne(text('去完成'));
        }

        if (buttonClick == null && text('浏览10秒立得').exists()) {
            buttonClick = text('浏览10秒立得').findOne().parent().parent().findOne(text('去完成'));
        }

        if (buttonClick == null && text('浏览10秒 立得').exists()) {
            buttonClick = text('浏览10秒 立得').findOne().parent().parent().findOne(text('去完成'));
        }

        if (buttonClick == null && text('逛10s立得').exists()) {
            buttonClick = text('逛10s立得').findOne().parent().parent().findOne(text('去完成'));
        }

        if (buttonClick == null && text('逛10s 立得').exists()) {
            buttonClick = text('逛10s 立得').findOne().parent().parent().findOne(text('去完成'));
        }

        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);

            for (var j = 0; j < 7; j++) {
                if (!id('taolive_frame_video_layout').exists()) {
                    swipes.down();
                }
                sleeps.s2to3();
            }

            others.back();
            if (text('回到淘宝').exists()) {
                clicks.text('回到淘宝');
            }
            if (!text('今日任务').exists()) {
                return false;
            }
            clicks.text('领取奖励');
        }
    }

    if (text('逛省钱消消乐拿红包（0/1）').exists()) {
        buttonClick = text('逛省钱消消乐拿红包（0/1）').findOne().parent().parent().findOne(text('去完成'));
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);
            sleeps.s10();
            clicks.xiaoxiao(102, 1702, 110, 9);
            others.back();
            clicks.xy(700, 1500);
            if (!text('今日任务').exists()) {
                return false;
            }
            clicks.text('领取奖励');
        }
    }

    if (text('浏览15s立得').exists()) {
        buttonClick = text('浏览15s立得').findOne().parent().parent().findOne(text('去领取'));
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick);
            sleeps.s15to20();
            others.back();
            if (!text('今日任务').exists()) {
                return false;
            }
            clicks.text('领取奖励');
        }
    }

    clicks.text('一键领取');

    others.back();

    toastLog('---------- taskMoneyPower end ----------');

    return true;
}
