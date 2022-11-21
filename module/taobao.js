/**
 * 淘宝-任务
 */
var clicks = require('../function/clicks.js')
var exists = require('../function/exists.js')
var others = require('../function/others.js')
var sleeps = require('../function/sleeps.js')
var swipes = require('../function/swipes.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.taobao.taobao'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)
currentAPP.VERSION = ''
currentAPP.APK = ''


// 任务-收金币
function taskShouJinBi() {
    // 淘宝 - 金币小镇
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Ftmtjb%2Ftown%2Fhome%3Fwh_biz%3Dtm%26disableNav%3DYES%26hd_from%3Dalipayjf%26remind%3Dtrue&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndb5fbc2_1641359630456&slk_t=1641359630900&afcPromotionOpen=false&source=slk_dp'
    app.startActivity({data: MP_URL})
    sleeps.s10()

    // if (!className('android.widget.Button').depth(13).indexInParent(0).findOne(3000)) {
    //     return false
    // }
    // className('android.widget.Button').depth(13).indexInParent(0).findOne(3000).click()
    clicks.xy(900, 900)
    sleeps.s3()

    clicks.textIfExists('收金币')
    clicks.textIfExists('助力Ta')
    others.back()
}

// 任务-赚金币
function taskZhuanJinBi() {
    // 淘宝 - 金币小镇
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Ftmtjb%2Ftown%2Fhome%3Fwh_biz%3Dtm%26disableNav%3DYES%26hd_from%3Dalipayjf%26remind%3Dtrue&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndb5fbc2_1641359630456&slk_t=1641359630900&afcPromotionOpen=false&source=slk_dp'
    app.startActivity({data: MP_URL})
    sleeps.s10()

    clicks.xy(590, 890)
    sleeps.s10()

    for (var i = 0; i < 3; i++) {
        clicks.textIfExists('领取奖励')
    }

    clicks.textIfExists('去签到')

    if (clicks.textIfExists('找答案')) {
        className('android.widget.Button').depth(7).indexInParent(7).findOne(3000).click()
        sleeps.s3()

        exists.backToElement(text('今日任务'))
        clicks.textIfExists('领取奖励')
    }

    if (clicks.textIfExists('去蚂蚁庄园逛一逛(0/1)')) {
        sleeps.s10()

        exists.backToElement(text('今日任务'))
        clicks.textIfExists('领取奖励')
    }

    if (clicks.textIfExists('去蚂蚁森林收能量(0/1)')) {
        sleeps.s10()

        exists.backToElement(text('今日任务'))
        clicks.textIfExists('领取奖励')
    }

    for (var i = 0; i < 3; i++) {
        if (clicks.textIfExists('去完成')) {

            for (var k = 0; k < 15; k++) {
                swipes.down()
                sleeps.s1()
            }

            exists.backToElement(text('今日任务'))
            clicks.textIfExists('领取奖励')
        }
    }

    for (var i = 0; i < 3; i++) {
        if (clicks.textIfExists('去逛逛')) {

            for (var k = 0; k < 15; k++) {
                swipes.down()
                sleeps.s1()
            }

            exists.backToElement(text('今日任务'))
            clicks.textIfExists('领取奖励')
        }
    }

    for (var i = 0; i < 3; i++) {
        if (clicks.textIfExists('逛一下')) {

            for (var k = 0; k < 15; k++) {
                swipes.down()
                sleeps.s1()
            }

            exists.backToElement(text('今日任务'))
            clicks.textIfExists('领取奖励')
        }
    }

    if (clicks.textIfExists('进直播间看看(0/1)')) {
        sleeps.s30to35()

        exists.backToElement(text('今日任务'))
        clicks.textIfExists('领取奖励')
    }

    if (clicks.textIfExists('看好友动态得金币(0/1)')) {
        sleeps.s15to20()

        exists.backToElement(text('今日任务'))
        clicks.textIfExists('领取奖励')
    }

    if (clicks.textIfExists('去看淘金币省了多少钱(0/1)')) {
        exists.backToElement(text('今日任务'))
        clicks.textIfExists('领取奖励')
    }

    if (clicks.textIfExists('金币游乐园玩赚淘金币(0/1)')) {
        sleeps.s15to20()

        exists.backToElement(text('今日任务'))
        clicks.textIfExists('领取奖励')
    }

    if (clicks.textIfExists('搜一下')) {
        clicks.xy(device.width / 2 - 200, device.height / 2)
        sleeps.s15to20()
        exists.backToElement(text('今日任务'))
        clicks.textIfExists('领取奖励')
    }

    if (clicks.textIfExists('好店浏览得奖励(0/1)')) {
        sleeps.s15to20()
        exists.backToElement(text('今日任务'))
        clicks.textIfExists('领取奖励')
    }

    if (clicks.textIfExists('福气兑无门槛红包(0/1)')) {
        clicks.xy(device.width / 2, device.height / 2)
        sleeps.s30to35()
        others.back4()
        back()
        back()
        sleeps.s3()
        exists.backToElement(text('今日任务'))
        clicks.textIfExists('领取奖励')
    }
}

/**
 * 成就中心
 */
function taskLife() {
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https://pages.tmall.com/wow/z/tblife/achievement/nfcFHNzbzbAcJ8CBm3Am?disableNav=YES&from=share&sourceType=other&suid=d25bf0e4-aeda-4b2f-b0e6-0c68b94ed547&ut_sk=1.XXeQ2K0gRm8DAD%2FUgoGHfv2o_21646297_1652493645168.DingTalk.TBLife-1&un=2bf412b10649e7d5bbeeeafdb2768e28&share_crt_v=1&un_site=0&sp_abtk=common_TBLife-1_commonInfo&cpp=1&shareurl=true&spm=a313p.22.ce8hnk.1392565422159&short_name=h.fIX1X0P&app=chrome#/'
    app.startActivity({data: MP_URL})
    sleeps.s20()

    clicks.element(textEndsWith('/100成就点'))
    sleeps.s3()


    textString = '淘金币 +64';
    if (text(textString).exists()) {
        text(textString).findOnce().parent().children().forEach(function (child) {
            if (child.text() == '选TA') {
                child.click()
                sleeps.s3()
                clicks.textIfExists('继续去集成就点')

                clicks.element(textEndsWith('/100成就点'))
                sleeps.s3()
                return false
            }
        })
    }

    clicks.textIfExists('领取奖励')
    clicks.textIfExists('领取奖励')
    clicks.textIfExists('领取奖励')
    clicks.textIfExists('领取奖励')
    clicks.textIfExists('领取奖励')
    clicks.textIfExists('领取奖励')

    if (text('抽套装').exists()) {
        clicks.text('抽套装')
        sleeps.s10()
        clicks.textIfExists('每12小时免费抽 免费抽一次')

        others.back()
        clicks.textIfExists('领取奖励')
    }

    if (text('收阳光').exists()) {
        clicks.text('收阳光')
        sleeps.s10()
        clicks.textIfExists('立即去收')
        clicks.xy(550, 641)
        clicks.xy(550, 850)
        clicks.xy(450, 1000)
        clicks.xy(700, 1000)

        // 立即领取升级阳光
        clicks.xy(device.width / 2, 1700)

        others.back()
        clicks.textIfExists('领取奖励')
    }

    if (text('去消除').exists()) {
        clicks.text('去消除')
        sleeps.s10()

        clicks.xy(device.width / 2, device.height - 100)
        sleeps.s5()

        clicks.xy(device.width / 2, device.height - 300)

        clicks.xy(device.width / 2, device.height - 800)
    }

    if (text('收金币').exists()) {
        clicks.text('收金币')
        sleeps.s10()

        clicks.centerXyByText('今日签到')
        clicks.xy(400, 700)

        others.back()
        clicks.textIfExists('领取奖励')
    }

    // if (text('去下单').exists()) {
    //     // 淘宝 - 自动下0元单
    //     MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fmarket.m.taobao.com%2Fapp%2Fminiapp-biz%2Fqrcode%2Findex.html%3F_ariver_appid%3D3000000059554605%26ad_type%3D1.0%26x_object_type%3Dminiapp%26adScene%3Dxxl-news-pop%26hd_ad_includeIds%3D126087874%26sp_abtk%3Dcommon_1115_miniapp_commonInfo%26suid%3D5e757595-ddb2-47a9-b941-35444b33f7ee%26prismChannel%3Dpoplayer%26adTrace%3D272326504420001__user_define__21207b9016482542051316081e563f__I__C__0%26_mp_code%3Dtb%26bxsign%3Dscdk8OFIxRqfHtCG16Dbju-GH169kzt7kD7etPRCIReNfLmkxJJYTMqSZPqosS-JXhbgIRU-ZnPZH7h3e0-Evvsmmiw_U0Hn5qEU0rTxU3Uekpx0wUw58YZnJRK_nNa-YG6%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26shareurl%3Dtrue%26share_crt_v%3D1%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1652107397885.DingTalk.1115_miniapp%26app%3Dchrome%26cpp%3D1%26settleTime%3D0%26epid%3Dmm_12852562_1778064_110736900105%26clickid%3DA17_24435877416482542137673135%26transition%3Dpresent%26shortTfs%3D149dff41288eea4dfcc913cc7c687c23%26spm%3D0.0.c1.d1%26ffs%3Dhttps%253A%252F%252Fifsk2.tanx.com%252Fffsback%253Fname%253Dminteract%2526pid%253Dmm_12852562_1778064_110736900105%2526pvid%253D4b9e1821d37fe700623e5cfd26139e65%2526biz%253DVfBUCgMKATESEgj9ufmRBjIKbGVubm9uMTk5MRo6CjgKJTI3MjMyNjUwNDQyMDAwMV8zMzAwMTg5MDYyXzMzMDMxMzk3NzIYwuWPPCoBSTIBQ5ABwuWPPA__%26un_site%3D0%26sourceType%3DminiApp%26x_miniapp_id%3D3000000059554605%26short_name%3Dh.fr9fiA3%26page%3Dpages%252Findex%252Findex%26settleType%3DafterTime'
    //     app.startActivity({ data: MP_URL })
    //     sleeps.s10()
    //
    //     clicks.xy(device.width / 2, device.height / 2)
    //     sleeps.s10()
    //
    //     clicks.centerXyByText('同意')
    //     sleeps.s10()
    //
    //     clicks.centerXyByText('免费领取')
    //
    //     others.back4()
    //     clicks.textIfExists('领取奖励')
    // }
}

