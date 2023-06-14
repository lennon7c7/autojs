/**
 * 微信
 */
var clicks = require('../function/clicks.js')
var exists = require('../function/exists.js')
var others = require('../function/others.js')
var sleeps = require('../function/sleeps.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.tencent.mm'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)

/**
 * 任务-朋友圈-点赞
 */
function taskMomentLike() {
    // 点赞当前页面的动态
    function clickLikeButton() {
        // 这里是需找到可以滚动的控件：ListView，className是不会改变的，这样写出来的程序会比较稳定
        var scroll = className('ListView').findOne()
        // 子控件
        var scroll_thing = scroll.children()
        // 遍历子控件
        scroll_thing.forEach((item) => {
            var comment = item.findOne(desc('评论'))
            if (comment) {
                comment.click()
                sleep(200)

                // 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，如果找到符合条件的控件则返回该控件；否则返回null
                clicks.centerXyByText('赞')
            }
        })

        // 直接调用向下滚动的方法
        scrollDown()
        sleeps.s2to5()
    }

    if (!clicks.backToElement(text('发现'))) {
        return false
    }

    if (!clicks.backToElement(text('朋友圈'))) {
        return false
    }

    if (!text('轻触更换主题照片').exists()) {
        click(108, 136)
        sleep(100)
        clicks.xy(108, 136)
    }

    for (var i = 0; i < 10; i++) {
        clickLikeButton()
    }

    return true
}

/**
 * 任务-小程序-抽奖
 */
function taskRedPackage() {
    if (!clicks.centerXyByText('Discover')) {
        return false
    }

    if (!clicks.centerXyByText('Mini Programs')) {
        return false
    }

    if (!clicks.centerXyByText('点赞抽奖')) {
        return false
    }
    sleeps.s10()
    if (!clicks.centerXyByText('参与抽奖')) {
        return false
    }

    for (var i = 0; i < 20; i++) {
        if (text('暂无相关抽奖推荐').exists()) {
            log('---------- no shit ----------')
            break
        } else if (clicks.textIfExists('参与抽奖')) {
            closeAd()
        }

        if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 103, 103)) {
            clicks.elementWidthHeight(className('android.widget.FrameLayout'), 103, 103)
        }

        clicks.textIfExists('更多抽奖')
    }
    others.back()

    return true
}

// 关闭Ad
function closeAd() {
    sleeps.s3()
    if (!text('关闭').exists()) {
        return true
    }

    clicks.xy(815, 66)
    sleeps.s20()
    for (var j = 0; j < 15; j++) {
        sleeps.s3()
        if (text('已获得奖励').exists()) {
            clicks.centerXyByText('关闭')
            clicks.centerXyByText('我知道了')
            return true
        }
    }

    return false
}

/**
 * 关闭插屏广告
 * 插屏广告组件，用户可以随时关闭插屏广告
 * @returns {boolean}
 */
function closeInterstitialAd() {
    if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 103, 103)) {
        clicks.elementWidthHeight(className('android.widget.FrameLayout'), 103, 103)
    }
}

/**
 * 关闭激励广告
 * 激励式广告组件，完整播放视频广告，并手动点击“关闭广告”按钮），将获得该小程序下发的奖励
 * @returns {boolean}
 */
function closeRewardedAd() {
    closeInterstitialAd()

    if (!text('广告').exists()) {
        return true
    }

    sleeps.s30()

    if (exists.elementWidthHeight(className('android.widget.FrameLayout'), 103, 103)) {
        clicks.elementWidthHeight(className('android.widget.FrameLayout'), 103, 103)
    } else if (exists.elementWidthHeight(className('android.widget.ImageView'), 96, 96)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 96, 96)
    } else if (exists.elementWidthHeight(className('android.widget.ImageView'), 86, 86)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 86, 86)
    } else if (text('关闭').exists()) {
        text('关闭').find().forEach((value2) => {
            if (value2.text() !== '关闭') {
                return
            }

            clicks.element(value2)
        })
    }

    if (text('暂未获得奖励').exists() || text('继续').exists()) {
        clicks.centerXyByText('继续')
        closeRewardedAd()
    }

    closeInterstitialAd()
}

