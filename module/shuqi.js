/**
 * 书旗免费小说-任务
 */
var clicks = require('../function/clicks.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.shuqi.controller';

// 任务-Ad
function taskAd() {
    log('---------- taskAd start ----------');

    others.back2();

    if (!clicks.centerXyByText('福利')) {
        return false;
    }

    if (text('明日继续领金币').exists()) {
        return true;
    }

    for (var i = 0; i < 20; i++) {
        if (clicks.textIfExists('快速得百万金币')) {
            sleeps.s35to40();
            clicks.xy(924, 162);
        }
    }
    
    if (text('明日继续领金币').exists()) {
        return true;
    }

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 3; i++) {
        others.launch(s.PACKAGE_NAME);

        status0 = taskAd();

        if (status0) {
            return true;
        }
    }

    others.send('shuqi');

    return false;
};

module.exports = s;
