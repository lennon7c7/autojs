var sleeps = require('sleep.js');
var swipes = require('swipe.js');

var w = floaty.rawWindow(
    <frame gravity="center" bg="#77ff0000">
        <text id="text" textSize='33sp' >text</text>
    </frame>
);
w.setSize(90, 90);


// click(337, 1776);
w.setPosition(25, 840);
// sleeps.s1();
// w.setPosition(500, 500);
// sleeps.s1();

sleeps.s10();

while (false) {
    var x = 25,
        xAdd = 104;
    var y = 840,
        yAdd = 104;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            w.setPosition(x + xAdd * j, y + yAdd * i);
            sleep(100);
        }
    }
}