// 任务-逛店铺
function taskShop() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    // 淘宝 - 金币小镇
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Ftmtjb%2Ftown%2Fhome%3Fwh_biz%3Dtm%26disableNav%3DYES%26hd_from%3Dalipayjf%26remind%3Dtrue&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndb5fbc2_1641359630456&slk_t=1641359630900&afcPromotionOpen=false&source=slk_dp'
    app.startActivity({data: MP_URL})
    sleeps.s10()

    if (!className('android.widget.Button').depth(12).indexInParent(0).findOne(3000)) {
        return false
    }
    className('android.widget.Button').depth(12).indexInParent(0).findOne(3000).click()
    sleeps.s10()

    text('逛店铺').find().forEach((value1, key1) => {
        value1.click()
        sleeps.s15to20()
    })

    return false
}

// 任务-帮好友
function taskHelpFriend() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    // 淘宝 - 金币小镇
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Ftmtjb%2Ftown%2Fhome%3Fwh_biz%3Dtm%26disableNav%3DYES%26hd_from%3Dalipayjf%26remind%3Dtrue&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndb5fbc2_1641359630456&slk_t=1641359630900&afcPromotionOpen=false&source=slk_dp'
    app.startActivity({data: MP_URL})
    sleeps.s10()

    clicks.textIfExists('签到领金币')
    clicks.textIfExists('我知道了')
    clicks.textIfExists('购后返 ')

    for (var i = 0; i < 3; i++) {
        clicks.textIfExists('合力')
    }

    isClick = false
    className('android.widget.Button').depth(12).indexInParent(0).find().forEach((value1, key1) => {
        if (isClick || !value1.clickable()
            || value1.parent().className() !== 'android.view.View' || value1.parent().childCount() !== 1
            || value1.parent().parent().className() !== 'android.widget.ListView' || value1.parent().parent().childCount() !== 2
        ) {
            return
        }

        if (key1 === 5) {
            value1.click()
            sleeps.s3()
            isClick = true
        }
    })
    sleeps.s5to10()
    if (!isClick) {
        return false
    }

    for (var i = 0; i < 6; i++) {
        if (text('去助力').exists()) {
            clicks.centerXyByText('去助力')
            clicks.xy(393, 567)
            others.back()
        }
    }

    for (var i = 0; i < 6; i++) {
        if (text('喊Ta回来').exists()) {
            clicks.centerXyByText('喊Ta回来')
            clicks.xy(393, 507)
            clicks.xy(393, 567)
            others.back()
        }
    }

    return true
}

