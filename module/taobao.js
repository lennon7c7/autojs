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
    app.startActivity({ data: MP_URL })
    sleeps.s10()

    if (!className('android.widget.Button').depth(13).indexInParent(0).findOne(3000)) {
        return false
    }
    className('android.widget.Button').depth(13).indexInParent(0).findOne(3000).click()
    sleeps.s3()

    clicks.textIfExists('收金币')
    clicks.textIfExists('助力Ta')
    others.back()
}

// 任务-赚金币
function taskZhuanJinBi() {
     // 淘宝 - 金币小镇
     MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Ftmtjb%2Ftown%2Fhome%3Fwh_biz%3Dtm%26disableNav%3DYES%26hd_from%3Dalipayjf%26remind%3Dtrue&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndb5fbc2_1641359630456&slk_t=1641359630900&afcPromotionOpen=false&source=slk_dp'
     app.startActivity({ data: MP_URL })
     sleeps.s10()
 
    if (!clicks.element(className('android.widget.Button').depth(11).indexInParent(3))) {
        return false
    }

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
    app.startActivity({ data: MP_URL })
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
    app.startActivity({ data: MP_URL })
    sleeps.s10()

    if (!className('android.widget.Button').depth(12).indexInParent(0).findOne(3000)) {
        return false
    }
    className('android.widget.Button').depth(12).indexInParent(0).findOne(3000).click()
    sleeps.s3()

    desc('逛10秒+10').find().forEach((value1, key1) => {
        if (!exists.backToElement(desc('金币好店')) || !value1.parent()) {
            return
        }

        value1.parent().click()
        sleeps.s15to20()

        if (text('关注+10').exists()) {
            clicks.centerXyByText('关注+10')
        }

        if (text('立即领5淘金币').exists()) {
            clicks.textIfExists('立即领5淘金币')
            exists.backToElement(text('浏览送金币'))
        }
    })

    if (desc('已完成').find().size() > 6) {
        return true
    }

    return false
}

// 任务-帮好友
function taskHelpFriend() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    // 淘宝 - 金币小镇
    MP_URL = 'tbopen://m.taobao.com/tbopen/index.html?h5Url=https%3A%2F%2Fpages.tmall.com%2Fwow%2Fz%2Ftmtjb%2Ftown%2Fhome%3Fwh_biz%3Dtm%26disableNav%3DYES%26hd_from%3Dalipayjf%26remind%3Dtrue&action=ali.open.nav&module=h5&bootImage=0&slk_sid=rndb5fbc2_1641359630456&slk_t=1641359630900&afcPromotionOpen=false&source=slk_dp'
    app.startActivity({ data: MP_URL })
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
    app.startActivity({ data: MP_URL })
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


        taskShop()
        taskShouJinBi()
        taskZhuanJinBi()
        status0 = taskLife()

        if (status0) {
            return true
        }

        others.clear()
    }

    others.send(currentAPP.NAME)

    return false
}

module.exports = currentAPP
