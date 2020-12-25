/**
 * 考拉海购-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.kaola';

// 任务-考拉乐园
function taskPlayground() {
    log('----------', s.PACKAGE_NAME, 'taskPlayground start ----------');

    others.back3();
    if (!clicks.centerXyByText('考拉乐园')) {
        return false;
    }
    sleeps.s2to3();

    clicks.textIfExists('知道了');

    for (var i = 0; i < 10; i++) {
        clicks.textIfExists('浏览任务');
        clicks.textIfExists('签到任务');
        clicks.textIfExists('逛商品任务');
        clicks.textIfExists('考拉升级');
    }

    if (!clicks.text('领金币')) {
        return false;
    }

    if (text('再逛逛').exists() && !text('去逛逛').exists()) {
        return true;
    }

    element = textStartsWith('去华为应用市场写评论（0/1）');
    if (element.exists()) {
        clicks.text(element.findOne().text());
        clicks.text('去评论');
        others.back();
    }

    for (var i = 0; i < 40; i++) {
        if (!clicks.textIfExists('去逛逛')) {
            continue;
        }

        if (text('点击查看以下商品开宝箱').exists()) {
            if (clicks.textIfExists('打开看看~') || clicks.textIfExists('打开看看～')) {
            } else if (clicks.text('立即购买')) {
                others.back();
                if (!text('点击查看以下商品开宝箱').exists()) {
                    others.back();
                }
                if (!text('点击查看以下商品开宝箱').exists()) {
                    others.back();
                }
                if (!text('点击查看以下商品开宝箱').exists()) {
                    others.back();
                }
            }
        } else {
            for (var k = 0; k < 8; k++) {
                swipes.down();
                sleeps.s2to3();
            }
        }

        others.back();
    }

    if (text('再逛逛').exists() && !text('去逛逛').exists()) {
        return true;
    }

    return false;
}

// 任务-领考拉豆
function taskRandomPage() {
    log('----------', s.PACKAGE_NAME, 'taskRandomPage start ----------');

    others.back3();
    if (!clicks.centerXyByText('领考拉豆')) {
        return false;
    }
    sleeps.s2to3();

    clicks.textIfExists('下单购物');
    clicks.textIfExists('关注店铺');
    clicks.textIfExists('浏览商品');
    clicks.textIfExists('今日签到');

    text('10豆免费抽').exists() && clicks.xy(930, 1030);

    if (text('已完成').exists() && !text('去逛逛').exists()) {
        return true;
    }

    for (var i = 0; i < 40; i++) {
        if (!clicks.textIfExists('去逛逛')) {
            continue;
        }

        if (text('进店浏览15秒得考拉豆').exists()) {
            for (var j = 0; j < 20; j++) {
                if (!clicks.text('进店领豆')) {
                    return false;
                }

                for (var k = 0; k < 8; k++) {
                    swipes.down();
                    sleeps.s2to3();
                }

                others.back();
            }
        } else if (clicks.textIfExists('去看看')) {
            for (var j = 0; j < 6; j++) {
                others.back();

                if (text('去看看').exists()) {
                    break;
                }
            }

            clicks.textIfExists('快打开看看吧~');
            others.back();
        } else {
            for (var j = 0; j < 8; j++) {
                swipes.down();
                sleeps.s2to3();
            }
        }

        others.back();
        clicks.textIfExists('下次再说');
    }

    if (text('去关注').exists()) {
        clicks.text('去关注');
        sleeps.s2to3();
        clicks.text('关注');
        clicks.text('已关注');
        others.back();
    }

    if (text('已完成').exists() && !text('去逛逛').exists()) {
        return true;
    }

    return false;
}

// 任务-抽奖
function taskLottery() {
    log('----------', s.PACKAGE_NAME, 'taskLottery start ----------');

    others.back2();
    if (!clicks.centerXyByText('天天抽奖')) {
        return false;
    }
    sleeps.s2to3();

    if (text('已参与').exists() && !text('0元抽').exists()) {
        return true;
    }

    for (var i = 0; i < 2; i++) {
        if (!clicks.textIfExists('0元抽')) {
            return false;
        }

        others.back();
    }

    if (text('已参与').exists() && !text('0元抽').exists()) {
        return true;
    }

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        status1 = taskPlayground();
        status0 = taskRandomPage();
        status2 = taskLottery();

        if (status0 && status1 && status2) {
            return true;
        }
    }

    others.send('kaola');

    return false;
};

module.exports = s;
