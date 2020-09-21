/**
 * 游戏-率土之滨
*/
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.netease.stzb.netease';

main();

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    // swipe to game
    clicks.xy(1050, 850);
    sleeps.s3();
    // login
    clicks.xy(1050, 850);
    clicks.xy(1050, 850);
    sleeps.s15to20();
    clicks.xy(2200, 50);
    clicks.xy(2200, 50);
    clicks.xy(2200, 50);

    task();

    others.exit();
}

// 任务
function task() {
    taskCallHero();
    taskPk();

    return true;
}

// 任务-演武
function taskPk() {
    clicks.xy(1600, 1000);
    clicks.xy(1500, 700);
    clicks.xy(1300, 1000);
    clicks.xy(1150, 600);

    clicks.xy(1150, 800);
    clicks.xy(1150, 900);
    clicks.xy(2200, 600);

    clicks.xy(1150, 600);
    clicks.xy(1150, 900);
    clicks.xy(2200, 600);

    clicks.xy(1150, 500);
    clicks.xy(1150, 900);
    clicks.xy(2200, 600);

    clicks.xy(1150, 300);
    clicks.xy(1150, 900);
    clicks.xy(2200, 600);

    clicks.xy(900, 500);
    clicks.xy(1150, 900);
    clicks.xy(2200, 600);

    clicks.xy(900, 600);
    clicks.xy(1150, 900);
    clicks.xy(2200, 600);

    clicks.xy(1400, 600);
    clicks.xy(1150, 900);
    clicks.xy(2200, 600);

    clicks.xy(1400, 450);
    clicks.xy(1150, 900);
    clicks.xy(2200, 600);

    clicks.xy(2200, 50);
    clicks.xy(2200, 50);
    clicks.xy(2200, 50);
}

// 任务-招募
function taskCallHero() {
    clicks.xy(1900, 950);

    for (var i = 0; i < 2; i++) {
        clicks.xy(450, 550);
        clicks.xy(750, 550);
        clicks.xy(2200, 600);
        clicks.xy(2200, 50);
    }

    for (var i = 0; i < 9; i++) {
        clicks.xy(1050, 700);
        clicks.xy(1400, 700);
        clicks.xy(2200, 600);
        clicks.xy(2200, 50);
    }
    clicks.xy(2200, 50);
    clicks.xy(2200, 50);
    clicks.xy(2200, 50);
}
