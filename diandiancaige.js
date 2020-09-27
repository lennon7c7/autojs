/**
 * 点点猜歌
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.red.answer';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    status0 = taskAnswer();

    if (status0) {
        others.exit();
    }
}

/**
 * 任务-回答
 */
function taskAnswer() {
    clicks.text('取消');

    for (var i = 0; i < 12000; i++) {
        if (id('recycler_question').find().size() > 0) {
            id('recycler_question').findOne().children().forEach((value, key) => {
                if (key == random(0, 2)) {
                    target = value.findOne(id('tv_answer'));
                    if (target != null && click(text(target.text()).findOne().bounds().centerX(), text(target.text()).findOne().bounds().centerY())) {
                        sleeps.s5to10();
                        return true;
                    }
                }
            });
        }

        if (text('防沉迷提示：奖励减少，明天将恢复正常奖励哦').exists()) {
            others.exit();
        }

        if (id('tv_get_reward').exists()) {
            clicks.id('tv_get_reward');
        }
        if (text('领奖，开始下一首').exists()) {
            clicks.text('领奖，开始下一首');
        }

        if (id('tv_next_music').exists()) {
            clicks.id('tv_next_music');
        }
        if (text('下一首').exists()) {
            clicks.text('下一首');
        }
        if (text('下一首，继续赚钱').exists()) {
            clicks.text('下一首，继续赚钱');
        }

        if (!id('tv_question_title').exists()) {
            sleeps.s60to70();
            others.back();
        }

        if (id('tt_video_ad_close_layout').exists()) {
            clicks.id('tt_video_ad_close_layout');
        }

        sleeps.s2to3();
    }
 
    return false;
}
