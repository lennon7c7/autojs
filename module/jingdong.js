/**
 * 京东-任务
 */
var clicks = require('../function/clicks.js')
var others = require('../function/others.js')
var sleeps = require('../function/sleeps.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.jingdong.app.mall'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)
currentAPP.VERSION = '9.4.6'
currentAPP.APK = 'https://android-apps.pp.cn/fs08/2021/04/06/7/120_da18100cae7d790437e6bb03be0a99d7.apk'

// 任务-升级赚京豆
function taskSJZJD() {
    log('----------', currentAPP.NAME, arguments.callee.name, 'start ----------')

    others.clear()
    others.launch(currentAPP.PACKAGE_NAME)

    if (!clicks.textParent('领京豆')) {
        return false
    }
    sleeps.s15()

    clicks.xy(700, 1320)
    sleeps.s10to20()

    if (text('点击东东农场入口(0/1)').exists() && clicks.centerXyByText('点击东东农场入口(0/1)')) {
        sleeps.s10to20()
        clicks.centerXyByText('免费水果')
        sleeps.s5()
        clicks.centerXyByText('去领取')
        clicks.centerXyByText('收下水滴')

        others.back()
        if (!clicks.textParent('领京豆')) {
            return false
        }
        sleeps.s15()

        clicks.xy(700, 1320)
        sleeps.s5()
    }

    for (var i = 0; i < 50; i++) {
        if (text('去完成').exists() && clicks.centerXyByText('去完成')) {
            sleeps.s15to20()
            others.backToElement(text('做任务再升一级可额外得'))
        }
    }

    return true
}

// 金融双签
function stepCheckinJR() {
	others.clear()
	URL_OLD = 'https://m1.jr.jd.com/integrate/signin/index.html'
	MP_URL = 'openApp.jdMobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22sourceValue%22%3A%22babel-act%22%2C%22sourceType%22%3A%22babel%22%2C%22M_sourceFrom%22%3A%22h5auto%22%2C%22msf_type%22%3A%22auto%22%2C%22url%22%3A%22' + encodeURIComponent(URL_OLD) + '%22%7D%0A'
	app.startActivity({ data: MP_URL })
	sleeps.s20to25()
	clicks.textIfExists('签到领金贴')

	if (clicks.textIfExists('去签到')) {
		sleeps.s15to20()
	}

	others.clear()
	URL_OLD = 'https://m1.jr.jd.com/integrate/signin/index.html'
	MP_URL = 'openApp.jdMobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22sourceValue%22%3A%22babel-act%22%2C%22sourceType%22%3A%22babel%22%2C%22M_sourceFrom%22%3A%22h5auto%22%2C%22msf_type%22%3A%22auto%22%2C%22url%22%3A%22' + encodeURIComponent(URL_OLD) + '%22%7D%0A'
	app.startActivity({ data: MP_URL })
	sleeps.s15to20()
	if (clicks.textIfExists('去签到')) {
		sleeps.s15to20()
		clicks.centerXyByText('签到领京豆')
	}

	others.clear()
	URL_OLD = 'https://m1.jr.jd.com/integrate/signin/index.html'
	MP_URL = 'openApp.jdMobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22sourceValue%22%3A%22babel-act%22%2C%22sourceType%22%3A%22babel%22%2C%22M_sourceFrom%22%3A%22h5auto%22%2C%22msf_type%22%3A%22auto%22%2C%22url%22%3A%22' + encodeURIComponent(URL_OLD) + '%22%7D%0A'
	app.startActivity({ data: MP_URL })
	sleeps.s15to20()
	clicks.textIfExists('点击领奖')
}

// 京喜双签
function stepCheckinJX() {
    others.clear()
    URL_OLD = 'https://m1.jr.jd.com/integrate/signin/index.html'
    MP_URL = 'openApp.jdMobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22sourceValue%22%3A%22babel-act%22%2C%22sourceType%22%3A%22babel%22%2C%22M_sourceFrom%22%3A%22h5auto%22%2C%22msf_type%22%3A%22auto%22%2C%22url%22%3A%22' + encodeURIComponent(URL_OLD) + '%22%7D%0A'
    app.startActivity({ data: MP_URL })
    sleeps.s10()
    others.back()
    sleeps.s10()
}

// 抽京豆
function stepCJD() {
    others.clear()
    MP_URL = 'openapp.jdmobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22sourceValue%22%3A%22babel-act%22%2C%22sourceType%22%3A%22babel%22%2C%22url%22%3A%22https%3A%2F%2Fpro.m.jd.com%2Fmall%2Factive%2F2xoBJwC5D1Q3okksMUFHcJQhFq8j%2Findex.html%3F_ts%3D1654147266550%26utm_user%3Dplusmember%26ad_od%3Dshare%26utm_source%3Dandroidapp%26utm_medium%3Dappshare%26utm_campaign%3Dt_335139774%26utm_term%3DWxfriends%26_openapp%3D1%22%2C%22M_sourceFrom%22%3A%22h5auto%22%2C%22msf_type%22%3A%22adshare%22%2C%22m_param%22%3A%7B%22YINLIUhuanqi%22%3A%22https%3A%2F%2Fpro.m.jd.com%2Fmall%2Factive%2F2xoBJwC5D1Q3okksMUFHcJQhFq8j%2Findex.html%3F_ts%3D1654147266550%26utm_user%3Dplusmember%26ad_od%3Dshare%26utm_source%3Dandroidapp%26utm_medium%3Dappshare%26utm_campaign%3Dt_335139774%26utm_term%3DWxfriends%22%2C%22toappactive%22%3A%221%22%7D%2C%22SE%22%3A%7B%22mt_subsite%22%3A%22%22%2C%22__jdv%22%3A%22122270672%7Candroidapp%7Ct_335139774%7Cappshare%7CQQfriends%7C1653368936533%22%2C%22unpl%22%3A%22%22%2C%22__jda%22%3A%22122270672.1653368792937365289666.1653368792.1653368792.1653368792.1%22%7D%7D'
    app.startActivity({ data: MP_URL })
    sleeps.s10()
    clicks.xy(300, 550)
    sleeps.s10()
}

// 摇京豆
function stepYJD() {
    others.clear()
    URL_OLD = 'https://spa.jd.com/home?source=JingDou&_t=1639646715&lng=108.311635&lat=22.792222&sid=3a9d76979373f3f73facff7568ea487w&un_area=13_1072_28930_29011&_ts=1654147963642&utm_user=plusmember&ad_od=share&utm_source=androidapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=QRCode'
    MP_URL = 'openApp.jdMobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22des%22%3A%22m%22%2C%22sourceValue%22%3A%22babel-act%22%2C%22sourceType%22%3A%22babel%22%2C%22M_sourceFrom%22%3A%22h5auto%22%2C%22msf_type%22%3A%22auto%22%2C%22url%22%3A%22' + encodeURIComponent(URL_OLD) + '%22%7D%0A'
    app.startActivity({ data: MP_URL })
    sleeps.s10()
    clicks.textIfExists('立即签到 领京豆')
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
			
		clicks.centerXyByText('免费水果')
		sleeps.s10to20()
		clicks.textIfExists('去签到')
		others.back()

        stepCheckinJR()
        stepCJD()
        stepYJD()
        taskSJZJD()

        others.clear()
    }

    others.send(currentAPP.NAME)

    return false
}

module.exports = currentAPP
