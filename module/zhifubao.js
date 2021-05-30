var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

currentAPP = {};
currentAPP.PACKAGE_NAME = 'com.eg.android.AlipayGphone';
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME);
currentAPP.VERSION = '10.1.99.7000';
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2020/08/21/3/120_bc32c342295d63e6980102fc3505d414.apk';
currentAPP.MP_URL = 'alipays://platformapi/startapp?appId=';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (idContains('update_cancel_tv').exists()) {
        clicks.element(idContains('update_cancel_tv'));
    }

    if (!others.backToElement(text('我的'))) {
        return false;
    }

    if (!clicks.centerXyByText('支付宝会员')) {
        return false;
    }

    sleeps.s5to10();

    if (text('全部领取').exists()) {
        clicks.centerXyByText('全部领取');
    }

    clicks.textIfExists('每日赚积分');
    if (text('每日赚积分').exists() && !clicks.centerXyByText('每日赚积分')) {
        return false;
    }

    sleeps.s2to3();
    if (text('每日赚积分').exists() && !clicks.centerXyByText('每日赚积分')) {
        return false;
    }

    if (text('每日赚积分').exists() && !text('签到领积分').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('签到领积分')) {
        return false;
    }

    if (text('每日赚积分').exists() && !text('签到领积分').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-逛15秒赚积分
 */
function task15s() {
    log('----------', currentAPP.NAME, 'task15s start ----------');

    if (!clicks.text('逛15秒赚积分')) {
        return false;
    }

    if (text('每日赚积分').exists() && textContains('已完成浏览任务').exists()) {
        return true;
    }

    sleeps.s15();

    if (text('每日赚积分').exists() && textContains('已完成浏览任务').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-天天抽奖
 */
function taskEverydayLottery() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (!clicks.backToElement(text('首页'))) {
        return false;
    }

    if (!clicks.backToElement(text('天天抽奖-每日领免费福利'))) {
        return false;
    }

    for (var i = 0; i < 3; i++) {
        if (!clicks.backToElement(text('抽奖机会'))) {
            return false;
        }

        if (text('已领卡').find().size() > 6) {
            break;
        }

        buttonTextList = [
            '逛一逛', '现在抢', '加马力', '开宝箱',
            '去领取', '去种树', '去看看', '去抽卡',
            '领好礼', '领金币',
            '立即去', '立即兑',

        ];
        buttonTextList.forEach((value) => {
            clicks.textIfExists('领取');

            if (!text(value).exists()) {
                return false;
            }

            if (!clicks.text(value)) {
                return false;
            }

            sleeps.s15to20();
            others.back();
        });
    }

    for (var i = 0; i < 5; i++) {
        if (!clicks.backToElement(text('天天抽奖-每日领免费福利'))) {
            return false;
        }

        if (!clicks.centerXyByText('0元抽奖')) {
            return true;
        }

        if (text('去领卡').exists()) {
            return true;
        }

        if (text('去逛逛').exists() && clicks.centerXyByText('去逛逛')) {
            others.back();
        }

        clicks.centerXyByText('参与抽奖');
    }

    return false;
}

/**
 * 任务-余额宝-0元抽奖
 */
function task0Lottery() {
    log('----------', currentAPP.NAME, 'task0Lottery start ----------');

    back();
    back();

    if (!clicks.backToElement(text('首页'))) {
        return false;
    }

    if (!clicks.centerXyByText('余额宝')) {
        return false;
    }
    others.back();

    if (!clicks.centerXyByText('余额宝')) {
        return false;
    }

    if (!clicks.centerXyByText('一分惊喜')) {
        return false;
    }
    others.back();

    for (var i = 0; i < 5; i++) {
        if (!clicks.backToElement(text('一分惊喜'))) {
            return false;
        }

        if (clicks.centerXyByText('0元抽奖')) {
            if (text('关注').exists()) {
                clicks.centerXyByText('关注');
            }

            if (text('确认使用').exists()) {
                clicks.centerXyByText('确认使用');
            }

            if (clicks.centerXyByText('今日抽奖机会已用完')) {
                return true;
            }

            clicks.centerXyByText('暂不进店');
        }

        if (clicks.centerXyByText('0元抽奖')) {
            clicks.centerXyByText('关注');
        }
    }

    return false;
}

/**
 * 小程序
 * @returns {bool}
 */
function taskMP() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    function taskHDYM() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '薅点羊毛';
        MP_APPID = '2021002138699035';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        var elementCount = 0
        var element = className('android.widget.Button').depth(15).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤任务: 不要金币，只要集分宝
            if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                return;
            }

            // 过滤已完成的
            if (value1.text() === '去看看') {
                return;
            }

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤任务: 不要金币，只要集分宝
                if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                    return;
                }

                // 过滤已完成的
                if (value1.text() === '去看看') {
                    return;
                }
    
                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    function taskCJYM() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '超级羊毛';
        MP_APPID = '2021002135601662';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        var elementCount = 0
        var element = className('android.widget.Button').depth(15).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤任务: 不要金币，只要集分宝
            if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                return;
            }

            // 过滤已完成的
            if (value1.text() === '去看看') {
                return;
            }

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤任务: 不要金币，只要集分宝
                if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                    return;
                }

                // 过滤已完成的
                if (value1.text() === '去看看') {
                    return;
                }
    
                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    function taskJifenbao() {
        log('----------', currentAPP.PACKAGE_NAME, 'taskJifenbao start ----------')

        MP_TITLE = '集分宝'
        MP_APPID = '2019092567759928'

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear()
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID })
            sleeps.s15()
            clicks.textIfExists('取消')
        }

        swipes.down()

        clicks.textIfExists('点击查看更多任务')
        clicks.textIfExists('点击查看更多任务')

        var element = text('去完成')
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size()
        sleeps.s1()
        element.find().size()
        sleeps.s1()
        element.find().forEach((value1, key1) => {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            if (!value1) {
                return
            }

            if (!value1.parent() || !value1.parent().findOne(text('+2'))) {
                return
            }

            if (!clicks.element(element.findOne(3000))) {
                return
            }

            clicks.textIfExists('进入生活号')
            clicks.textIfExists('关注')
            clicks.textIfExists('更多')
            clicks.textIfExists('取消关注')
            clicks.textIfExists('不再关注')
        })

        others.clear()

        return false
    }

    function taskTTZB() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '签到赢豪礼';
        MP_APPID = '2021002109688508&page=pages%2Fsign%2Findex';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        if (clicks.textIfExists('立即签到')) {
            clicks.xy(device.width / 2, device.height / 2);
            sleeps.s15();
        }

        swipes.down();

        var element = className('android.widget.Button').depth(15).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            if (!value1.text()) {
                return;
            }

            // 过滤任务: 不要金币，只要集分宝
            // if (value1.parent().parent().child(0).child(0).text() !== '+1') {
            //     return;
            // }

            // 过滤任务: 已完成的
            if (value1.text() === '去看看') {
                return;
            }

            clicks.clickableElement(element.findOne(3000));

            maybeMore();
        });

        others.clear();

        return false;
    }

    function taskYLKF() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '医鹿康福';
        MP_APPID = '2021002102665060';

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s15();


        return false;
    }

    function taskBBNC() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '芭芭农场';
        MP_APPID = '68687599';

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s15();

        clicks.xy(device.width / 2 + 250, device.height / 2 + 230);
        clicks.clickableElement(className('android.view.View').depth(7).indexInParent(3));
        clicks.textIfExists('领取');
        clicks.textIfExists('取消');

        return false;
    }

    function taskNNDK() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '牛牛打卡';
        MP_APPID = '2021002103658796';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        // swipes.down();

        var elementCount = 0
        var element = className('android.view.View').depth(12).indexInParent(1);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤任务: 不要金币，只要集分宝
            if (!value1.parent() || !value1.parent().parent() || !value1.parent().parent().parent() || value1.parent().parent().parent().childCount() !== 1) {
                return;
            }

            // 过滤已完成的

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤任务: 不要金币，只要集分宝
                if (!value1.parent() || !value1.parent().parent() || !value1.parent().parent().parent() || value1.parent().parent().parent().childCount() !== 1) {
                    return;
                }

                // 过滤已完成的

                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    function taskTTBH() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '天天宝盒';
        MP_APPID = '2021002133663694';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        if (clicks.textIfExists('立即签到')) {
            clicks.xy(device.width / 2, device.height / 2);
            sleeps.s15();
        }

        swipes.down();

        var elementCount = 0
        var element = className('android.widget.Button').depth(15).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤任务: 不要金币，只要集分宝
            if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                return;
            }

            // 过滤已完成的
            if (value1.text() === '去看看') {
                return;
            }

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤任务: 不要金币，只要集分宝
                if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                    return;
                }

                // 过滤已完成的
                if (value1.text() === '去看看') {
                    return;
                }

                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    function taskCJXQ() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '超级星球';
        MP_APPID = '2021002133621816';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        if (clicks.textIfExists('签到')) {
            clicks.xy(device.width / 2, device.height / 2);
            sleeps.s15();
        }

        swipes.down();

        var elementCount = 0
        var element = className('android.widget.Button').depth(15).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤任务: 不要金币，只要集分宝
            if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                return;
            }

            // 过滤已完成的
            if (value1.text() === '去看看') {
                return;
            }

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤任务: 不要金币，只要集分宝
                if (value1.parent().parent().child(0).child(0).text() !== '+1') {
                    return;
                }

                // 过滤已完成的
                if (value1.text() === '去看看') {
                    return;
                }
    
                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    function taskHXQ() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '花小钱';
        MP_APPID = '2021001167673032';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        var elementCount = 0
        var element = className('android.widget.Button').depth(15).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤已完成的
            if (value1.text() === '去看看') {
                return;
            }

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤已完成的

                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    function taskJXB() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '集小宝';
        MP_APPID = '2021001168619324';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        var elementCount = 0
        var element = className('android.widget.Button').depth(15).text('+1集分宝');
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            if (key1 === 0 || key1 === 1 || key1 === 2) {
                return
            }

            // 过滤已完成的
            if (value1.text() === '去看看') {
                return;
            }

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                if (key1 === 0 || key1 === 1 || key1 === 2) {
                    return
                }

                // 过滤已完成的
                if (value1.text() === '去看看') {
                    return;
                }
    
                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    function taskXQDB() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '星球夺宝';
        MP_APPID = '2021002133642751';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        className('android.widget.Button').depth(15).indexInParent(0).find().forEach((value1, key1) => {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            if (!value1.text()) {
                return;
            }

            clicks.clickableElement(value1);

            maybeMore();
        });

        others.clear();

        return false;
    }

    function taskTTLHM() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '天天领红包';
        MP_APPID = '2021001140664847';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        for (var i = 0; i < 3; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            if (text('今日红包已领完').exists()) {
                break;
            }

            clicks.clickableElement(className('android.widget.Button').text('点我领红包 （剩余3次）').findOne(3000));
            clicks.clickableElement(className('android.widget.Button').text('点我领红包 （剩余2次）').findOne(3000));
            clicks.clickableElement(className('android.widget.Button').text('点我领红包 （剩余1次）').findOne(3000));

            if (clicks.element(className('android.widget.Image').depth(10).indexInParent(3).findOne(3000))) {

            } else if (clicks.clickableElement(className('android.widget.RelativeLayout').depth(2).findOne(3000))) {

            } else if (clicks.element(className('android.view.View').text('关注店铺领券').findOne(3000))) {

            }

            maybeMore();
        }

        others.clear();

        return false;
    }

    function taskTTZD() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '天天赚点';
        MP_APPID = '2021002126672567';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        var elementCount = 0
        var element = className('android.widget.Button').depth(16).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤任务: 不要金币，只要集分宝
            if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                return;
            }

            // 过滤已完成的

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤任务: 不要金币，只要集分宝
                if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                    return;
                }

                // 过滤已完成的

                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    function taskKXZB() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '开心赚宝';
        MP_APPID = '2021002124678299';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        var elementCount = 0
        var element = className('android.widget.Button').depth(15).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤已完成的
            if (value1.text() === '去看看') {
                return;
            }

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤已完成的

                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    function taskLMYQ() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '连码有钱';
        MP_APPID = '2021002102658614';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        if (clicks.textIfExists('签到赚钱')) {
            clicks.xy(device.width / 2, device.height / 2);
            sleeps.s15();
        }

        swipes.down();

        for (var i = 0; i < 5; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            clicks.clickableElement(className('android.view.View').depth(14).text('+ 100 金币').findOne(3000));

            maybeMore();
        }

        others.clear();

        return false;
    }

    function taskDDCJ() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '点点成金';
        MP_APPID = '2021002120694820';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        clicks.textIfExists('立即签到');

        for (var i = 0; i < 5; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            clicks.clickableElement(className('android.view.View').depth(10).text('+0.01').findOne(3000));

            maybeMore();
        }

        others.clear();

        return false;
    }

    function taskJJXQ() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '集集星球';
        MP_APPID = '2019101668433279';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        if (clicks.textIfExists('签到赚钱')) {
            clicks.xy(device.width / 2, device.height / 2);
            sleeps.s15();
        }

        for (var i = 0; i < 5; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            if (!clicks.element(className('android.widget.Image').depth(16).findOne(3000))) {
                break;
            }

            maybeMore()
        }

        swipes.down();

        for (var i = 0; i < 5; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            clicks.clickableElement(className('android.widget.Button').depth(8).findOne(3000));

            maybeMore();
        }

        others.clear();

        return false;
    }

    function taskYMLQ_XZKJ() {
        log('----------', currentAPP.NAME, 'taskYMLQ_XZKJ start ----------');

        MP_TITLE = '一秒领钱-小卒科技';
        MP_APPID = '2019112869484442';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        className('android.widget.Button').text('+0.01元').depth(11).indexInParent(2).find().forEach((value1, key1) => {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            if (!clicks.clickableElement(value1)) {
                return;
            }

            maybeMore();
        });

        others.clear();

        return false;
    }

    /**
     * 任务-做任务领红包
     */
    function taskZRWLHB() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '做任务赢红包';
        MP_APPID = '2021001199601580';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        for (var i = 0; i < 3; i++) {
            var element = className('android.view.View').text('立即关注');
            // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
            element.find().size();
            sleeps.s1();
            element.find().size();
            sleeps.s1();
            element.find().forEach((value1, key1) => {
                backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

                value1.click();

                maybeMore();
            });

            var element = className('android.widget.Image');
            // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
            element.find().size();
            sleeps.s1();
            element.find().size();
            sleeps.s1();
            element.find().forEach((value1, key1) => {
                backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

                if (!value1 || value1.bounds().width() < 100 || value1.bounds().height() < 100) {
                    return;
                }

                if (value1.parent() && value1.parent().findOne(text('已完成'))) {
                    return;
                }

                value1.click();

                maybeMore();
            });

            swipes.down();
        }

        others.clear();

        return false;
    }

    function taskZDD() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '赚多多';
        MP_APPID = '2021002127667862';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        var elementCount = 0
        var element = className('android.widget.Button').depth(15).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤已完成的

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤已完成的

                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    /**
     * 任务-天天夺宝
     */
    function taskTTDB() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '天天夺宝';
        MP_APPID = '2021001167652345';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        var elementCount = 0
        var element = className('android.widget.Button').depth(8).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤已完成的

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤已完成的

                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    /**
     * 任务-开心签到
     */
    function taskKXQD() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '开心签到';
        MP_APPID = '2021001167643261';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        var elementCount = 0
        var element = className('android.view.View').depth(11).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            if (value1.childCount() !== 0) {
                return;
            }

            if (!value1.parent() || value1.parent().childCount() !== 2) {
                return;
            }

            // 过滤任务: 不要金币，只要集分宝
            if (value1.text().search('集分宝') === -1) {
                return;
            }

            // 过滤已完成的
            if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().childCount() === 3) {
                return;
            }

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                if (value1.childCount() !== 0) {
                    return;
                }

                if (!value1.parent() || value1.parent().childCount() !== 2) {
                    return;
                }
        
                // 过滤任务: 不要金币，只要集分宝
                if (value1.text().search('集分宝') === -1) {
                    return;
                }

                // 过滤已完成的
                if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().childCount() === 3) {
                    return;
                }
    
                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    function taskFXM() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '分小萌';
        MP_APPID = '2021001195607086';

        if (!text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        var element = className('android.view.View').text('访问领取');
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            value1.click();

            maybeMore();
        });

        var element = className('android.view.View').text('立即领取');
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            value1.click();

            maybeMore();
        });

        others.clear();

        return false;
    }

    /**
     * 任务-走路钱多多
     */
    function taskZLQDD() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '走路钱多多';
        MP_APPID = '2021001167680229';

        if (!text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        var elementCount = 0
        var element = className('android.widget.Button').depth(16).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤任务: 过滤第一个
            if (key1 === 0) {
                return;
            }

            // 过滤任务: 不要金币，只要集分宝
            if (!value1.parent() || !value1.parent().parent() || !value1.parent().parent().parent() || !value1.parent().parent().parent().findOne(text('+1集分宝'))) {
                return;
            }

            // 过滤已完成的
            if (value1.text() === '去看看') {
                return;
            }

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤任务: 过滤第一个
                if (key1 === 0) {
                    return;
                }

                // 过滤任务: 不要金币，只要集分宝
                if (!value1.parent() || !value1.parent().parent() || !value1.parent().parent().parent() || !value1.parent().parent().parent().findOne(text('+1集分宝'))) {
                    return;
                }

                // 过滤已完成的
                if (value1.text() === '去看看') {
                    return;
                }
    
                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    // 取消关注生活号
    function cancelLifeSubscript() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        app.startActivity({ data: 'alipays://platformapi/startapp?appId=20000166' });
        sleeps.s15();

        if (!clicks.centerXyByText('生活号')) {
            return false;
        }

        var element = id('com.alipay.mobile.pubsvc:id/publicName');
        var ignoreFile = ['菜鸟', '花呗', '考拉海购'];
        element.find().forEach((value1, key1) => {
            if (ignoreFile.indexOf(value1.text()) !== -1) {
                return;
            }

            clicks.centerXyByText(value1.text());
            clicks.descIfExists('取消');
            clicks.desc('更多');
            clicks.text('取消关注');
            clicks.text('不再关注');
            others.back();
        });
    }

    /**
     * 点击后，可能出现其它任务
     * 不是单纯的看广告，比如关注、签到等
     */
    function maybeMore() {
        sleeps.s3();

        if (clicks.textIfExists('关注生活号')) {
            if (clicks.textIfExists('立即关注')) {
                clicks.textIfExists('我知道了');
            }
        } else if (clicks.textIfExists('关注店铺领券')) {
            clicks.textIfExists('关注店铺领券')
        } else if (clicks.textIfExists('立即领取')) {
            sleeps.s3();
            clicks.textIfExists('确认授权并入会');
        } else if (clicks.textIfExists('签到赚钱')) {
            clicks.xy(device.width / 2, device.height / 2 + 100);
            sleeps.s5();
            others.back();
        } else if (clicks.textIfExists('点击关注店铺')) {
            clicks.textIfExists('点击关注店铺');
        } else if (clicks.textIfExists('亲点关注有奖励哦')) {
            clicks.textIfExists('亲点关注有奖励哦');
        } else if (!text('打开方式').exists()) {
            clicks.xy(device.width / 2, device.height / 2 - 100);
            clicks.xy(device.width / 2, device.height / 2);
            clicks.xy(device.width / 2, device.height / 2 + 150);
        }

        sleeps.s20();
    }

    /**
     * 回到指定元素存在的页面
     * @param {string} element
     * @returns
     */
    function backToElement(element) {
        // 如果元素不存在，就重新打开小程序
        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();

        if (exists.backToElement(element)) {
            clicks.textIfExists('取消');
            clicks.textIfExists('我知道了');
            clicks.textIfExists('知道了，继续赚钱');

            return true;
        }

        return true;
    }

    function taskTTWK() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '天天挖矿';
        MP_APPID = '2021002134695694';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        var elementCount = 0
        var element = className('android.widget.Button').depth(15).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤任务: 不要金币，只要集分宝
            if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                return;
            }

            // 过滤已完成的
            if (value1.text() === '去看看') {
                return;
            }

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤任务: 不要金币，只要集分宝
                if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                    return;
                }

                // 过滤已完成的
                if (value1.text() === '去看看') {
                    return;
                }
    
                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    function taskKLB() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '快领宝';
        MP_APPID = '2021002131611079';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        var elementCount = 0
        var element = className('android.widget.Button').depth(15).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            if (key1 === 0 || key1 === 1 || key1 === 2) {
                return
            }

            // 过滤已完成的
            if (value1.text() === '去看看') {
                return;
            }

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                if (key1 === 0 || key1 === 1 || key1 === 2) {
                    return
                }

                // 过滤已完成的

                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    // 取消关注生活号
    function cancelLifeSubscript() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        app.startActivity({ data: 'alipays://platformapi/startapp?appId=20000166' });
        sleeps.s15();

        if (!clicks.centerXyByText('生活号')) {
            return false;
        }

        var element = id('com.alipay.mobile.pubsvc:id/publicName');
        var ignoreFile = ['菜鸟', '花呗', '考拉海购'];
        element.find().forEach((value1, key1) => {
            if (ignoreFile.indexOf(value1.text()) !== -1) {
                return;
            }

            clicks.centerXyByText(value1.text());
            clicks.descIfExists('取消');
            clicks.desc('更多');
            clicks.text('取消关注');
            clicks.text('不再关注');
            others.back();
        });
    }

    /**
     * 点击后，可能出现其它任务
     * 不是单纯的看广告，比如关注、签到等
     */
    function maybeMore() {
        sleeps.s3();

        if (clicks.textIfExists('关注生活号')) {
            if (clicks.textIfExists('立即关注')) {
                clicks.textIfExists('我知道了');
            }
        } else if (clicks.textIfExists('关注店铺领券')) {
            clicks.textIfExists('关注店铺领券')
        } else if (clicks.textIfExists('立即领取')) {
            sleeps.s3();
            clicks.textIfExists('确认授权并入会');
        } else if (clicks.textIfExists('签到赚钱')) {
            clicks.xy(device.width / 2, device.height / 2 + 100);
            sleeps.s5();
            others.back();
        } else if (clicks.textIfExists('点击关注店铺')) {
            clicks.textIfExists('点击关注店铺');
        } else if (clicks.textIfExists('亲点关注有奖励哦')) {
            clicks.textIfExists('亲点关注有奖励哦');
        } else if (!text('打开方式').exists()) {
            clicks.xy(device.width / 2, device.height / 2 - 100);
            clicks.xy(device.width / 2, device.height / 2);
            clicks.xy(device.width / 2, device.height / 2 + 150);
        }

        sleeps.s20();
    }

    /**
     * 回到指定元素存在的页面
     * @param {string} element
     * @returns
     */
    function backToElement(element) {
        // 如果元素不存在，就重新打开小程序
        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();

        if (exists.backToElement(element)) {
            clicks.textIfExists('取消');
            clicks.textIfExists('我知道了');
            clicks.textIfExists('知道了，继续赚钱');

            return true;
        }

        return true;
    }

    function taskTTWK() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '天天挖矿';
        MP_APPID = '2021002134695694';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        swipes.down();

        var elementCount = 0
        var element = className('android.widget.Button').depth(15).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            // 过滤任务: 不要金币，只要集分宝
            if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                return;
            }

            // 过滤已完成的

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }

                // 过滤任务: 不要金币，只要集分宝
                if (!value1.parent() || !value1.parent().parent() || value1.parent().parent().child(0).child(0).text() !== '+1') {
                    return;
                }

                // 过滤已完成的

                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({ data: currentAPP.MP_URL + MP_APPID });
        sleeps.s3();
        others.clear();

        return false;
    }

    function taskKLB() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

        MP_TITLE = '快领宝';
        MP_APPID = '2021002131611079';

        if (!id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE).exists()) {
            others.clear();
            app.startActivity({data: currentAPP.MP_URL + MP_APPID});
            sleeps.s15();
            clicks.textIfExists('取消');
        }

        var elementCount = 0
        var element = className('android.widget.Button').depth(15).indexInParent(0);
        // 注意：因为有些手机要多查询几次才会获取到元素，所以不能删除
        element.find().size();
        sleeps.s1();
        element.find().size();
        sleeps.s1();
        element.find().forEach((value1, key1) => {
            if (!value1 || !value1.text()) {
                return;
            }

            if (key1 === 0 || key1 === 1 || key1 === 2) {
                return
            }

            // 过滤已完成的

            elementCount++;
        });

        for (var i = 0; i < elementCount; i++) {
            backToElement(id('com.alipay.mobile.nebula:id/h5_tv_title').text(MP_TITLE))

            isClick = false;
            element.find().forEach((value1, key1) => {
                if (isClick) {
                    return;
                }

                if (!value1 || !value1.text()) {
                    return;
                }
    
                if (key1 === 0 || key1 === 1 || key1 === 2) {
                    return
                }
    
                // 过滤已完成的

                if (!clicks.clickableElement(value1)) {
                    return;
                }
                isClick = true;
            });

            if (!isClick) {
                continue;
            }

            maybeMore();
        }

        app.startActivity({data: currentAPP.MP_URL + MP_APPID});
        sleeps.s3();
        others.clear();

        return false;
    }

    cancelLifeSubscript();

    // temp
    // taskYLKF();

    // taskKXQD();
    // return;

    // jifenbao
    taskTTBH()
    taskTTWK();
    taskHDYM();
    taskZLQDD();
    taskKXQD();
    taskTTDB();
    taskZDD();
    taskJJXQ();
    taskKXZB();
    taskTTZD();
    taskXQDB();
    taskHXQ();
    taskJXB()
    taskCJXQ();
    taskNNDK();
    taskTTZB();
    taskCJYM()
    taskKLB()
    taskJifenbao()

    // cash
    taskDDCJ();
    taskFXM();
    taskZRWLHB();
    taskYMLQ_XZKJ();
    taskTTLHM();

    // coin
    taskLMYQ();

    // other
    taskBBNC();
    // taskYLKF();
}

