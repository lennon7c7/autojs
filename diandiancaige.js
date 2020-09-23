/**
 * 点点猜歌
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.red.answer';

others.launch(PACKAGE_NAME);

clicks.text('取消');

for (var i = 0; i < 120000; i++) {
    random = sleeps.getRandom(1, 4) - 1;

    if (id('recycler_question').find().size() > 0) {
        id('recycler_question').findOne().children().forEach((value, key) => {
            if (key == random) {
                target = value.findOne(id('tv_answer'));
                if (click(text(target.text()).findOne().bounds().centerX(), text(target.text()).findOne().bounds().centerY())) {
                    sleeps.s5to10();
                    return true;
                }
            }
        });
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
}

others.exit();
