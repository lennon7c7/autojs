var clicks = require('../function/clicks.js')
var exists = require('../function/exists.js')
var others = require('../function/others.js')
var sleeps = require('../function/sleeps.js')
var swipes = require('../function/swipes.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.kaola'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)
currentAPP.VERSION = '4.46.3'
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2021/03/04/3/110_a24e95aa1f482219920705de101a0d7d.apk'

// 助力
function taskShareHelp() {
    MP_URL = 'kaola://s.kaola.com/activity-cutepet/newHome.html?_fullscreen=true&targetUrl=https%253A%252F%252Fs.kaola.com%252Factivity-cutepet%252FnewHome.html%253F_fullscreen%253Dtrue&taskShareCode=87j7xX8bMID0Jgswe0zen37gy4LCeoeQdo6kvxEY3oQ&pageSource=share&shareUserCode=QQPh7FmdrDn4JzH2SdOeAxpHlCTFPY72Cf9Q4E1CD0U&shareChannelCode=klqpetv2task'
    app.startActivity({ data: MP_URL })
    sleeps.s15()
    clicks.textIfExists('为Ta助力')

    MP_URL = 'kaola://s.kaola.com/activity-cutepet/newHome.html?_fullscreen=true&targetUrl=https%253A%252F%252Fs.kaola.com%252Factivity-cutepet%252FnewHome.html%253F_fullscreen%253Dtrue&taskShareCode=87j7xX8bMID0Jgswe0zen-1e4Psj9bvDDXgUDkOZayA&pageSource=share&shareUserCode=80R_hsqsM3yMsrvl3BNf2hpHlCTFPY72Cf9Q4E1CD0U&shareChannelCode=klqpetv2task'
    app.startActivity({ data: MP_URL })
    sleeps.s15()
    clicks.textIfExists('为Ta助力')

    MP_URL = 'kaola://s.kaola.com/activity-cutepet/newHome.html?_fullscreen=true&targetUrl=https%253A%252F%252Fs.kaola.com%252Factivity-cutepet%252FnewHome.html%253F_fullscreen%253Dtrue&taskShareCode=87j7xX8bMID0Jgswe0zen-EtL8CuqjaLo7ZHWhmOhl0&pageSource=share&shareUserCode=XPl-4L_d8B9Pbb6A-Y1jXRpHlCTFPY72Cf9Q4E1CD0U&shareChannelCode=klqpetv2task'
    app.startActivity({ data: MP_URL })
    sleeps.s15()
    clicks.textIfExists('为Ta助力')

}

// 任务-考拉乐园
function taskPlayground() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!clicks.backToElement(text('首页'))) {
        return false
    }

    isClick = false
    className('android.support.v7.widget.RecyclerView').depth(4).find().forEach((value1) => {
        if (isClick || value1.childCount() !== 5) {
            return
        }

        value1.children().forEach((value2, key2) => {
            if (isClick || key2 !== 1) {
                return
            }

            value2.click()
            sleeps.s3()
            isClick = true
        })
    })
    if (!isClick) {
        return false
    }
    sleeps.s15()

    clicks.textIfExists('知道了')

    for (var i = 0; i < 10; i++) {
        clicks.textIfExists('浏览任务')
        clicks.textIfExists('签到任务')
        clicks.textIfExists('逛商品任务')
        clicks.textIfExists('考拉升级')
    }

    if (!clicks.text('领金币')) {
        return false
    }

    if (text('再逛逛').exists() && !text('去逛逛').exists()) {
        return true
    }

    element = textStartsWith('去华为应用市场写评论（0/1）')
    if (element.exists()) {
        clicks.text(element.findOne().text())
        clicks.text('去评论')
    }

    for (i = 0; i < 20; i++) {
        if (!exists.backToElement(text('今日'))) {
            return false
        }

        if (!clicks.textIfExists('去逛逛')) {
            continue
        }

        if (text('点击查看以下商品开宝箱').exists()) {
            if (clicks.textIfExists('打开看看~') || clicks.textIfExists('打开看看～')) {
            } else if (clicks.text('立即购买')) {
            }
        } else {
            if (text('考拉海购-404错误页').exists()) {
                clicks.textIfExists('返回首页')
                return true
            }

            for (var k = 0; k < 8; k++) {
                swipes.down()
                sleeps.s2to3()
            }
        }
    }

    if ((text('再逛逛').exists() && !text('去逛逛').exists()) ||
        text('再逛逛').find().size() >= 5) {
        return true
    }

    return false
}

