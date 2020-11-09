/**
 * 微信-任务
 * 我的系统语言是英文，所以需要的自己替换成中文
 */
var clicks = require('./function-clicks.js');
var others = require('./function-others.js');
var sleeps = require('./function-sleeps.js');
var swipes = require('./function-swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.tencent.mm';

/**
 * 任务-朋友圈-点赞
 */
function taskMomentLike() {
    if (!clicks.centerXyByText('Discover')) {
        return false;
    }

    if (!clicks.centerXyByText('Moments')) {
        return false;
    }

    if (!text('Tap to change album cover').exists()) {
        toast('双击 顶部-更新朋友圈');
        click(108, 136);
        sleep(100);
        clicks.xy(108, 136)
    }

    for (var i = 0; i < 50; i++) {
        clickLikeButton();
    }

    return true;
}

// 点赞当前页面的动态
function clickLikeButton() {
    // 这里是需找到可以滚动的控件：ListView，className是不会改变的，这样写出来的程序会比较稳定
    var scroll = className('ListView').findOne();
    // 子控件
    var scroll_thing = scroll.children();
    // 遍历子控件
    scroll_thing.forEach((item, position) => {
        var comment = item.findOne(desc('Comment'));
        if (comment) {
            comment.click();
            sleep(200);

            // 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，如果找到符合条件的控件则返回该控件；否则返回null
            clicks.centerXyByText('Like');
        }
    });

    // 直接调用向下滚动的方法
    scrollDown();
    sleeps.s2to5();
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        status = taskMomentLike();

        if (status) {
            return true;
        }
    }

    return false;
};

module.exports = s;
