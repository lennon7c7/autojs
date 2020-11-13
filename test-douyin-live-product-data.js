/**
 * 抖音-抓取直播商品数据
 * 因为无法解决接口解密，所以只能用那么low的方法
 */
var clicks = require('function/clicks.js');
var others = require('function/others.js');
var sleeps = require('function/sleeps.js');
var swipes = require('function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.ss.android.ugc.aweme';

main();

function main() {
    // others.launch(s.PACKAGE_NAME);
    // others.back3();

    // if (!clicks.elementWidthHeight(className('android.widget.FrameLayout'), 126, 132)) {
    //     return false;
    // }

    // setText('翡翠直播');
    // sleeps.s2to3();

    // clicks.xy(144, 306);

    // clicks.xy(144, 1668);

    for (var i = 0; i < 300; i++) {
        sleeps.s2to3();
        clicks.xy(957, 2085);

        if (!clicks.text('主页')) {
            return false;
        }

        log('------------');
        if (text('获赞').find().size() === 1 && text('获赞').findOne().parent().childCount() === 2) {
            text('获赞').findOnce().parent().children().forEach(function (child) {
                if (child.text() == '获赞') {
                    return false;
                }
                log('获赞：' + child.text());
            });
        }

        if (text('关注').find().size() === 2 && text('关注').findOne().parent().childCount() === 2) {
            text('关注').findOnce().parent().children().forEach(function (child) {
                if (child.text() == '关注') {
                    return false;
                }
                log('关注：' + child.text());
            });
        }

        if (text('粉丝').find().size() === 1 && text('粉丝').findOne().parent().childCount() === 2) {
            text('粉丝').findOnce().parent().children().forEach(function (child) {
                if (child.text() == '粉丝') {
                    return false;
                }
                log('粉丝：' + child.text());
            });
        }

        if (!clicks.desc('更多')) {
            return false;
        }
        if (className('android.widget.LinearLayout').find().size() === 1) {
            className('android.widget.LinearLayout').findOne().children().forEach(function (child) {
                log(child.text());
            });
        }
        others.back();

        if (textStartsWith('作品 ').find().size() == 1) {
            log(textStartsWith('作品 ').findOne().text());
        }

        if (textStartsWith('动态 ').find().size() == 1) {
            log(textStartsWith('动态 ').findOne().text());
        }

        if (textStartsWith('喜欢 ').find().size() == 1) {
            log(textStartsWith('喜欢 ').findOne().text());
        }

        if (!clicks.centerXyByText('商品橱窗')) {
            sleeps.s2to3();
            if (textStartsWith('已售 ').find().size() != 1) {
                log('---------- 已售 error ----------');
                others.back2();
                swipes.down1600();
                continue;
            }

            log(textStartsWith('已售 ').findOne().text());

            others.back3();
        } else if (text('商品').exists()) {
            clicks.xy(957, 2085);
            if (!clicks.centerXyByText('橱窗')) {
                others.back2();
                swipes.down1600();
                continue;
            }

            sleeps.s2to3();
            if (textStartsWith('已售 ').find().size() != 1) {
                others.back3();
                swipes.down1600();
                continue;
            }

            log(textStartsWith('已售 ').findOne().text());

            others.back3();
        } else {
            others.back3();
            swipes.down1600();
            continue;
        }

        swipes.down1600();
    }
}