/**
 * 获取账户数量
 * @returns {int}
 */
function getAccountCount() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    status0 = others.launch(currentAPP.PACKAGE_NAME);
    if (!status0) {
        return 1;
    }

    if (idContains('update_cancel_tv').exists()) {
        clicks.element(idContains('update_cancel_tv'));
    }

    if (!others.backToElement(text('我的'))) {
        return 1;
    }

    if (!clicks.centerXyByDesc('设置')) {
        return 1;
    }

    if (!clicks.centerXyByText('换账号登录')) {
        return 1;
    }

    var element = className('android.widget.LinearLayout')
    var accountCount = element.find().size();

    return accountCount;
}

/**
 * 切换账户
 * @returns {boolean}
 */
function switchAccount() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------');

    if (idContains('update_cancel_tv').exists()) {
        clicks.element(idContains('update_cancel_tv'));
    }

    if (!others.backToElement(text('我的'))) {
        return false;
    }

    if (!clicks.centerXyByDesc('设置')) {
        return false;
    }

    if (!clicks.centerXyByText('换账号登录')) {
        return false;
    }

    var element = className('android.widget.LinearLayout')
    var accountCount = element.find().size();
    if (!clicks.clickableElement(element.findOnce(accountCount - 1))) {
        return false;
    }

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    var accountCount = getAccountCount()
    for (var i = 0; i < accountCount; i++) {
        for (var j = 0; j < 10; j++) {
            status0 = others.launch(currentAPP.PACKAGE_NAME);
            if (!status0) {
                continue;
            }


            status0 = taskCheckin();
            if (status0) {
                status0 = task15s();
                // task0Lottery();
                // taskEverydayLottery();
            }

            taskMP();

            if (status0) {
                break;
            }
        }

        switchAccount()

        others.clear();
    }

    if (!status0) {
        others.send(currentAPP.NAME);
    }

    return false;
};

module.exports = currentAPP;
