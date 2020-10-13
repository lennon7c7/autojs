/**
 * 考拉海购-任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.kaola';

for (var i = 0; i < 10; i++) {
    main();
}

function main() {
    status1 = taskRandomPage();
    status2 = taskPlayground();

    if (status1 && status2) {
        others.exit();
    }
}

// 任务-考拉乐园
function taskPlayground() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.text('考拉乐园')) {
        return false;
    }
    sleeps.s2to3();

    clicks.text('知道了');

    for (var i = 0; i < 20; i++) {
        clicks.text('浏览任务');
        clicks.text('签到任务');
        clicks.text('逛商品任务');
        clicks.text('考拉升级');
    }

    if (!clicks.text('领金币')) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (!clicks.text('看商品开金币宝箱（0/1）')) {
            return false;
        }

        if (clicks.text('打开看看~')) {
            clicks.text('继续逛商品');
            others.back();
        }

        if (clicks.text('立即购买')) {
            for (var k = 0; k < 8; k++) {
                swipes.down();
                sleeps.s2to3();
            }

            others.back();

            if (clicks.text('打开看看~')) {
                clicks.text('继续逛商品');
                others.back();
            }

            if (clicks.text('点击查看以下商品开宝箱')) {
                others.back();
            }
        }
    }

    for (var i = 0; i < 20; i++) {
        if (!clicks.text('去逛逛')) {
            return false;
        }

        for (var k = 0; k < 8; k++) {
            swipes.down();
            sleeps.s2to3();
        }

        others.back();
    }

    return false;
}

// 任务-逛商品
function taskRandomPage() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.text('领考拉豆')) {
        return false;
    }

    clicks.text('关注店铺');
    clicks.text('浏览商品');
    clicks.text('签到');

    if (!clicks.text('每日赚豆')) {
        return false;
    }

    for (var i = 0; i < 20; i++) {
        if (!text('去逛逛').exists()) {
            return false;
        }

        clicks.text('去逛逛');
        if (text('进店浏览15秒得考拉豆').exists()) {
            for (var j = 0; j < 10; j++) {
                if (!clicks.text('进店领豆')) {
                    return false;
                }

                for (var k = 0; k < 8; k++) {
                    swipes.down();
                    sleeps.s2to3();
                }

                others.back();
            }
        } else {
            for (var j = 0; j < 8; j++) {
                swipes.down();
                sleeps.s2to3();
            }
        }

        others.back();
    }

    if (text('去关注').exists()) {
        clicks.text('去关注');
        sleeps.s2to3();
        clicks.text('关注');
        clicks.text('已关注');
        others.back();
    }

    return true;
}
