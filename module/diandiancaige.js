/**
 * 点点猜歌-任务
 * 当前存在问题
 * 1. 刷到3000多首的时候就没有歌曲，不知道是我被黑还是数据库只有很少的歌曲
 */
var clicks = require('../function/clicks.js')
var exists = require('../function/exists.js')
var others = require('../function/others.js')
var sleeps = require('../function/sleeps.js')
var swipes = require('../function/swipes.js')

currentAPP = {}
currentAPP.PACKAGE_NAME = 'com.red.answer'
currentAPP.NAME = getAppName(currentAPP.PACKAGE_NAME)

/**
 * 任务-回答
 */
function taskAnswer() {
    clicks.centerXyByText('取消')

    for (var i = 0; i < 1200; i++) {
        if (id('recycler_question').find().size() > 0) {
            id('recycler_question').findOne().children().forEach((value, key) => {
                if (key === random(0, 2)) {
                    target = value.findOne(id('tv_answer'))
                    if (target != null && click(text(target.text()).findOne().bounds().centerX(), text(target.text()).findOne().bounds().centerY())) {
                        sleeps.s5to10()
                        return true
                    }
                }
            })
        }

        if (text('防沉迷提示：奖励减少，明天将恢复正常奖励哦').exists()) {
            others.exit()
        }

        if (id('tv_get_reward').exists()) {
            clicks.centerXyById('tv_get_reward')
        }
        if (text('领奖，开始下一首').exists()) {
            clicks.centerXyByText('领奖，开始下一首')
        }

        if (id('tv_next_music').exists()) {
            clicks.centerXyById('tv_next_music')
        }
        if (text('下一首').exists()) {
            clicks.centerXyByText('下一首')
        }
        if (text('下一首，继续赚钱').exists()) {
            clicks.centerXyByText('下一首，继续赚钱')
        }

        if (!id('tv_question_title').exists()) {
            sleeps.s60to70()
            others.back()
        }

        if (id('tt_video_ad_close_layout').exists()) {
            clicks.centerXyById('tt_video_ad_close_layout')
        }

        sleeps.s2to3()
    }

    return false
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


        status = taskAnswer()

        if (status) {
            return true
        }
    }

    others.send(currentAPP.NAME)

    return false
}

module.exports = currentAPP
