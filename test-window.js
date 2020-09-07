/**
 * 临时测试某些功能
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

var w = floaty.rawWindow(
    <frame gravity="center" bg="#77ff0000">
        <text id="text" textSize='66sp' >悬浮文字</text>
    </frame>
);
w.setSize(1, 1);


// launchApp("快手极速版");
// sleeps.s1();

w.setPosition(0, 0);
w.setPosition(750 + 100, 1860 + 70);
// w.setPosition(50, 2000);
// sleeps.s1();
// w.setPosition(500, 500);
// sleeps.s1();

sleeps.s10();
