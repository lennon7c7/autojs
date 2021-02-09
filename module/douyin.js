/**
 * 抖音-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.ss.android.ugc.aweme';

/**
 * 抓取用户数据
 * 因为无法解决接口解密，所以只能用那么low的方法
 */
function intoDetailPage() {
    isOk = false;
    className('android.view.ViewGroup').find().forEach((value, key) => {
        if (value.bounds().width() !== 240 || value.bounds().height() != 84) {
            return false;
        }

        element = value.bounds();
        x = element.centerX() - 200;
        y = element.centerY();
        if (y > 2200) {
            return false;
        }

        if (x >= 0 && y >= 0) {
            click(x, y)
            sleep(3 * 1000);
        }

        isOk = getDetailData();
    });

    return isOk;
}

function getDetailData() {
    if (textStartsWith('抖音号').find().size() != 1) {
        log('textStartsWith error');
        others.back();
        return false;
    }

    account = textStartsWith('抖音号').findOne().text();
    if (account == '') {
        log('account empty');
        others.back();
        return false;
    }

    var storage = storages.create('tmp');
    if (storage.contains(account)) {
        log('exists ', storage.get(account));
        log('next');
        others.back();
        return true;
    }

    likeData = '';
    if (text('获赞').find().size() === 1 && text('获赞').findOne().parent().childCount() === 2) {
        text('获赞').findOnce().parent().children().forEach(function (child) {
            if (child.text() == '获赞') {
                return false;
            }
            likeData = '获赞：' + child.text();
        });
    }

    watchData = '';
    if (text('关注').find().size() === 2 && text('关注').findOne().parent().childCount() === 2) {
        text('关注').findOnce().parent().children().forEach(function (child) {
            if (child.text() == '关注') {
                return false;
            }
            watchData = '关注：' + child.text();
        });
    }

    fansData = '';
    if (text('粉丝').find().size() === 1 && text('粉丝').findOne().parent().childCount() === 2) {
        text('粉丝').findOnce().parent().children().forEach(function (child) {
            if (child.text() == '粉丝') {
                return false;
            }
            fansData = '粉丝：' + child.text();
        });
    }

    accountMoreData = getAccountMoreData();
    saleData = getSaleData();

    filename = files.cwd() + '/douyin.txt';
    appendContent = '';
    appendContent += accountMoreData;
    appendContent += likeData + ', ';
    appendContent += watchData + ', ';
    appendContent += fansData + ', ';
    appendContent += saleData;
    appendContent += "\n";
    files.append(filename, appendContent);

    storage.put(account, appendContent);

    log(appendContent);

    others.back();
    return true;
}

function getAccountMoreData() {
    accountMoreData = '';
    if (!clicks.desc('更多')) {
        return accountMoreData;
    }

    if (className('android.widget.LinearLayout').find().size() === 1) {
        className('android.widget.LinearLayout').findOne().children().forEach(function (child) {
            accountMoreData += child.text() + ', ';
        });
    }

    others.back();

    return accountMoreData;
}

function getSaleData() {
    saleData = '';
    if (text('商品橱窗').exists()) {
        sleeps.s2to3();
        clicks.centerXyByText('商品橱窗');
    } else if (text('商品').exists()) {
        swipes.down();
        swipes.down();
        swipes.down();
        swipes.down();
        clicks.centerXyByText('进入商品橱窗');
    }

    if (textStartsWith('已售 ').find().size() == 1) {
        saleData = textStartsWith('已售 ').findOne().text();
    }

    text('我的橱窗').exists() && others.back();

    return saleData;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    others.launch(s.PACKAGE_NAME);

    storages.remove('tmp');
    others.back3();

    if (!clicks.elementWidthHeight(className('android.widget.FrameLayout'), 126, 132)) {
        return false;
    }

    setText('翡翠');
    sleeps.s2to3();
    clicks.xy(144, 306);

    swipes.scrollDown2();

    for (var i = 0; i < 30; i++) {
        if (!text('用户').exists()) {
            log('用户 not exists');
            break;
        }

        intoDetailPage();

        swipes.down2200();
        sleeps.s3();
    }

    // 用户, 抖音号, 获赞, 关注, 粉丝, 已售
    filename = files.cwd() + '/douyin.txt';
    log(files.read(filename));
}

module.exports = s;