// 任务-领考拉豆
function taskRandomPage() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    MP_URL = 'kaola://s.kaola.com/activity-cutepet/newHome.html?_fullscreen=true'
    app.startActivity({ data: MP_URL })
    sleeps.s15()

    if (text('取消').exists()) {
        clicks.centerXyByText('取消')
    }

    clicks.textIfExists('下单购物')
    clicks.textIfExists('关注店铺')
    clicks.textIfExists('浏览商品')
    clicks.textIfExists('今日签到')
    clicks.textIfExists('每日签到')
    clicks.textIfExists('累计任务')

    clicks.textIfExists('我知道了')

    for (var i = 0; i < 10; i++) {
        clicks.textIfExists('任务得豆')
    }

    // 赚豆
    clicks.xy(870, 1470)

    for (i = 0; i < 3; i++) {
        clicks.textIfExists('立即领取')
    }

    for (i = 0; i < 3; i++) {
        clicks.textIfExists('可领取')
    }


    // textString = '浏览全球探物10秒可领';
    // if (text(textString).exists()) {
    //     buttonClick = text(textString).findOne().parent().parent().parent().findOne(text('去浏览'))
    //     if (buttonClick != null) {
    //         clicks.element(buttonClick)

    //         for (var k = 0; k < 10; k++) {
    //             swipes.down()
    //             sleeps.s2to3()
    //         }

    //         others.backToElement(text('累计任务奖励'))
    //         clicks.textIfExists('可领取')
    //         clicks.textIfExists('立即领取')
    //     }
    // }

    // textString = '浏览15秒可得';
    // if (text(textString).exists()) {
    //     buttonClick = text(textString).findOne().parent().parent().parent().findOne(text('去完成'))
    //     if (buttonClick != null) {
    //         clicks.element(buttonClick)
    //         if (text('招财猪天天送现金-UC').exists()) {
    //             clicks.xy(device.width / 2, 2000)
    //         }

    //         for (var k = 0; k < 10; k++) {
    //             swipes.down()
    //             sleeps.s2to3()
    //         }

    //         others.backToElement(text('累计任务奖励'))
    //         clicks.textIfExists('可领取')
    //         clicks.textIfExists('立即领取')
    //     }
    // }


    // textString = '浏览15s可得';
    // if (text(textString).exists()) {
    //     buttonClick = text(textString).findOne().parent().parent().parent().findOne(text('去完成'))
    //     if (buttonClick != null) {
    //         clicks.element(buttonClick)
    //         if (text('招财猪天天送现金-UC').exists()) {
    //             clicks.xy(device.width / 2, 2000)
    //         }

    //         for (var k = 0; k < 10; k++) {
    //             swipes.down()
    //             sleeps.s2to3()
    //         }

    //         others.backToElement(text('累计任务奖励'))
    //         clicks.textIfExists('可领取')
    //         clicks.textIfExists('立即领取')
    //     }
    // }


    markElement = text('菜鸟免费抽手机(0/1)')
    nextKey = 3
    clickElement = text('去领取')
    if (clicks.nextXSibilingsNode(markElement, 4, clickElement)) {
        sleeps.s10()

        others.backToElement(text('累计任务奖励'))
        clicks.textIfExists('可领取')
        clicks.textIfExists('立即领取')
    }

    for (i = 0; i < 20; i++) {
        if (!clicks.textIfExists('去逛逛') && !clicks.textIfExists('逛一逛') && !clicks.textIfExists('去看看') && !clicks.textIfExists('去完成') && !clicks.textIfExists('去领取')) {
            continue
        }


        if (text('逛好物开宝箱').exists()) {
            if (text('逛好物开宝箱').find().size() < 3) {
                clicks.text('立即购买')
                exists.backToElement(text('逛好物开宝箱'))
            }
        } else {
            if (text('考拉海购-404错误页').exists()) {
                clicks.textIfExists('返回首页')
                return true
            }

            for (var k = 0; k < 10; k++) {
                swipes.down()
                sleeps.s2to3()
            }
        }

        others.backToElement(text('累计任务奖励'))
        clicks.textIfExists('可领取')
        clicks.textIfExists('立即领取')
    }


    // markElement = text('话费特惠充值限时限量抢(0/1)')
    // nextKey = 3
    // clickElement = text('去完成')
    // if (clicks.nextXSibilingsNode(markElement, 4, clickElement)) {
    //     sleeps.s10()

    //     back()
    //     back()
    //     sleeps.s3()
    //     others.backToElement(text('累计任务奖励'))
    //     clicks.textIfExists('可领取')
    //     clicks.textIfExists('立即领取')
    // }

    // markElement = text('去活力中心赢10元红包(0/1)')
    // nextKey = 3
    // clickElement = text('去完成')
    // if (clicks.nextXSibilingsNode(markElement, 4, clickElement)) {
    //     sleeps.s20()

    //     others.backToElement(text('累计任务奖励'))
    //     clicks.textIfExists('可领取')
    //     clicks.textIfExists('立即领取')
    // }

    // markElement = text('去薅羊毛赚话费(0/1)')
    // nextKey = 3
    // clickElement = text('去逛逛')
    // if (clicks.nextXSibilingsNode(markElement, 4, clickElement)) {
    //     sleeps.s20()

    //     others.backToElement(text('累计任务奖励'))
    //     clicks.textIfExists('可领取')
    //     clicks.textIfExists('立即领取')
    // }

    // markElement = text('去点淘走路赚钱(0/1)')
    // nextKey = 3
    // clickElement = text('去完成')
    // if (clicks.nextXSibilingsNode(markElement, 4, clickElement)) {
    //     sleeps.s10()

    //     others.back3()
    //     back()
    //     back()
    //     sleeps.s3()
    //     others.backToElement(text('累计任务奖励'))
    //     clicks.textIfExists('可领取')
    //     clicks.textIfExists('立即领取')
    // }

    // markElement = text('去淘特喂小鸡0元领好礼(0/1)')
    // nextKey = 3
    // clickElement = text('去完成')
    // if (clicks.nextXSibilingsNode(markElement, 4, clickElement)) {
    //     sleeps.s10()

    //     others.back3()
    //     back()
    //     back()
    //     sleeps.s3()
    //     others.backToElement(text('累计任务奖励'))
    //     clicks.textIfExists('可领取')
    //     clicks.textIfExists('立即领取')
    // }

    // markElement = text('逛淘特小程序领红包(0/1)')
    // nextKey = 3
    // clickElement = text('去完成')
    // if (clicks.nextXSibilingsNode(markElement, 4, clickElement)) {
    //     sleeps.s10()

    //     others.back3()
    //     back()
    //     back()
    //     sleeps.s3()
    //     others.backToElement(text('累计任务奖励'))
    //     clicks.textIfExists('可领取')
    //     clicks.textIfExists('立即领取')
    // }

    // markElement = text('去饿了么果园领水果(0/1)')
    // nextKey = 3
    // clickElement = text('去完成')
    // if (clicks.nextXSibilingsNode(markElement, 4, clickElement)) {
    //     sleeps.s10()

    //     others.back3()
    //     back()
    //     back()
    //     sleeps.s3()
    //     others.backToElement(text('累计任务奖励'))
    //     clicks.textIfExists('可领取')
    //     clicks.textIfExists('立即领取')
    // }

    // markElement = text('去优酷抽VIP会员(0/1)')
    // nextKey = 3
    // clickElement = text('去逛逛')
    // if (clicks.nextXSibilingsNode(markElement, 4, clickElement)) {
    //     sleeps.s10()

    //     others.back3()
    //     back()
    //     back()
    //     sleeps.s3()
    //     others.backToElement(text('累计任务奖励'))
    //     clicks.textIfExists('可领取')
    //     clicks.textIfExists('立即领取')
    // }

    // if (clicks.textIfExists('去UC')) {
    //     sleeps.s10()
    //     if (text('招财猪天天送现金-UC').exists()) {
    //         clicks.xy(device.width / 2, 2000)
    //         sleeps.s10()
    //     }

    //     others.back6()
    //     back()
    //     back()
    //     sleeps.s3()
    //     others.backToElement(text('累计任务奖励'))
    //     clicks.textIfExists('可领取')
    //     clicks.textIfExists('立即领取')
    // }

    // markElement = text('去小黑盒逛新品领红包(0/1)')
    // nextKey = 3
    // clickElement = text('去完成')
    // if (clicks.nextXSibilingsNode(markElement, 4, clickElement)) {
    //     sleeps.s10()

    //     others.back3()
    //     back()
    //     back()
    //     others.backToElement(text('累计任务奖励'))
    //     clicks.textIfExists('可领取')
    //     clicks.textIfExists('立即领取')
    // }

    // markElement = text('菜鸟免费抽手机(0/1)')
    // nextKey = 3
    // clickElement = text('去领取')
    // if (clicks.nextXSibilingsNode(markElement, 4, clickElement)) {
    //     sleeps.s10()

    //     others.backToElement(text('累计任务奖励'))
    //     clicks.textIfExists('可领取')
    //     clicks.textIfExists('立即领取')
    // }

    // markElement = text('去飞猪签到领现金红包(0/1)')
    // nextKey = 3
    // clickElement = text('去逛逛')
    // if (clicks.nextXSibilingsNode(markElement, 4, clickElement)) {
    //     sleeps.s10()

    //     others.back3()
    //     back()
    //     back()
    //     sleeps.s3()
    //     others.backToElement(text('累计任务奖励'))
    //     clicks.textIfExists('可领取')
    //     clicks.textIfExists('立即领取')
    // }
}

// 任务-抽奖
function taskLottery() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(text('天天抽奖'))) {
        return false
    }

    sleeps.s2to3()

    if (text('已参与').exists() && !text('0元抽').exists()) {
        return true
    }

    for (var i = 0; i < 2; i++) {
        if (!clicks.textIfExists('0元抽')) {
            return false
        }

        others.back()
    }

    if (text('已参与').exists() && !text('0元抽').exists()) {
        return true
    }

    return false
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 10; i++) {
        taskRandomPage()
        taskShareHelp()

        others.clear()
    }

    others.send(currentAPP.NAME)

    return false
}

module.exports = currentAPP
