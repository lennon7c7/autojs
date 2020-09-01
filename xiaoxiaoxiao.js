/**
 * 爱上消消消
 * 当前存在问题
 * 1. 某些点击失效
 * 2. 无法判断是否处于广告状态
 * 3. 无法判断是否处于游戏完成
 */
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

var w = floaty.rawWindow(
    <frame gravity="center" bg="#77ff0000">
        <text id="text" textSize='33sp' >text</text>
    </frame>
);
w.setSize(90, 90);

while (true) {
    var x = 25,
        xAdd = 104;
    var y = 840,
        yAdd = 104;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            // console.log("i=", i, " j=", j, " x=", x + xAdd * j, " y=", y + yAdd * i);
            click(x + xAdd * j, y + yAdd * i);
            sleep(10);
            // w.setPosition(x + xAdd * j, y + yAdd * i);

            // var buttonAdClose = className("android.widget.ImageView");
            // if (buttonAdClose.exists()) {
            //     buttonAdClose.findOne().click();
            //     sleeps.s60();
            // }
        }
    }
}
