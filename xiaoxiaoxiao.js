/**
 * 爱上消消消
 * 当前存在问题
 * 1. 某些点击失效
 * 2. 无法判断是否处于广告状态
 * 3. 无法判断是否处于游戏完成
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

while (true) {
    var x = 25,
        xAdd = 104;
    var y = 840,
        yAdd = 104;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            // log('i=', i, ' j=', j, ' x=', x + xAdd * j, ' y=', y + yAdd * i);
            click(x + xAdd * j, y + yAdd * i);
            sleep(10);
        }
    }
}
