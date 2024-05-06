var clicks = require('./function/clicks.js')
var exists = require('./function/exists.js')
var others = require('./function/others.js')
var sleeps = require('./function/sleeps.js')
var swipes = require('./function/swipes.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.shuqi.controller'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)
currentAPP.VERSION = ''
currentAPP.APK = ''

main()

function main() {
    others.fixDir()
    others.fixDir()

    log('---------- start ----------')

    // taskText()
    taskXy()

    log('---------- end ----------')
}

function taskXy() {
    for (var i = 0; i < 50000000; i++) {
        log(i)

        // 捐一笔
        clicks.xy(device.width - 100, device.height - 100)

        // 我已知情
        clicks.xy(device.width / 2 + 200, device.height / 2 + 600)

        clicks.xy(device.width / 2, device.height - 400)

        longClick(device.width / 2, device.height / 2)
        sleeps.s1()
        clicks.xy(device.width / 2, device.height / 2 - 100)

        clicks.xy(device.width / 2, device.height / 2 + 300)
        sleeps.s5()

        clicks.textIfExists('Confirm Payment')

        // 输入密码
        password = '123456789'
        if (text(password).exists()) {
            text(password).click()
            sleep(50)
        }
        password = '123456789'
        if (text(password).exists()) {
            text(password).click()
            sleep(50)
        }
        password = '123456789'
        if (text(password).exists()) {
            text(password).click()
            sleep(50)
        }
        password = '123456789'
        if (text(password).exists()) {
            text(password).click()
            sleep(50)
        }
        password = '123456789'
        if (text(password).exists()) {
            text(password).click()
            sleep(50)
        }
        password = '123456789'
        if (text(password).exists()) {
            text(password).click()
            sleep(50)
        }
        sleeps.s5()

        others.back()
        sleeps.s5()
        sleeps.s1()

        // 返回项目
        clicks.xy(device.width / 2 - 120, device.height / 2 + 720)
        sleeps.s5()
    }
}

function taskText() {
    clicks.textIfExists('捐一笔')
    clicks.textIfExists('自定义金额')

    setText('0.01')
    sleeps.s2to3()

    clicks.textIfExists('确认支付 0.01 元')

    clicks.textIfExists('123456789')
    clicks.textIfExists('123456789')
    clicks.textIfExists('123456789')
    clicks.textIfExists('123456789')
    clicks.textIfExists('123456789')
    clicks.textIfExists('123456789')
}