// 任务-金币能量
function taskMoneyPower() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    // 淘宝 - 金币小镇
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Ftmtjb%2Ftown%2Fhome%3Fwh_biz%3Dtm%26disableNav%3DYES%26hd_from%3Dalipayjf%26remind%3Dtrue&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndb5fbc2_1641359630456&slk_t=1641359630900&afcPromotionOpen=false&source=slk_dp'
    app.startActivity({data: MP_URL})
    sleeps.s10()

    if (!clicks.element(className('android.widget.Button').depth(11).indexInParent(3))) {
        return false
    }

    sleeps.s5to10()
    if (text('领取奖励').exists()) {
        clicks.centerXyByText('领取奖励')
    }

    if (text('每日7点/12点/18点可领').exists()) {
        buttonClick = text('每日7点/12点/18点可领').findOne().parent().parent().parent().findOne(text('去完成'))
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick)

            clicks.centerXyByText('领取奖励')
        }
    }

    if (text('来访就可以拿').exists()) {
        buttonClick = text('来访就可以拿').findOne().parent().parent().parent().findOne(text('去完成'))
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick)

            clicks.centerXyByText('领取奖励')
        }
    }

    if (clicks.textIfExists('逛菜鸟裹裹领寄件券(0/1)')) {
        sleeps.s2to3()

        clicks.centerXyByText('去领券')
        others.back()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (text('每日使用拍立淘立得').exists()) {
        buttonClick = text('每日使用拍立淘立得').findOne().parent().parent().parent().findOne(text('去完成'))
        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick)

            clicks.centerXyById('scan_icon')
            clicks.centerXyByText('继续上传')
            others.back2()
            if (!text('今日任务').exists()) {
                return false
            }
            clicks.centerXyByText('领取奖励')
        }
    }

    if (clicks.textIfExists('逛农场领免费水果(0/1)')) {
        sleeps.s5to10()

        clicks.centerXyByText('签到领取')
        clicks.xy(765, 1253)
        clicks.centerXyByText('去施肥，赚更多肥料')
        clicks.xy(560, 1660)
        others.back()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('淘宝人生逛街领能量(0/1)')) {
        sleeps.s10to20()

        for (var i = 1; i < 8; i++) {
            clicks.xy(500, 1000 + (i * 100))
        }

        for (var i = 1; i < 8; i++) {
            others.back()
            clicks.xy(500, 1000 + (i * 100))
            if (text('今日任务').exists()) {
                break
            }
        }

        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('查看淘宝成就月账单(0/1)')) {
        if (text('月度账单').exists()) {
            clicks.centerXyByText('月度账单')
            others.back()
        }
        others.back()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('签到领话费充值金(0/1)')) {
        sleeps.s10()
        clicks.centerXyByText('立即收下')
        others.back()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('淘宝成就签到(0/1)')) {
        if (clicks.centerXyByText('成就礼包')) {
            clicks.centerXyByText('我收下了')
        }
        if (text('成就签到').exists()) {
            buttonClick = text('成就签到').findOne().parent().findOne(className('android.widget.Button'))
            if (buttonClick != null) {
                clicks.element(buttonClick)
                clicks.centerXyByText('我收下了')
            }
        }

        others.back()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('开启通知权限领能量(0/1)')) {
        notifications()
        sleeps.s1()
        clicks.centerXyByText('Manage notifications')
        setText('手机淘宝')
        sleeps.s1()
        clicks.centerXyById('notification_package_text')
        className('android.widget.Switch').click()
        sleeps.s1()
        others.back3()

        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')

        notifications()
        sleeps.s1()
        clicks.centerXyByText('Manage notifications')
        setText('手机淘宝')
        sleeps.s1()
        clicks.centerXyById('notification_package_text')
        className('android.widget.Switch').click()
        sleeps.s1()
        others.back2()
    }

    if (clicks.textIfExists('逛蚂蚁庄园喂小鸡(0/1)')) {
        others.back2()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('去蚂蚁庄园捐蛋(0/1)')) {
        others.back2()
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    // 禁用原因：因为多个淘宝账号不一定对应上天猫账号，所以还是禁用掉吧
    // if (clicks.textIfExists('去天猫APP领红包(0/1)')) {
    //     sleeps.s10()
    //     others.back()
    //     back()
    //     back()
    //     sleeps.s3()
    //     others.back()

    //     if (!text('今日任务').exists()) {
    //         return false
    //     }
    //     clicks.centerXyByText('领取奖励')
    // }

    if (clicks.textIfExists('欢乐造1212元大红包(0/1)')) {
        sleeps.s15()
        others.back2()

        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('逛支付宝会员频道(0/1)')) {
        sleeps.s10()
        if (!exists.backToElement('今日任务')) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (clicks.textIfExists('去蚂蚁森林收能量(0/1)')) {
        sleeps.s10()
        app.launch(currentAPP.PACKAGE_NAME)
        sleeps.s3()
        if (!exists.backToElement('今日任务')) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    for (var i = 0; i < 15; i++) {
        buttonClick = null
        if (buttonClick == null && text('点击前往 最高立得').exists()) {
            buttonClick = text('点击前往 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (text('逛好店即领').exists()) {
            buttonClick = text('逛好店即领').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (text('边逛边领大额金币').exists()) {
            buttonClick = text('边逛边领大额金币').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('浏览10s 最高立得').exists()) {
            buttonClick = text('浏览10s 最高立得').findOne().parent().parent().parent().findOne(text('去助力'))
        }

        if (buttonClick == null && text('浏览页面最高立得').exists()) {
            buttonClick = text('浏览页面最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('浏览10s最高立得').exists()) {
            buttonClick = text('浏览10s最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('浏览10s 最高立得').exists()) {
            buttonClick = text('浏览10s 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
            if (buttonClick !== null && buttonClick.parent().findOne(text('去天猫app领红包(0/1)')) !== null) {
                buttonClick = null
            }
        }

        if (buttonClick == null && text('浏览10s 秒最高立得').exists()) {
            buttonClick = text('浏览10s 秒最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('浏览10秒 最高立得').exists()) {
            buttonClick = text('浏览10秒 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('逛10s 最高立得').exists()) {
            buttonClick = text('逛10s 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('逛10s 最高立得').exists()) {
            buttonClick = text('逛10s 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('浏览15s 最高立得').exists()) {
            buttonClick = text('浏览15s 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (buttonClick == null && text('浏览15s 最高立得').exists()) {
            buttonClick = text('浏览15s 最高立得').findOne().parent().parent().parent().findOne(text('去完成'))
        }

        if (text('今日任务').exists() && buttonClick != null) {
            clicks.element(buttonClick)

            for (var j = 0; j < 16; j++) {
                if (!id('taolive_frame_video_layout').exists()) {
                    swipes.down()
                }
                sleeps.s1()
            }

            others.back()
            clicks.textIfExists('回到淘宝')
            clicks.textIfExists('继续退出')
            if (!text('今日任务').exists()) {
                return false
            }
            clicks.centerXyByText('领取奖励')
        }
    }

    if (clicks.textIfExists('逛省钱消消乐拿红包(0/1)')) {
        sleeps.s10()
        clicks.xiaoxiao(102, 1702, 110, 9)
        others.back()
        clicks.xy(700, 1500)
        if (!text('今日任务').exists()) {
            return false
        }
        clicks.centerXyByText('领取奖励')
    }

    if (text('领取奖励').exists()) {
        clicks.centerXyByText('领取奖励')
    }

    return true
}

// 任务-取消关注店铺
function taskCancelShop() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(desc('我的淘宝'))) {
        return false
    }

    if (!clicks.centerXyByDesc('关注店铺')) {
        return false
    }

    for (var i = 0; i < 200; i++) {
        click(986, 373)
        sleep(500)
        click(986, 373)
        sleep(500)
    }

    return true
}

// 切换账户
function switchAccount() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    if (!others.backToElement(desc('我的淘宝'))) {
        return false
    }

    if (!clicks.desc('设置')) {
        return false
    }

    if (!clicks.text('切换账户')) {
        return false
    }

    idContains('aliuser_account_item_userinput').find().forEach((value, key) => {
        if (key !== 2) {
            return false
        }

        if (value.clickable() === false) {
            click(value.bounds().centerX(), value.bounds().centerY())
        } else {
            value.click()
        }

        sleep(3 * 1000)
    })

    return true
}

// 斗地主
function taskDDZ() {
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Fdoudizhu%2FsX78ziQH2ar7ax6DKZF2-doudizhu'
    app.startActivity({data: MP_URL})
    sleeps.s15to20()
    clicks.xy(device.width - 200, device.height - 200)
    captcha()

    if (text('当前进度 10/10').exists()) {
        return true;
    }

    for (var i = 0; i < 10; i++) {
        if (i === 9) {
            // 淘宝 - 金币小镇
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Ftmtjb%2Ftown%2Fhome%3Fwh_biz%3Dtm%26disableNav%3DYES%26hd_from%3Dalipayjf%26remind%3Dtrue&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndb5fbc2_1641359630456&slk_t=1641359630900&afcPromotionOpen=false&source=slk_dp'
            app.startActivity({data: MP_URL})
            sleeps.s10()

            clicks.element(textStartsWith('斗地主'))
        } else {
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Fdoudizhu%2FsX78ziQH2ar7ax6DKZF2-doudizhu'
            app.startActivity({data: MP_URL})
        }

        sleeps.s10()
        clicks.xy(700, 1000)
        clicks.xy(device.width / 2, device.height / 2 - 100)

        if (i === 9) {
            sleeps.s180to190()
            for (var j = 0; j < 2; j++) {
                for (var k = 0; k < 4; k++) {
                    clicks.textIfExists('领取')
                }

                clicks.textIfExists('去抽奖')
                sleeps.s10()
            }

            stepSearch()

            // 做任务
            clicks.xy(800, 2000)
            for (var j = 0; j < 2; j++) {
                clicks.element(className('android.widget.Button').text('').findOne(3000))
            }

            for (var j = 0; j < 3; j++) {
                clicks.textIfExists('领取')
            }

            for (var j = 0; j < 3; j++) {
                clicks.textIfExists('领取奖励')
            }

            // stepShareHelp()
        }

        others.clear()
        sleeps.s180to190()

        if (i <= 5) {
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Fdoudizhu%2FsX78ziQH2ar7ax6DKZF2-doudizhu'
            app.startActivity({data: MP_URL})
            sleeps.s10()

            clicks.xy(800, 2000)
            for (var j = 0; j < 2; j++) {
                clicks.element(className('android.widget.Button').text('').findOne(3000))
            }

            for (var j = 0; j < 3; j++) {
                clicks.textIfExists('领取')
            }

            for (var j = 0; j < 3; j++) {
                clicks.textIfExists('领取奖励')
            }

            others.clear()
        }
    }

    // 搜索
    function stepSearch() {
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=http%3A%2F%2Fs.m.taobao.com%2Fh5%3F_navigation_params%3D%257B%2522needdismiss%2522%253A%25220%2522%252C%2522animated%2522%253A%25220%2522%252C%2522needpoptoroot%2522%253A%25220%2522%257D%26ad_type%3D1.0%26index%3D1%26sp_abtk%3Dcommon_shoutaosearch_commonInfo%26suid%3Ddf7ac064-9e95-402e-9e03-d7696ebd4552%26q%3D%25E6%25B7%2598%25E5%25AE%259D%25E6%2596%2597%25E5%259C%25B0%25E4%25B8%25BB%26spm%3Da2141.1.searchbar.searchbox%26__mp_source%3Dchat%26layeredSrp%3Dtrue%26search_action%3Dinitiative%26un_site%3D0%26sugg%3D_1_1%26sourceType%3Dother%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26from%3Dnt_history%26scm%3D1007.home_topbar.searchbox.d%26share_crt_v%3D1%26datasource_token%3D1651413398851%26sourceType%3Dother%26suid%3Df008c708-a1c5-4c84-998a-5fb7b8610568%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1651413387411.Copy.shoutaosearch%26sp_tk%3D5a2Q5Lul5b%252BD5aSa5pyJ5Zyw552A5Lmf552A5Liq5aW9%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fI5HWKY%26app%3Dmacos_safari'
        app.startActivity({data: MP_URL})
        sleeps.s10()
    }

    // 助力
    function stepShareHelp() {
        // lennon1991
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https://m.tb.cn/h.frmiqIl'

        // 7181-2
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https://m.tb.cn/h.fKpMgsQ'
        app.startActivity({data: MP_URL})
        sleeps.s10()

        // 4306-1
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https://m.tb.cn/h.frpCUkl'
        app.startActivity({data: MP_URL})
        sleeps.s10()
    }
}

// 橙狮健身房
function taskCSJSF() {
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
    MP_URL += 'https://huodong.taobao.com/wow/z/alisports/page-config/8X7971GOVM8'
    app.startActivity({ data: MP_URL })
    sleeps.s15to20()
    captcha()
  
    clicks.textIfExists('直接领取')

    clicks.xy(100, device.height - 200)
    clicks.xy(700, 1600)
    clicks.textIfExists('关闭')

    others.clear()
}

// 淘宝人生
function taskTBRS() {
    others.clear()
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Ftblife%2Fsolution2%2Fgame-tblife%3FdisableNav%3DYES%26uniqueTag%3Dhdtblife%26from%3Dxyxgc%26route_hash%3D_home%26spm%3Da21l99.home.games.order_8&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndc96698_1653972853848&slk_t=1653972854348&afcPromotionOpen=false&afc_route=1&source=slk_dp'
    app.startActivity({ data: MP_URL })
    sleeps.s10()
    clicks.textIfExists('领取奖励')
    clicks.textIfExists('领取奖励')
    clicks.textIfExists('领取奖励')
    clicks.textIfExists('领取奖励')
    clicks.textIfExists('立即领取')
    clicks.textIfExists('立即领取')
    clicks.textIfExists('立即领取')
    clicks.textIfExists('立即领取')

    stepDice()
    stepShareHelp()

    // 助力
    function stepShareHelp() {
        others.clear()
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Ftblife%2Fsolution2%2Fgame-tblife%3FdisableNav%3DYES%26uniqueTag%3Dhdtblife%26from%3Dxyxgc%26route_hash%3D_home%26spm%3Da21l99.home.games.order_8&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndc96698_1653972853848&slk_t=1653972854348&afcPromotionOpen=false&afc_route=1&source=slk_dp'
        app.startActivity({ data: MP_URL })
        sleeps.s10()
        if (clicks.textIfExists('立即签到 ')) {
            clicks.xy(230, 1030)
            clicks.textIfExists('确认')
        }


        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https://pages.tmall.com/wow/z/tblife/default/VE7W8V2S27I?pentaprism=eyJkZWxpdmVyeUlkIjoiMjQ3MjIiLCJoZF9mcm9tX2lkIjoiMTAwMDc4IiwiaW1wbElkIjoib3RoZXJfMTU5XzBfMjQ3MjJfMCIsImZyb21Ub2tlbiI6IlFhODB3eGJzYTBsMFBHSnpmYjhOY2FsMHNFVVdVclV2aFciLCJzY2VuZUlkIjoiMjc0MCJ9&sourceType=other&suid=9b63f8ef-10d6-4c14-a4a9-5e3c23c59184&un=2bf412b10649e7d5bbeeeafdb2768e28&share_crt_v=1&un_site=0&sp_abtk=common_2ndlife_commonInfo&sourceType=other&suid=c8f28f6b-be5d-4806-b002-4ef9acabc230'
        app.startActivity({ data: MP_URL })
        sleeps.s10()
        clicks.textIfExists('帮TA助力')

        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https://pages.tmall.com/wow/z/tblife/default/VE7W8V2S27I?pentaprism=eyJkZWxpdmVyeUlkIjoiMjQ3MjIiLCJoZF9mcm9tX2lkIjoiMTAwMDc4IiwiaW1wbElkIjoib3RoZXJfMTU5XzBfMjQ3MjJfMCIsImZyb21Ub2tlbiI6IkFKR0xrRzB0S0Q3RFlwemxISk92Zmxxd3RZVTFVYVVXaGoiLCJzY2VuZUlkIjoiMjc0MCJ9&sourceType=other&suid=5ac4deef-d2bd-4c73-b427-419f5aa3ca0d&un=2bf412b10649e7d5bbeeeafdb2768e28&share_crt_v=1&un_site=0&sp_abtk=common_2ndlife_commonInfo&sourceType=other&suid=1bb4585d-c930-4095-a840-d353f3b73e87&ut_sk=1.XXeQ2K0gRm8DAD%2FUgoGHfv2o_21646297_1653540961171.DingTalk.2688&cpp=1&shareurl=true&spm=a313p.22.ce8hnk.1397482275778&short_name=h.fHDhBIq&app=chrome'
        app.startActivity({ data: MP_URL })
        sleeps.s10()
        clicks.textIfExists('帮TA助力')

        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https://pages.tmall.com/wow/z/tblife/default/VE7W8V2S27I?pentaprism=eyJkZWxpdmVyeUlkIjoiMjQ3MjIiLCJoZF9mcm9tX2lkIjoiMTAwMDc4IiwiaW1wbElkIjoib3RoZXJfMTU5XzBfMjQ3MjJfMCIsImZyb21Ub2tlbiI6IlpYZHgxMVpQMEhCWVdZd2xYR3RwQlBmWmpnSGRVd1V4VVdoTyIsInNjZW5lSWQiOiIyNzQwIn0&sourceType=other&suid=e0c9d2ca-0e0b-4ffb-befe-d2bd72c033e3&un=2bf412b10649e7d5bbeeeafdb2768e28&share_crt_v=1&un_site=0&sp_abtk=common_2ndlife_commonInfo&sourceType=other&suid=5000dabe-23cc-48e1-b537-655799d61e58&ut_sk=1.XXeQ2K0gRm8DAD%2FUgoGHfv2o_21646297_1653540961171.DingTalk.2688&cpp=1&shareurl=true&spm=a313p.22.ce8hnk.1393225325145&short_name=h.fGDNFWo&app=chrome'
        app.startActivity({ data: MP_URL })
        sleeps.s10()
        clicks.textIfExists('帮TA助力')

        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https://pages.tmall.com/wow/z/tblife/default/VE7W8V2S27I?pentaprism=eyJkZWxpdmVyeUlkIjoiMjQ3MjIiLCJoZF9mcm9tX2lkIjoiMTAwMDc4IiwiaW1wbElkIjoib3RoZXJfMTU5XzBfMjQ3MjJfMCIsImZyb21Ub2tlbiI6Ik9uNjFWampTYkdORzVLYXFpS3hsRlBBeGhWVUpVclVkaG8iLCJzY2VuZUlkIjoiMjc0MCJ9&sourceType=other&suid=f32a52c1-7feb-4d9d-ad60-29ec55127e26&un=2bf412b10649e7d5bbeeeafdb2768e28&share_crt_v=1&un_site=0&sp_abtk=common_2ndlife_commonInfo&sourceType=other&suid=6d920293-3314-4d8b-9adb-6ff2df1107ed&ut_sk=1.XXeQ2K0gRm8DAD%2FUgoGHfv2o_21646297_1653540961171.DingTalk.2688&cpp=1&shareurl=true&spm=a313p.22.ce8hnk.1396250821489&short_name=h.ftDZSHg&app=chrome'
        app.startActivity({ data: MP_URL })
        sleeps.s10()
        clicks.textIfExists('帮TA助力')

        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https://pages.tmall.com/wow/z/tblife/default/VE7W8V2S27I?pentaprism=eyJkZWxpdmVyeUlkIjoiMjQ3MjIiLCJoZF9mcm9tX2lkIjoiMTAwMDc4IiwiaW1wbElkIjoib3RoZXJfMTU5XzBfMjQ3MjJfMCIsImZyb21Ub2tlbiI6IkxYUWx6dm9ha0Y5a1FralZHbGZWRTdjYmpOc3pVUVVYVXpobyIsInNjZW5lSWQiOiIyNzQwIn0&sourceType=other&suid=5931491d-ccb4-469e-a9ff-318067fb38db&un=2bf412b10649e7d5bbeeeafdb2768e28&share_crt_v=1&un_site=0&sp_abtk=common_2ndlife_commonInfo&sourceType=other&suid=557a444e-05b1-4e72-8cfa-6e7477168b4e&ut_sk=1.XXeQ2K0gRm8DAD%2FUgoGHfv2o_21646297_1653540961171.DingTalk.2688&cpp=1&shareurl=true&spm=a313p.22.ce8hnk.1396250145322&short_name=h.ftD03D5&app=chrome'
        app.startActivity({ data: MP_URL })
        sleeps.s10()
        clicks.textIfExists('帮TA助力')

        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Ftblife%2Fdefault%2FaPMsNtB3dXhXBtYm7iwn%3Fwh_biz%3Dtm%26pid%3D431457_1007%26prismTrace%3D23142%26hd_from_id%3D100078%26deliveryId%3D23142%26prismFrom%3D%26fromToken%3DdRW61knf9aXJKNbMTEPlUXe5UqUpULUNU7%26implId%3Dother_277_701028_23142_0%26sceneId%3D2740%26spm%3Da213hw.22740928.tasklist-pentaprism.23142%26sourceType%3Dother%26suid%3D56fda7bc-b1de-44fc-977f-72b785fa3d8b%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1653883622629.Copy.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26sp_tk%3D5aW95piv5a625b6X5pyJ55Sf5Lul6L%252BZ5LmI5a2Q5a2m%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fHntkVi%26app%3Dchrome'
        app.startActivity({ data: MP_URL })
        sleeps.s20()

        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fa%2Fact%2Ftmall%2Fdailygroup%2F2137%2Fwupr%3Fwh_pid%3Ddaily-274265%26prismChannel%3Dpoplayer%26epid%3Dmm_12852562_1778064_111006600400%26adTrace%3D319135500360001__user_define.browse__212802a016540600421282639ebb84__I__H__0%26settleType%3DafterTime%26settleTime%3D0%26shortTfs%3D394ef2f4b8154d14236f0db84c017321%26ffs%3Dhttps%253A%252F%252Fifsk2.tanx.com%252Fffsback%253Fname%253Dminteract%2526pid%253Dmm_12852562_1778064_111006600400%2526pvid%253D025e0e0bb8fe97006296f40a14e4a665%2526biz%253DV.BWCgMKATESEgiK6NuUBjIKbGVubm9uMTk5MRo8CjoKJTMxOTEzNTUwMDM2MDAwMV8zNDQ5Mjk1MzAwXzM0Mzc3NDgxOTEYrp.u2AoqAUkyAUiQAa6f7tgK%26adScene%3Dtaobao-life-power-task-list%26prismTrace%3D24894%26hd_from_id%3D100078%26deliveryId%3D24894%26prismFrom%3D%26fromToken%3Dp8jAn0GtVBwYJJvXhwOasMoJUDUgUJUXUl%26implId%3Dcloudsail_555_319135500360001_24894_0%26sceneId%3D2740%26spm%3Da213hw.22740928.tasklist-pentaprism.24894%26clickid%3DA17_203_24435877416540600469587852%26ad_type%3D1.0%26sourceType%3Dother%26suid%3D19f34a90-d5da-4d01-9411-8dc02f47659e%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1654059874745.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.ft02Lvs%26app%3Dchrome'
        app.startActivity({ data: MP_URL })
        sleeps.s20()
    }

    // 骰子
    function stepDice() {
        clicks.xy(440, 1770)
        sleeps.s3()
        for (var i = 0; i < 20; i++) {
            clicks.element(textStartsWith('骰子图像 '))
            clicks.textIfExists('开心收下')
            clicks.textIfExists('放弃奖励')
            clicks.textIfExists('立即抽套装')
            clicks.textIfExists('就选它了')
        }

        clicks.textIfExists('领取奖励')
        clicks.textIfExists('领取奖励')
        clicks.textIfExists('领取奖励')
        clicks.textIfExists('领取奖励')

        if (clicks.textIfExists('去农场')) {
            others.back()
        }
    }
}

// 消消乐
function taskXXX() {
    stepFormHomePage()
    stepSignin()
    stepRandomPage()
    stepGetCoin()

    // 领取消消币
    function stepGetCoin() {
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fmarket.m.taobao.com%2Fapp%2Fzelda%2Fxxl%2Findex_tbqyy.html'
        app.startActivity({ data: MP_URL })
        sleeps.s10()

        clicks.xy(200, 400)
        clicks.xy(800, 1700)
    }

    // 浏览页面
    function stepRandomPage() {
        // coin
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Fsrhtml%3FadScene%3Dxxl-earn-coin%26adTrace%3D125400501040001__k2feeds__21203fa116521068841168631ed61c__J__5__0%26deliveryId%3D13592%26epid%3Dmm_12852562_1778064_110740950032%26etype%3D3%26eurl%3Dhttp%253A%252F%252Fclick.mz.simba.taobao.com%252Ftecpm%253Feadt%253D%2526e%253DuwExL1wAgMsSXnZCiezO6hsQmLP5zomMbtlPF%25252FOGxPwxaQSJCXwwsP7UXCcF9qbcCfoMQoeL%25252F4jd0tK6oUlrbwLky8iRKNq2LkfU0NcJTpOE87OgIF%25252B%25252Bn1todFekq6toaMlY95NFw8Y3y69E8O9AsH6YktNHismgKsN%25252FFXO1JcovyiTBBXW0JlY75Z9%25252BcHnFWjKZLms0NIQareEDsmnBqQZrAQNKNWSnjyY6z097DvtsEJPOhDBUgX6vzzv6GCHbrzYXkfmEZ9ECOtbDrEf%25252FcnZhQDHKGVsDBbUDSvx64EMwTD3UEHhquq0%25252FVwS40ZvmEX4G5TfzAIHgAwE4Dbc41yEXBaXGaMNxA%25252FFcL%25252B6Q06RYfz4I%25252FH2M70iYP63hN2dLIw8RGE%25252F9zWCLZTsE%25252F3NwmCrlbjdOkXvmPGK%25252FVb%25252FrvOOIJGgsVizHVJvSUiKQzxnt6ytVNPQ3hbhJhJR6H5pRysMiPJ87JNaY3AiJHAsUFOnJR1pkE07fMlPIIl%25252BoyIg29H7JvX8%25252BH38MzpyWykoySv%25252FweN83QqN2Du8FnL9SN%25252FGVeAuYSmOx98jAYhrohaRtd2b7EzZrXO06b4ogNKFP3v%25252F8WI732Uv7VIZlU1wz5BWQFgRgazTUq0B4agAfsNe%25252Fg8WbVgnQ4QJXVKd79P53aRsQmLP5zomM%2526u%253Dhttps%25253A%25252F%25252Fshop.m.taobao.com%25252Fshop%25252Fshop_index.htm%25253Fshop_id%25253D113925482%2526k%253D673%26ffs%3D%26fromToken%3DrdOQnjesoKr1EQbvIaJFn26fgUBUPUrUn%26hd_from_id%3D100092%26implId%3Dcloudsail_385_125400501040001_13592_0%26jumpfrom%3Dgame%26pid%3D431508_1007%252C431510_1007%26sappid%3D%26sceneId%3D1813%26settleTime%3D0%26settleType%3DafterNoSettle%26shortTfs%3D2b8a89565385b6a4a3a76dbf07c73f45%26spm%3Dtbaxc.home.0.i0.ecb8WzkjWzkj2X%26xxlTaskId%3D100000013592%26xxlTaskStatus%3D0%26xxlversion%3D4.3.17%26sourceType%3Dother%26suid%3D50ee5b68-7d2c-486c-b8d3-775664c14412%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1652105888133.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fr9cKiy%26app%3Dchrome&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndd8e6ba_1652107163529&slk_t=1652107167698&afcPromotionOpen=false&afc_route=1&source=slk_dp'
        app.startActivity({ data: MP_URL })
        sleeps.s30()

        // 15
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fhuodong.taobao.com%2Fwow%2Fa%2Fact%2Ftao%2Fdailygroup%2F2165%2Fwupr%3FdeliveryId%3D22442%26fromToken%3DqgzenP5cwMdRBovRFXWf9EnSVUKUPU9U6%26hd_from_id%3D100092%26implId%3Dother_143_404022_22442_0%26jumpfrom%3Dgame%26sappid%3D%26sceneId%3D1188%26spm%3Dtbaxc.home.0.i0.408dV55qV55q5o%26wh_pid%3Ddaily-262876%26xxlTaskId%3D100000022442%26xxlTaskStatus%3D0%26xxltag%3Dx7%26xxlversion%3D4.3.17%26sourceType%3Dother%26suid%3D18a21a0d-e700-4b5c-8c17-1e7e31367386%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1652107397885.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fs8JNjj%26app%3Dchrome%26slk_gid%3Dgid_er_normal&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndea3da6_1652107607961&slk_t=1652107610030&slk_gid=gid_er_normal&afcPromotionOpen=false&afc_route=1&source=slk_dp'
        app.startActivity({ data: MP_URL })
        sleeps.s30()

        // 30
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fhuodong.taobao.com%2Fwow%2Fa%2Fact%2Ftao%2Fdailygroup%2F2165%2Fwupr%3FdeliveryId%3D22443%26fromToken%3Dv57LnBeCadEqAxZRHOxc9j1FrUlUvUxUL%26hd_from_id%3D100092%26implId%3Dother_143_404022_22443_0%26jumpfrom%3Dgame%26sappid%3D%26sceneId%3D1188%26spm%3Dtbaxc.home.0.i0.408dV55qV55q5o%26wh_pid%3Ddaily-262876%26xxlTaskId%3D100000022443%26xxlTaskStatus%3D0%26xxltag%3Dx7%26xxlversion%3D4.3.17%26sourceType%3Dother%26suid%3Dd736461b-25f2-4213-b1c0-f924efb07267%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1652107397885.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fr9WGV9%26app%3Dchrome%26slk_gid%3Dgid_er_normal&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndfb2bf9_1652107660337&slk_t=1652107662465&slk_gid=gid_er_normal&afcPromotionOpen=false&afc_route=1&source=slk_dp'
        app.startActivity({ data: MP_URL })
        sleeps.s30()

        // 60
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fhuodong.taobao.com%2Fwow%2Fa%2Fact%2Ftao%2Fdailygroup%2F2165%2Fwupr%3FdeliveryId%3D22444%26fromToken%3DMPplgBasEgDX6vNBiPYcYebfbU6UPUpU2%26hd_from_id%3D100092%26implId%3Dother_143_404022_22444_0%26jumpfrom%3Dgame%26sappid%3D%26sceneId%3D1188%26spm%3Dtbaxc.home.0.i0.408dV55qV55q5o%26wh_pid%3Ddaily-262876%26xxlTaskId%3D100000022444%26xxlTaskStatus%3D0%26xxltag%3Dx7%26xxlversion%3D4.3.17%26sourceType%3Dother%26suid%3D752948ae-1a22-47b3-89a5-e511436c159d%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1652107397885.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fs8rncJ%26app%3Dchrome%26slk_gid%3Dgid_er_normal&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndde70d4_1652107739022&slk_t=1652107741116&slk_gid=gid_er_normal&afcPromotionOpen=false&afc_route=1&source=slk_dp'
        app.startActivity({ data: MP_URL })
        sleeps.s10()
        sleeps.s60to70()

        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Fsrhtml%3FadScene%3Dxxl-task-list%26adTrace%3D125400501040001__k2feeds__212d26b516521077829871456ea0eb__J__5__0%26deliveryId%3D10165%26epid%3Dmm_12852562_1778064_110388950288%26etype%3D3%26eurl%3Dhttp%253A%252F%252Fclick.mz.simba.taobao.com%252Ftecpm%253Feadt%253D%2526e%253DuwExL1wAgMsSXnZCiezO6hsQmLP5zomMbtlPF%25252FOGxPwxaQSJCXwwsP7UXCcF9qbcCfoMQoeL%25252F4jd0tK6oUlrbwLky8iRKNq2LkfU0NcJTpOE87OgIF%25252B%25252Bn1todFekq6toaMlY95NFw8Y3y69E8O9AsH6YktNHismgKsN%25252FFXO1JcovyiTBBXW0JlY75Z9%25252BcHnFWjKZLms0NIQareEDsmnBqQZrAQNKNWSnjyY6z097DvtsEJPOhDBUgX6vzzv6GCHbrzYXkfmEZ9ECOtbDrEf%25252FcnZhQDHKGVsDBbUDSvx64EMwTD3UEHhquq0%25252FVwS40ZvmEX4G5TfzAIHgAwE4Dbc41yEXBaXGaMNxA%25252FFcL%25252B6Q06RYfz4I%25252FH2M70iYP63hN2dLIw8RGE%25252F9zWCLZTsE%25252F3NwmCrlbjdOkXvmPGK%25252FVb%25252FrvOOIJGgsVizHVJvSUiKQzxnt6ytVNPQ3hbhJhJR6H5pRysMiPJ87JNaY3AiJHAsUFOnJR1pkE07fMlPIIl%25252BoyIg29H7JvX8%25252BH38MzpyWykoySv%25252FweN83QqN2Du8FnL9SN%25252FGVeAuYSmOx98jAYhrohaRtd2b7EzZrXO06b4ogNKFP3v%25252F8WI732Uv7VIZlU1wz5BWQFgRgazTUq0B4agAfsNe%25252Fg8WbVgnQ4QJXVKd79P53aRsQmLP5zomM%2526u%253Dhttps%25253A%25252F%25252Fshop.m.taobao.com%25252Fshop%25252Fshop_index.htm%25253Fshop_id%25253D113925482%2526k%253D673%26ffs%3D%26fromToken%3DzRb1n2EfWDp0b1DKszNSo8liMUOU6UQU0%26hd_from_id%3D100092%26implId%3Dcloudsail_493_125400501040001_10165_0%26jumpfrom%3Dgame%26pid%3D431499_1007%252C431498_1007%26sappid%3D%26sceneId%3D1188%26settleTime%3D0%26settleType%3DafterNoSettle%26shortTfs%3D2b8a89565385b6a4a3a76dbf07c73f45%26spm%3Dtbaxc.home.0.i0.408dV55qV55q5o%26xxlTaskId%3D100000010165%26xxlTaskStatus%3D0%26xxlversion%3D4.3.17%26sourceType%3Dother%26suid%3D87510e52-7cc3-44f0-809d-cad8655d8784%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1652107397885.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fI8nLt2%26app%3Dchrome&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rnd71c70a_1652107985757&slk_t=1652107988153&afcPromotionOpen=false&afc_route=1&source=slk_dp'
        app.startActivity({ data: MP_URL })
        sleeps.s30()

        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Fsrhtml%3FadScene%3Dxxl-task-list-live%26adTrace%3D125400501040001__k2feeds__212d26b516521078224754152ea0eb__J__5__0%26deliveryId%3D19239%26epid%3Dmm_12852562_1778064_110388950288%26etype%3D3%26eurl%3Dhttp%253A%252F%252Fclick.mz.simba.taobao.com%252Ftecpm%253Feadt%253D%2526e%253DuwExL1wAgMsSXnZCiezO6hsQmLP5zomMbtlPF%25252FOGxPwxaQSJCXwwsP7UXCcF9qbcCfoMQoeL%25252F4jd0tK6oUlrbwLky8iRKNq2LkfU0NcJTpOE87OgIF%25252B%25252Bn1todFekq6toaMlY95NFw8Y3y69E8O9AsH6YktNHismgKsN%25252FFXO1JcovyiTBBXW0JlY75Z9%25252BcHnFWjKZLms0NIQareEDsmnBqQZrAQNKNWSnjyY6z097DvtsEJPOhDBUgX6vzzv6GCHbrzYXkfmEZ9ECOtbDrEf%25252FcnZhQDHKGVsDBbUDSvx64EMwTD3UEHhquq0%25252FVwS40ZvmEX4G5TfzAIHgAwE4Dbc41yEXBaXGaMNxA%25252FFcL%25252B6Q06RYfz4I%25252FH2M70iYP63hN2dLIw8RGE%25252F9zWCLZTsE%25252F3NwmCrlbjdOkXvmPGK%25252FVb%25252FrvOOIJGgsVizHVJvSUiKQzxnt6ytVNPQ3hbhJhJR6H5pRysMiPJ87JNaY3AiJHAsUFOnJR1pkE07fMlPIIl%25252BoyIg29H7JvX8%25252BH38MzpyWykoySv%25252FweN83QqN2Du8FnL9SN%25252FGVeAuYSmOx98jAYhrohaRtd2b7EzZrXO06b4ogNKFP3v%25252F8WI732Uv7VIZlU1wz5BWQFgRgazTUq0B4agAfsNe%25252Fg8WbVgnQ4QJXVKd79P53aRsQmLP5zomM%2526u%253Dhttps%25253A%25252F%25252Fshop.m.taobao.com%25252Fshop%25252Fshop_index.htm%25253Fshop_id%25253D113925482%2526k%253D673%26ffs%3D%26fromToken%3D8NVzrqLUdpAMwrvDc0WteJRiAUnUkU6UV%26hd_from_id%3D100092%26implId%3Dcloudsail_223_125400501040001_19239_0%26jumpfrom%3Dgame%26pid%3D431499_1007%252C431498_1007%26sappid%3D%26sceneId%3D1188%26settleTime%3D0%26settleType%3DafterNoSettle%26shortTfs%3D2b8a89565385b6a4a3a76dbf07c73f45%26spm%3Dtbaxc.home.0.i0.408dV55qV55q5o%26xxlTaskId%3D100000019239%26xxlTaskStatus%3D0%26xxlversion%3D4.3.17%26sourceType%3Dother%26suid%3D3384f7ac-fd3d-4d19-9040-4b6237e10dd8%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1652107397885.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fs8H1R4%26app%3Dchrome&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rnd7924f4_1652108023293&slk_t=1652108025602&afcPromotionOpen=false&afc_route=1&source=slk_dp'
        app.startActivity({ data: MP_URL })
        sleeps.s30()

        // 额外
        others.clear()
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Fsrhtml%3FadScene%3Dxxl-start-scene%26adTrace%3D125400501040001__k2feeds__212d25ab16531104489032930ed2f2__J__5__0%26deliveryId%3D13468%26epid%3Dmm_12852562_1778064_110740950028%26etype%3D3%26eurl%3Dhttp%253A%252F%252Fclick.mz.simba.taobao.com%252Ftecpm%253Feadt%253D%2526e%253DuwExL1wAgMsSXnZCiezO6hsQmLP5zomMbtlPF%25252FOGxPwxaQSJCXwwsP7UXCcF9qbcCfoMQoeL%25252F4jd0tK6oUlrbwLky8iRKNq2LkfU0NcJTpOE87OgIF%25252B%25252Bn1todFekq6toaMlY95NFw8Y3y69E8O9AsH6YktNHismgKsN%25252FFXO1JcovyiTBBXW0JlY75Z9%25252BcHnFWjKZLms0NIQareEDsmnBqQZrAQNKNWSnjyY6z097DvtsEJPOhDBUgX6vzzv6GCHbrzYXkfmEZ9ECOtbDrEf%25252FcnZhQDHKGVsDBbUDSvx64EMwTD3UEHhquq0%25252FVwS40ZvmEX4G5TfzAIHgAwE4Dbc41yEXBaXGaMNxA%25252FFcL%25252B6Q06RYfz4I%25252FH2M70iYP63hN2dLIw8RGE%25252F9zWCLZTsE%25252F3NwmCrlbjdOkXvmPGK%25252FVb%25252FrvOOIJGgsVizHVJvSUiKQzxnt6ytVNPQ3hbhJhJR6H5pRysMiPJ87JNaY3AiJHAsUFOnJR1pkE07fMlPIIl%25252BoyIg29H7JvX8%25252BH38MzpyWykoySv%25252FweN83QqN2Du8FnL9SN%25252FGVeAuYSmOx98jAYhrohaRtd2b7EzZrXO06b4ogNKFP3v%25252F8WI732Uv7VIZlU1wz5BWQFgRgazTUq0B4agAfsNe%25252Fg8WbVgnQ4QJXVKd79P53aRsQmLP5zomM%2526u%253Dhttps%25253A%25252F%25252Fshop.m.taobao.com%25252Fshop%25252Fshop_index.htm%25253Fshop_id%25253D113925482%2526k%253D673%26ffs%3D%26fromToken%3Dp8jAn0GtVBXwElVeCvZsNKgsDUgUJUXUl%26hd_from_id%3D100092%26implId%3Dcloudsail_394_125400501040001_13468_0%26jumpfrom%3Dgame%26pid%3D431504_1007%252C431507_1007%26sappid%3D%26sceneId%3D1786%26settleTime%3D0%26settleType%3DafterNoSettle%26shortTfs%3D2b8a89565385b6a4a3a76dbf07c73f45%26spm%3Dtbaxc.home.0.i1.3c15uPwcuPwcxY%26xxlTaskId%3D100000013468%26xxlTaskStatus%3D0%26xxlversion%3D4.3.19%26sourceType%3Dother%26suid%3D1d798518-b0d1-4072-8ebb-bc3b03350d41%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1653110446826.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fH2Aaia%26app%3Dchrome'
        app.startActivity({ data: MP_URL })
        sleeps.s30()

        // 额外
        others.clear()
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Fsrhtml%3FadScene%3Dxxl-end-scene%26adTrace%3D125400501040001__k2feeds__2120634216531398543366530e1381__J__5__0%26deliveryId%3D13591%26epid%3Dmm_12852562_1778064_110746950044%26etype%3D3%26eurl%3Dhttp%253A%252F%252Fclick.mz.simba.taobao.com%252Ftecpm%253Feadt%253D%2526e%253DuwExL1wAgMsSXnZCiezO6hsQmLP5zomMbtlPF%25252FOGxPwxaQSJCXwwsP7UXCcF9qbcCfoMQoeL%25252F4jd0tK6oUlrbwLky8iRKNq2LkfU0NcJTpOE87OgIF%25252B%25252Bn1todFekq6toaMlY95NFw8Y3y69E8O9AsH6YktNHismgKsN%25252FFXO1JcovyiTBBXW0JlY75Z9%25252BcHnFWjKZLms0NIQareEDsmnBqQZrAQNKNWSnjyY6z097DvtsEJPOhDBUgX6vzzv6GCHbrzYXkfmEZ9ECOtbDrEf%25252FcnZhQDHKGVsDBbUDSvx64EMwTD3UEHhquq0%25252FVwS40ZvmEX4G5TfzAIHgAwE4Dbc41yEXBaXGaMNxA%25252FFcL%25252B6Q06RYfz4I%25252FH2M70iYP63hN2dLIw8RGE%25252F9zWCLZTsE%25252F3NwmCrlbjdOkXvmPGK%25252FVb%25252FrvOOIJGgsVizHVJvSUiKQzxnt6ytVNPQ3hbhJhJR6H5pRysMiPJ87JNaY3AiJHAsUFOnJR1pkE07fMlPIIl%25252BoyIg29H7JvX8%25252BH38MzpyWykoySv%25252FweN83QqN2Du8FnL9SN%25252FGVeAuYSmOx98jAYhrohaRtd2b7EzZrXO06b4ogNKFP3v%25252F8WI732Uv7VIZlU1wz5BWQFgRgazTUq0B4agAfsNe%25252Fg8WbVgnQ4QJXVKd79P53aRsQmLP5zomM%2526u%253Dhttps%25253A%25252F%25252Fshop.m.taobao.com%25252Fshop%25252Fshop_index.htm%25253Fshop_id%25253D113925482%2526k%253D673%26ffs%3D%26fromToken%3DPa51exrcB7aBPw92hOgSR7eIjUrU6U8Ue%26hd_from_id%3D100092%26implId%3Dcloudsail_397_125400501040001_13591_0%26jumpfrom%3Dgame%26pid%3D431497_1007%252C431506_1007%26sappid%3D%26sceneId%3D1812%26settleTime%3D0%26settleType%3DafterNoSettle%26shortTfs%3D2b8a89565385b6a4a3a76dbf07c73f45%26spm%3Dtbaxc.game.0.i0.4895uWPJuWPJw2%26xxlTaskId%3D100000013591%26xxlTaskStatus%3D0%26xxlversion%3D4.3.19%26sourceType%3Dother%26suid%3Df7ca178f-5098-4d7b-9a54-747ffb9771c9%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1653138819542.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fsfj6ki%26app%3Dchrome'
        app.startActivity({ data: MP_URL })
        sleeps.s30()

        others.clear()
    }

    // 星星兑好礼
    function stepSignin() {
        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fmarket.m.taobao.com%2Fapp%2Fzelda%2Fxxl-activities%2Findex.html'
        app.startActivity({ data: MP_URL })
        sleeps.s15()

        clicks.textIfExists('x2')

        others.clear()
    }

    // 从我的页面进入
    function stepFormHomePage() {
        others.clear()
        others.launch(currentAPP.PACKAGE_NAME)
        if (!others.backToElement(desc('我的淘宝'))) {
            return false
        }

        swipes.down()
        if (desc('省钱连连消').exists()) {
            clicks.centerXyByDesc('省钱连连消')
            sleeps.s15()
        }

        others.clear()
    }
}

// 芭芭农场
function taskBBNC() {
    captcha()
    stepGuoShu()
    stepYangGuang()

    // 果树
    function stepGuoShu() {
        others.clear()

        MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https://pages.tmall.com/wow/hdwk/act/2020nhj-single'
        app.startActivity({ data: MP_URL })
        sleeps.s10()

        clicks.xy(810, 1610)

        clicks.xy(device.width / 2 + 200, device.height - 300)
        clicks.textIfExists('去签到')


        clicks.textIfExists('去领取')

        if (clicks.textIfExists('逛逛支付宝芭芭农场(0/1)')) {
            sleeps.s10()
            others.back()
        }

        if (clicks.textIfExists('去答题')) {
            // clicks.textIfExists('A.是')
            clicks.textIfExists('B.不是')
            sleeps.s3()
            clicks.centerXyByText('领取奖励 500')
            clicks.textIfExists('领取奖励 500')
            clicks.centerXyByText('领取鼓励奖 150')
            clicks.textIfExists('领取鼓励奖 150')
            clicks.xy(device.width / 2, 2100)

            clicks.xy(device.width / 2 + 200, device.height - 300)
        }

        stepRandomPage()

        // 浏览页面
        function stepRandomPage() {
            // 0/3
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
            MP_URL += 'https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Flld%3Fwh_biz%3Dtm%26app_pid%3Dtb%253A431359_1007%252Ctm%253A431405_1007%26bizCode%3Dnew_browse_task3%26disableNav%3DYES%26prismTrace%3D27009%26hd_from_id%3D100085%26deliveryId%3D27009%26fromToken%3Dkawb1Kdco1RYpOrKTxDiNvAskSBUgUbU7%26implId%3Dother_520_881002_27009_2%26sceneId%3D971%26spm%3Dfarm.13840689.tasklist-pentaprism.27009%26isBottom%3Dtrue%26sourceType%3Dother%26suid%3D107cdc91-085e-4b81-8dcd-9a2d4961e6fa%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1651749930193.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fIuBEXu%26app%3Dmacos_safari'
            app.startActivity({ data: MP_URL })
            sleeps.s10()
            swipes.down()
            sleeps.s20()

            // 1/3
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
            MP_URL += 'https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Flld%3Fwh_biz%3Dtm%26app_pid%3Dtb%253A431359_1007%252Ctm%253A431405_1007%26bizCode%3Dnew_browse_task3%26disableNav%3DYES%26prismTrace%3D27009%26hd_from_id%3D100085%26deliveryId%3D27009%26fromToken%3DOzDqA7afbGY6XEV8iZdTN2DsvhJUrUjUo%26implId%3Dother_523_881002_27009_1%26sceneId%3D971%26spm%3Dfarm.13840689.tasklist-pentaprism.27009%26isBottom%3Dtrue%26sourceType%3Dother%26suid%3D9bc3e135-463d-4f76-9be9-ef1855eec2f8%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1651988193726.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fIVZjdU%26app%3Dmacos_safari'
            app.startActivity({ data: MP_URL })
            sleeps.s10()
            swipes.down()
            sleeps.s20()

            // 2/3
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
            MP_URL += 'https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Flld%3Fwh_biz%3Dtm%26app_pid%3Dtb%253A431359_1007%252Ctm%253A431405_1007%26bizCode%3Dnew_browse_task3%26disableNav%3DYES%26prismTrace%3D27009%26hd_from_id%3D100085%26deliveryId%3D27009%26fromToken%3DdRW61knf9aGbbzgLhwbF9elTaSpULUNU7%26implId%3Dother_523_881002_27009_2%26sceneId%3D971%26spm%3Dfarm.13840689.tasklist-pentaprism.27009%26isBottom%3Dtrue%26sourceType%3Dother%26suid%3D7b52002a-5cfb-405d-a4bd-3e3661c98df6%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1651988193726.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fsV1lwY%26app%3Dmacos_safari'
            app.startActivity({ data: MP_URL })
            sleeps.s10()
            swipes.down()
            sleeps.s20()

            // 0/1
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
            MP_URL += 'https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Flld%3Fwh_biz%3Dtm%26pid%3D431359_1007%26bizCode%3Dcpc_browse_task2%26disableNav%3DYES%26prismTrace%3D23873%26hd_from_id%3D100085%26deliveryId%3D23873%26fromToken%3DrdOQnjesoKrlKe7aSrNhQa9FgUBUPUrUn%26implId%3Dother_523_812003_23873_0%26sceneId%3D971%26spm%3Dfarm.13840689.tasklist-pentaprism.23873%26isBottom%3Dtrue%26sourceType%3Dother%26suid%3De6a1701b-5f2c-48bf-bea4-96c222896735%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1651988193726.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fsVXX2t%26app%3Dmacos_safari'
            app.startActivity({ data: MP_URL })
            sleeps.s10()
            swipes.down()
            sleeps.s20()

            // 0/1
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
            MP_URL += 'https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Fsrhtml%3Fpid%3D431509_1007%252C431511_1007%26epid%3Dmm_12852562_1778064_110152850014%26adTrace%3D125400501040001__k2feeds__212d26ea16521086459028546ea72d__J__5__0%26settleType%3DafterNoSettle%26settleTime%3D0%26shortTfs%3D2b8a89565385b6a4a3a76dbf07c73f45%26ffs%3D%26adScene%3Dtmall-farm-task-list%26prismTrace%3D18822%26hd_from_id%3D100085%26deliveryId%3D18822%26fromToken%3DXzPV1AjfdgvLl5J5Tn2ioAGcZUPUgUeU5%26implId%3Dcloudsail_524_125400501040001_18822_0%26sceneId%3D971%26spm%3Dfarm.13840689.tasklist-pentaprism.18822%26clickid%3DA17_24435877416521086545521348%26ad_type%3D1.0%26sourceType%3Dother%26suid%3Db7719099-7ced-4eb6-9b79-4dc60ee742d4%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1652107397885.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fr9gsxG%26app%3Dchrome&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rnd664650_1652108752972&slk_t=1652108755312&afcPromotionOpen=false&afc_route=1&source=slk_dp'
            app.startActivity({ data: MP_URL })
            sleeps.s10()
            swipes.down()
            sleeps.s20()

            // 0/1
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
            MP_URL += 'https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Fsrhtml%3Fpid%3D431509_1007%252C431511_1007%26epid%3Dmm_12852562_1778064_110152850014%26adTrace%3D125400501040001__k2feeds__21207bb816521087255727462eb4fd__J__5__0%26settleType%3DafterNoSettle%26settleTime%3D0%26shortTfs%3D2b8a89565385b6a4a3a76dbf07c73f45%26ffs%3D%26adScene%3Dtmall-farm-task-list%26prismTrace%3D18823%26hd_from_id%3D100085%26deliveryId%3D18823%26fromToken%3Dx52on7rCv198v9BaSBKiJAPHqUZUJUwUz%26implId%3Dcloudsail_524_125400501040001_18823_0%26sceneId%3D971%26spm%3Dfarm.13840689.tasklist-pentaprism.18823%26clickid%3DA17_24435877416521087358043199%26ad_type%3D1.0%26sourceType%3Dother%26suid%3De63674bb-0bee-409e-ad1c-b562f76bf001%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1652107397885.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fr9gq1q%26app%3Dchrome&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rnd5934a6_1652108836414&slk_t=1652108838722&afcPromotionOpen=false&afc_route=1&source=slk_dp'
            app.startActivity({ data: MP_URL })
            sleeps.s10()
            swipes.down()
            sleeps.s20()

            // 0/1
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
            MP_URL += 'https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Fsrhtml%3Fpid%3D431509_1007%252C431511_1007%26epid%3Dmm_12852562_1778064_110152850014%26adTrace%3D125400501040001__k2feeds__21207bfe16522810037545813e1127__J__5__0%26settleType%3DafterNoSettle%26settleTime%3D0%26shortTfs%3D2b8a89565385b6a4a3a76dbf07c73f45%26ffs%3D%26adScene%3Dtmall-farm-task-list-super-live%26prismTrace%3D17734%26hd_from_id%3D100085%26deliveryId%3D17734%26fromToken%3DrdOQnjesoKqOvJZMUrNh8nkIgUBUPUrUn%26implId%3Dcloudsail_266_125400501040001_17734_0%26sceneId%3D971%26spm%3Dfarm.13840689.tasklist-pentaprism.17734%26clickid%3DA17_2443587741652281008936299%26ad_type%3D1.0%26sourceType%3Dother%26suid%3D75c69e96-b056-4530-8e75-7f0702a9ae4f%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1652280913754.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fsIOSO1%26app%3Dmacos_safari'
            app.startActivity({ data: MP_URL })
            sleeps.s10()
            swipes.down()
            sleeps.s20()

            // 0/1
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
            MP_URL += 'https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Fsrhtml%3Fpid%3D431509_1007%252C431511_1007%26epid%3Dmm_12852562_1778064_110152850014%26adTrace%3D125400501040001__k2feeds__21205f0e16522812605512158e1100__J__5__0%26settleType%3DafterNoSettle%26settleTime%3D0%26shortTfs%3D2b8a89565385b6a4a3a76dbf07c73f45%26ffs%3D%26adScene%3Dtmall-farm-task-list%26prismTrace%3D21346%26hd_from_id%3D100085%26deliveryId%3D21346%26fromToken%3DA6LbzratKD5qDEQDHlQHg7ocYU1UaUVUj%26implId%3Dcloudsail_181_125400501040001_21346_0%26sceneId%3D971%26spm%3Dfarm.13840689.tasklist-pentaprism.21346%26clickid%3DA17_24435877416522812673869567%26ad_type%3D1.0%26sourceType%3Dother%26suid%3Dd7972fc6-10f7-40fa-b22f-36c271779173%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1652280913754.DingTalk.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fII7sOr%26app%3Dmacos_safari'
            app.startActivity({ data: MP_URL })
            sleeps.s10()
            swipes.down()
            sleeps.s20()

            // 丰收 0/1
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
            MP_URL += 'https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Fhdwk%2Ftmfarm%2Flld%3Fwh_biz%3Dtm%26app_pid%3Dtb%253A431359_1007%252Ctm%253A431405_1007%26bizCode%3Dcpc_browse_task%26disableNav%3DYES%26hd_from%3Djinbiicon%26prismTrace%3D12585%26hd_from_id%3D100085%26deliveryId%3D12585%26fromToken%3DeARB1nefOB52rJlqHgLc0JKC6UGUgUXUJ%26implId%3Dexpo_583_123083_12585_0%26sceneId%3D971%26spm%3Dfarm.13840689%252Fnormal.tasklist-pentaprism.12585%26isBottom%3Dtrue%26sourceType%3Dother%26suid%3Db3a6029e-24df-4304-a097-4c53cf933f6c%26ut_sk%3D1.XXeQ2K0gRm8DAD%252FUgoGHfv2o_21646297_1657204938820.Copy.2688%26un%3D2bf412b10649e7d5bbeeeafdb2768e28%26share_crt_v%3D1%26un_site%3D0%26sp_abtk%3Dcommon_2688_commonInfo%26sp_tk%3D5LiK5Zyo6L%252BZ5bCP5pyJ5Lmf552A5LmL5LqO5a2m5LqG%26cpp%3D1%26shareurl%3Dtrue%26short_name%3Dh.fxtCTqT%26sm%3Dc4bd7a%26app%3Dchrome'
            app.startActivity({ data: MP_URL })
            sleeps.s10()
            swipes.down()
            sleeps.s20()

            others.clear()
        }
    }

    // 阳光
    function stepYangGuang() {
        stepRandomPage()
        stepShouYangGuang()
        stepBee()

        // 浏览页面
        function stepRandomPage() {
            log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
            MP_URL += 'https://market.m.taobao.com/app/tmall-wireless/tmallfarm/index.html?disableNav=YES&inviteCode=85c1e0243059ccdebb04fa5c271d5583&spm=farm.newfarm.task.share&sourceType=other&suid=c0660d17-e1bf-4800-935f-f17bc85b927f&ut_sk=1.XXeQ2K0gRm8DAD%2FUgoGHfv2o_23181017_1651994199505.DingTalk.tmall_farm&un=2bf412b10649e7d5bbeeeafdb2768e28&share_crt_v=1&un_site=0&sp_abtk=common_tmall_farm_commonInfo&cpp=1&shareurl=true&short_name=h.fIVq9dg&bxsign=scdf7KzwvJmTm0QgGlOi22m_hJyyoHJulEp_ftuok3pXgHp_wIt41c_YO9QOr1adFuXg6MRA2NJnwBpIyspT_pwcUjDu6-4xZwtIH11pe-OtyeHX6kJpojfgA9aNyNds6XZ&app=macos_safari'
            app.startActivity({ data: MP_URL })
            sleeps.s10()

            clicks.textIfExists('立即去收')

            if (clicks.textIfExists('去浏览')) {
                sleeps.s15to20()
                others.back()
            }
        }

        // 蜜蜂采阳光
        function stepBee() {
            log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

            others.clear()
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
            MP_URL += 'https://market.m.taobao.com/app/tmall-wireless/tmallfarm/index.html?disableNav=YES&inviteCode=85c1e0243059ccdebb04fa5c271d5583&spm=farm.newfarm.task.share&sourceType=other&suid=c0660d17-e1bf-4800-935f-f17bc85b927f&ut_sk=1.XXeQ2K0gRm8DAD%2FUgoGHfv2o_23181017_1651994199505.DingTalk.tmall_farm&un=2bf412b10649e7d5bbeeeafdb2768e28&share_crt_v=1&un_site=0&sp_abtk=common_tmall_farm_commonInfo&cpp=1&shareurl=true&short_name=h.fIVq9dg&bxsign=scdf7KzwvJmTm0QgGlOi22m_hJyyoHJulEp_ftuok3pXgHp_wIt41c_YO9QOr1adFuXg6MRA2NJnwBpIyspT_pwcUjDu6-4xZwtIH11pe-OtyeHX6kJpojfgA9aNyNds6XZ&app=macos_safari'
            app.startActivity({ data: MP_URL })
            sleeps.s10()

            clicks.textIfExists('立即去收')

            clicks.xy(750, 1750)
            clicks.xy(750, 1750)
            sleeps.s5()

            if (!clicks.textIfExists('推荐采集') && !clicks.textIfExists('去采阳光')) {
                return
            }
            sleeps.s10()
            clicks.textIfExists('立刻采集')
        }

        // 收阳光
        function stepShouYangGuang() {
            log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

            others.clear()
            MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
            MP_URL += 'https://market.m.taobao.com/app/tmall-wireless/tmallfarm/index.html?disableNav=YES&inviteCode=85c1e0243059ccdebb04fa5c271d5583&spm=farm.newfarm.task.share&sourceType=other&suid=c0660d17-e1bf-4800-935f-f17bc85b927f&ut_sk=1.XXeQ2K0gRm8DAD%2FUgoGHfv2o_23181017_1651994199505.DingTalk.tmall_farm&un=2bf412b10649e7d5bbeeeafdb2768e28&share_crt_v=1&un_site=0&sp_abtk=common_tmall_farm_commonInfo&cpp=1&shareurl=true&short_name=h.fIVq9dg&bxsign=scdf7KzwvJmTm0QgGlOi22m_hJyyoHJulEp_ftuok3pXgHp_wIt41c_YO9QOr1adFuXg6MRA2NJnwBpIyspT_pwcUjDu6-4xZwtIH11pe-OtyeHX6kJpojfgA9aNyNds6XZ&app=macos_safari'
            app.startActivity({ data: MP_URL })
            sleeps.s10()

            // bee package
            // clicks.xy(850, 1050)
            // clicks.textIfExists('图片')

            clicks.textIfExists('立即去收')

            clicks.xy(550, 641)
            clicks.textIfExists('立即去收')

            clicks.xy(device.width / 2 - 200, 800)
            clicks.textIfExists('立即去收')
            clicks.xy(device.width / 2 + 200, 800)
            clicks.textIfExists('立即去收')

            clicks.xy(device.width / 2, 850)
            clicks.textIfExists('立即去收')
            clicks.xy(device.width / 2, 850)
            clicks.textIfExists('立即去收')

            clicks.xy(450, 1000)
            clicks.textIfExists('立即去收')
            clicks.xy(450, 1000)
            clicks.textIfExists('立即去收')
            clicks.xy(700, 1000)
            clicks.textIfExists('立即去收')
            clicks.xy(700, 1000)
            clicks.textIfExists('立即去收')

            clicks.xy(device.width / 2, 1100)
            clicks.textIfExists('立即去收')
            clicks.xy(device.width / 2 - 200, 1100)
            clicks.textIfExists('立即去收')
            clicks.xy(device.width / 2 + 200, 1100)
            clicks.textIfExists('立即去收')

            clicks.xy(device.width / 2, 1200)
            clicks.textIfExists('立即去收')
            clicks.xy(device.width / 2 - 200, 1300)
            clicks.textIfExists('立即去收')
            clicks.xy(device.width / 2, 1500)
            clicks.textIfExists('立即去收')

            // 立即领取升级阳光
            clicks.xy(device.width / 2, 1650)
        }
    }
}

function captcha() {
    if (text('Sorry, we have detected unusual traffic from your network.').exists()) {
        swipe(100, 1550, 900, 1550, 900)
        sleep(3000)
    }

    clicks.textIfExists('我知道了')

    clicks.textIfExists('取消')
}

// 消消乐-云上精英赛-领取幸运星星
currentAPP.XXX_YSJYS = function () {
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fmarket.m.taobao.com%2Fapp%2Fzelda%2Fxxl%2Findex_tbqyy.html'
    app.startActivity({ data: MP_URL })
    sleeps.s15to20()

    clicks.xy(device.width / 2, 300)

    clicks.xy(device.width - 100, device.height / 2 - 500)

    clicks.xy(device.width - 100, device.height / 2 - 500)


    click(device.width / 2 - 200, device.height / 2 - 200)
    sleep(5 * 1000)
    click(device.width / 2 - 100, device.height / 2 - 200)
    sleep(5 * 1000)
    click(device.width / 2 + 100, device.height / 2 - 200)
    sleep(5 * 1000)
    click(device.width / 2 + 250, device.height / 2 - 200)
    sleep(5 * 1000)

    click(device.width / 2 - 200, device.height / 2 - 100)
    sleep(5 * 1000)
    click(device.width / 2 - 100, device.height / 2 - 100)
    sleep(5 * 1000)
    click(device.width / 2 + 100, device.height / 2 - 100)
    sleep(5 * 1000)
    click(device.width / 2 + 250, device.height / 2 - 100)
    sleep(5 * 1000)


    click(device.width / 2 - 200, device.height / 2 + 200)
    sleep(5 * 1000)
    click(device.width / 2 - 100, device.height / 2 + 200)
    sleep(5 * 1000)
    click(device.width / 2 + 100, device.height / 2 + 200)
    sleep(5 * 1000)
    click(device.width / 2 + 250, device.height / 2 + 200)
    sleep(5 * 1000)

    click(device.width / 2 - 200, device.height / 2 + 400)
    sleep(5 * 1000)
    click(device.width / 2 - 100, device.height / 2 + 400)
    sleep(5 * 1000)
    click(device.width / 2 + 100, device.height / 2 + 400)
    sleep(5 * 1000)
    click(device.width / 2 + 250, device.height / 2 + 400)
    sleep(5 * 1000)
}

// 消消乐-闯关卡1
currentAPP.XXX_LEVEL1 = function () {
    others.clear()
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
    MP_URL += 'https://market.m.taobao.com/app/tmall-wireless/tmallfarm/index.html?disableNav=YES&inviteCode=85c1e0243059ccdebb04fa5c271d5583&spm=farm.newfarm.task.share&sourceType=other&suid=c0660d17-e1bf-4800-935f-f17bc85b927f&ut_sk=1.XXeQ2K0gRm8DAD%2FUgoGHfv2o_23181017_1651994199505.DingTalk.tmall_farm&un=2bf412b10649e7d5bbeeeafdb2768e28&share_crt_v=1&un_site=0&sp_abtk=common_tmall_farm_commonInfo&cpp=1&shareurl=true&short_name=h.fIVq9dg&bxsign=scdf7KzwvJmTm0QgGlOi22m_hJyyoHJulEp_ftuok3pXgHp_wIt41c_YO9QOr1adFuXg6MRA2NJnwBpIyspT_pwcUjDu6-4xZwtIH11pe-OtyeHX6kJpojfgA9aNyNds6XZ&app=macos_safari'
    app.startActivity({ data: MP_URL })
    sleeps.s15to20()
    captcha()

    clicks.textIfExists('立即去收')

    if (clicks.textIfExists('去消除')) {
        sleeps.s15to20()
        captcha()
        gotoLevel1()
    }


    // 淘宝 - 金币小镇
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url='
    MP_URL += 'https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Ftmtjb%2Ftown%2Fhome%3Fwh_biz%3Dtm%26disableNav%3DYES%26hd_from%3Dalipayjf%26remind%3Dtrue&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndb5fbc2_1641359630456&slk_t=1641359630900&afcPromotionOpen=false&source=slk_dp'
    app.startActivity({ data: MP_URL })
    sleeps.s15to20()

    if (!clicks.element(textStartsWith('消消消'))) {
        return false
    }
    sleeps.s15to20()

    gotoLevel1()    

    // 加体力
    clicks.xy(device.width / 2 + 200, device.height - 100)
    sleeps.s5to10()

    clicks.xy(device.width - 100, device.height / 2 + 250)
    clicks.textIfExists('我知道了')

    clicks.xy(device.width - 100, device.height / 2 + 450)
    clicks.textIfExists('我知道了')

    clicks.xy(device.width - 100, device.height / 2 + 650)
    clicks.textIfExists('我知道了')

    // 浏览2次
    for (var i = 0; i < 2; i++) {
        clicks.xy(device.width - 100, device.height / 2 + 850)
        clicks.textIfExists('我知道了')
    }

    // 浏览3次
    for (var i = 0; i < 3; i++) {
        clicks.xy(device.width - 100, device.height / 2 + 1050)
        clicks.textIfExists('我知道了')
    }

    // 每日额外奖励
    clicks.xy(device.width / 2 - 100, device.height / 2 - 100)
    clicks.xy(device.width / 2 + 100, device.height / 2 - 100)
    clicks.xy(device.width - 100, device.height / 2 - 100)

    function gotoLevel1() {
        for (var i = 0; i < 300; i++) {
            swipe(500, 2000, 1900, 50, 300)
            sleep(500)
        }
    
        for (var i = 0; i < 1; i++) {
            // 第一关
            clicks.xy(device.width / 2 - 200, device.height / 2 + 100)
    
            // 开始
            clicks.xy(device.width / 2, device.height / 2 + 300)
            sleeps.s20to25()
    
            // 1: top to bottom
            var offsetWidth = device.width / 2 - 200;
            var offsetHeight = device.height / 2 + 100
            swipe(offsetWidth, offsetHeight, offsetWidth, offsetHeight + 100, 500)
            sleeps.s5to10()
    
            // 2: continue
            clicks.xy(device.width / 2, device.height / 2)
    
            // 3: left to right
            var offsetWidth = device.width / 2 + 0;
            var offsetHeight = device.height / 2 + 100
            swipe(offsetWidth, offsetHeight, offsetWidth + 100, offsetHeight, 500)
            sleeps.s5to10()
    
            // 4: top to bottom
            var offsetWidth = device.width / 2;
            var offsetHeight = device.height / 2 + 300
            swipe(offsetWidth, offsetHeight, offsetWidth, offsetHeight + 100, 500)
            sleeps.s5to10()
    
            clicks.textIfExists('我知道了')
    
            clicks.xy(device.width / 2, device.height / 2 + 400)
            sleeps.s10to20()
        }
    }
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
currentAPP.start = function () {
    for (var i = 0; i < 2; i++) {
        status0 = others.launch(currentAPP.PACKAGE_NAME)
        if (!status0) {
            return true
        }


        taskShop()
        taskShouJinBi()
        taskZhuanJinBi()
        status0 = taskLife()
        taskTBRS()
        taskXXX()
        taskBBNC()
        taskDDZ()
        taskCSJSF()

        if (status0) {
            return true
        }

        others.clear()
    }

    others.send(currentAPP.NAME)

    return false
}

module.exports = currentAPP
