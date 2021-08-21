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

// 任务-考拉乐园
function taskPlayground() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!clicks.backToElement(text('首页'))) {
        return false
    }

    isClick = false
    className('android.support.v7.widget.RecyclerView').depth(4).find().forEach((value1, key1) => {
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

    for (var i = 0; i < 20; i++) {
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

    if (!clicks.backToElement(text('首页'))) {
        return false
    }

    isClick = false
    className('android.support.v7.widget.RecyclerView').depth(4).find().forEach((value1, key1) => {
        if (isClick || value1.childCount() !== 5) {
            return
        }

        value1.children().forEach((value2, key2) => {
            if (isClick || key2 !== 2) {
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

    clicks.textIfExists('下单购物')
    clicks.textIfExists('关注店铺')
    clicks.textIfExists('浏览商品')
    clicks.textIfExists('今日签到')

    isClick = false
    className('android.view.View').depth(8).find().forEach((value1, key1) => {
        if (isClick || value1.childCount() !== 3 && value1.childCount() !== 5) {
            return
        }

        value1.children().forEach((value2, key2) => {
            if (isClick || key2 !== 0 || value2.bounds().width() < 100 || value2.bounds().height() < 100) {
                return
            }

            value2.child(0).click()
            sleeps.s3()
            isClick = true
        })
    })
    if (!isClick) {
        return false
    }

    for (var i = 0; i < 20; i++) {
        if (!exists.backToElement(text('每日赚豆'))) {
            return false
        }

        if (text('已完成').exists() && !text('去逛逛').exists()) {
            return true
        } else if (clicks.textIfExists('去关注')) {
            sleeps.s2to3()
            clicks.text('关注')
            clicks.text('已关注')
            continue
        } else if (!clicks.textIfExists('去逛逛')) {
            continue
        }

        if (clicks.textIfExists('进店领豆')) {
        } else if (clicks.textIfExists('去看看')) {
            clicks.textIfExists('快打开看看吧~')
        }
        clicks.textIfExists('快打开看看吧~')
        clicks.textIfExists('快打开看看吧~')

        if (text('考拉海购-404错误页').exists()) {
            clicks.textIfExists('返回首页')
            return true
        }

        for (var j = 0; j < 8; j++) {
            swipes.down()
            sleeps.s2to3()
        }

        clicks.textIfExists('下次再说')
    }

    return false
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
        status0 = others.launch(currentAPP.PACKAGE_NAME)
        if (!status0) {
            return true
        }


        status1 = taskPlayground()
        status0 = taskRandomPage()
        // status2 = taskLottery()

        if (status0 && status1) {
            return true
        }

        others.clear()
    }

    others.send(currentAPP.NAME)

    return false
}

module.exports = currentAPP