// 任务-必看严选
function taskReadBiKanYanXuan() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!clicks.backToElement(text('必看严选'))) {
        return false
    }

    if (!clicks.rectByText('今日阅读赚钱已开启~')) {
        return false
    }

    for (var i = 0; i < 20; i++) {
        sleeps.s15to20()

        if (text('开始阅读').exists()) {
            clicks.text('开始阅读')
            continue
        } else if (text('今日阅读已达上限').exists() || text('今日阅读已达上限').exists() || text('倒计时结束后即可阅读').exists()) {
            return true
        }

        others.back()
    }

    return false
}

/**
 * 小程序
 */
function taskMP() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    /**
     * 任务-五福小财神
     */
    function taskWFXCS() {
        log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

        /**
         * 出征
         */
        function chuZheng() {
            log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

            startDeskApp()

            // open dialog
            if (device.height === 1920) {
                clicks.xy(device.width - 100, 1800)
            } else {
                clicks.xy(device.width - 100, 1900)
            }

            // for (var i = 0; i < 10; i++) {
            //     closeInterstitialAd()
            //
            //     // open video
            //     if (device.height === 1920) {
            //         clicks.xy(700, 700)
            //     } else {
            //         clicks.xy(700, 850)
            //     }
            //
            //     closeRewardedAd()
            //
            //     // 可能获得：贡献
            //     if (device.height === 1920) {
            //         clicks.xy(device.width / 2, 1300)
            //     } else {
            //         clicks.xy(device.width / 2, 1500)
            //     }
            //
            //     closeInterstitialAd()
            //
            //     // 可能被攻击
            //     if (device.height === 1920) {
            //         clicks.xy(device.width / 2 + 100, device.height / 2 + 200)
            //     } else {
            //         clicks.xy(device.width / 2 + 100, device.height / 2 + 200)
            //     }
            // }

            for (var i = 0; i < 5; i++) {
                closeInterstitialAd()

                // 攻打
                if (device.height === 1920) {
                    clicks.xy(900, 1000)
                } else {
                    clicks.xy(device.width - 100, device.height / 2)
                }

                closeInterstitialAd()

                // 开始对战
                clicks.xy(device.width / 2, device.height / 2)

                closeInterstitialAd()

                // 跳过
                if (device.height === 1920) {
                    clicks.xy(device.width - 100, device.height - 100)
                } else {
                    clicks.xy(device.width - 100, device.height - 300)
                }

                closeInterstitialAd()

                // 领取
                clicks.xy(device.width / 2, device.height / 2 + 100)

                closeInterstitialAd()

                // 可能获得：金币、红包
                clicks.xy(device.width / 2, device.height / 2 + 400)
            }

            return false
        }

        /**
         * Lottery
         */
        function lottery() {
            log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

            startDeskApp()

            // open dialog
            if (device.height === 1920) {
                clicks.xy(100, 1100)
            } else {
                clicks.xy(100, 1200)
            }

            for (var i = 0; i < 20; i++) {
                closeInterstitialAd()

                // button 抽奖：可能需要看广告、可能不需要
                if (device.height === 1920) {
                    clicks.xy(device.width / 2, 1500)
                } else {
                    clicks.xy(device.width / 2, 1600)
                }

                closeRewardedAd()

                // 可能获得：贡献
                if (device.height === 1920) {
                    clicks.xy(device.width / 2, 1300)
                } else {
                    clicks.xy(device.width / 2, 1500)
                }

                closeInterstitialAd()

                // 可能获得：奖励x10，需要看广告
                if (device.height === 1920) {
                    clicks.xy(device.width / 2, 1000)
                } else {
                    clicks.xy(device.width / 2, 1200)
                }

                closeInterstitialAd()

                // 可能获得：金币、红包
                if (device.height === 1920) {
                    clicks.xy(device.width / 2, 1200)
                } else {
                    clicks.xy(device.width / 2, 1300)
                }
                sleeps.s10()
            }

            return false
        }

        /**
         * 贡献红包
         */
        function GXHB() {
            log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

            startDeskApp()

            // open dialog
            if (device.height === 1920) {
                clicks.xy(100, 1800)
            } else {
                clicks.xy(100, 1900)
            }

            for (var i = 0; i < 50; i++) {
                // open dialog
                clicks.xy(device.width / 2, 500)

                // open video
                if (device.height === 1920) {
                    clicks.xy(device.width / 2, 1300)
                } else {
                    clicks.xy(device.width / 2, 1400)
                }

                closeRewardedAd()

                // lingqu
                if (device.height === 1920) {
                    clicks.xy(device.width / 2, 1300)
                } else {
                    clicks.xy(device.width / 2, 1500)
                }
                sleeps.s5()

                // 当贡献到达100时，获得提现余额
                // clicks.xy(device.width / 2, device.height / 2 + 100)
            }

            return false
        }

        /**
         * 小程序
         */
        function MP() {
            log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

            startDeskApp()

            // open dialog
            clicks.xy(100, device.height / 2 - 150)

            for (var i = 0; i < 15; i++) {
                closeInterstitialAd()

                // 试玩
                clicks.xy(device.width - 200, device.height / 2 - 250)

                closeInterstitialAd()

                if (!text('允许').exists()) {
                    clicks.xy(device.width - 200, device.height / 2 - 250)
                    sleeps.s3()

                    closeInterstitialAd()

                    // 领取金币
                    clicks.xy(device.width / 2, device.height / 2 + 400)

                    closeInterstitialAd()

                    clicks.xy(500, 1500)

                    closeInterstitialAd()

                    clicks.xy(device.width - 200, device.height / 2 - 250)
                }

                closeInterstitialAd()

                if (text('允许').exists()) {
                    clicks.centerXyByText('允许')
                }

                sleeps.s20()

                others.back()
            }

            // 领取财神宝箱
            clicks.xy(device.width - 200, device.height / 2 - 600)

            return false
        }

        /**
         * 任务-提现
         */
        function cashout() {
            log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

            startDeskApp()

            // 兑换页面
            if (device.height === 1920) {
                clicks.xy(device.width / 2, device.height / 2 - 600)
            } else {
                clicks.xy(device.width / 2, device.height / 2 - 700)
            }

            // // 提现
            clicks.xy(device.width - 200, device.height / 2 + 400)

            // 立即提现
            clicks.xy(device.width / 2, device.height / 2 + 250)

        }

        /**
         * 启用桌面应用
         * @returns {boolean}
         */
        function startDeskApp() {
            for (var i = 0; i < 3; i++) {
                others.clear()
                home()
                sleeps.s3()

                if (!clicks.text('五福小财神')) {
                    return false
                }
                sleeps.s20()

                // 防止未自动开始游戏
                if (className('android.widget.FrameLayout').find().size() === 3) {
                    clicks.xy(device.width / 2, device.height - 400)
                    sleeps.s20()
                }
            }
        }

        // MP()

        // 金币不足
        // clicks.xy(device.width / 2, device.height / 2 + 750)
        // clicks.xy(device.width / 2, device.height / 2 + 450)
        // clicks.xy(device.width / 2, device.height / 2 + 350)
        // clicks.xy(device.width / 2, device.height / 2 + 350)

        GXHB()
        // lottery()
        // chuZheng()
        cashout()
    }

    taskWFXCS()
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 3; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME)
        if (!status0) {
            return true
        }


        // status0 = taskReadBiKanYanXuan()
        taskMomentLike()
        // taskMP()

        if (status0) {
            return true
        }
    }

    others.send(currentAPP.NAME)

    return false
}

/**
 * 任务-朋友圈-点赞
 */
currentAPP.autoLike = function () {
    status0 = others.launch(currentAPP.PACKAGE_NAME)
    if (!status0) {
        return true
    }

    taskMomentLike()
}

module.exports = currentAPP
