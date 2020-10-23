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

    if (!clicks.centerXyByText('考拉乐园')) {
        return false;
    }
    sleeps.s2to3();

    clicks.centerXyByText('知道了');

    for (var i = 0; i < 10; i++) {
        clicks.textIfExists('浏览任务');
        clicks.textIfExists('签到任务');
        clicks.textIfExists('逛商品任务');
        clicks.textIfExists('考拉升级');
    }

    if (!clicks.centerXyByText('领金币')) {
        return false;
    }

    for (var i = 0; i < 40; i++) {
        if (!clicks.centerXyByText('去逛逛')) {
            continue;
        }

        if (text('点击查看以下商品开宝箱').exists()) {
            if (clicks.centerXyByText('打开看看~')) {
                clicks.centerXyByText('继续逛商品');
            } else if (clicks.centerXyByText('立即购买')) {
                others.back2();
                continue;
            }
        } else {
            for (var k = 0; k < 8; k++) {
                swipes.down();
                sleeps.s2to3();
            }
        }

        others.back();
    }

    return true;
}

// 任务-逛商品
function taskRandomPage() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    if (!clicks.centerXyByText('领考拉豆')) {
        return false;
    }

    clicks.textIfExists('关注店铺');
    clicks.textIfExists('浏览商品');
    clicks.textIfExists('今日签到');

    clicks.xy(930, 1030);

    for (var i = 0; i < 20; i++) {
        if (!text('去逛逛').exists()) {
            continue;
        }

        clicks.centerXyByText('去逛逛');
        if (text('进店浏览15秒得考拉豆').exists()) {
            for (var j = 0; j < 10; j++) {
                if (!clicks.centerXyByText('进店领豆')) {
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
        clicks.textIfExists('下次再说');
    }

    if (text('去关注').exists()) {
        clicks.centerXyByText('去关注');
        sleeps.s2to3();
        clicks.centerXyByText('关注');
        clicks.centerXyByText('已关注');
        others.back();
    }

    return true;
}
