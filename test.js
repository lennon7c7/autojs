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


launchApp("快手极速版");
sleeps.s1();

// click(59, 1233);
// swipe(500, 1600, 500, 600, 500);

// swipe(100, 2000, 400, 100, 100);

while (true) {
    // swipes.refresh();
    //     swipes.down1600();
    //     sleeps.s10to20();

    if (id("left_btn").exists()) {
        clicks.findOne(id("left_btn"));

        swipes.return();
    }


    sleeps.s3();
}

// w.setSize(100, 100);
// w.setPosition(0 + 50, 1036 - 50 );



// var buttonRedFloat = id("redFloat");
// if (buttonRedFloat.exists()) {
//     var rect = buttonRedFloat.findOne().bounds();
//     console.log(buttonRedFloat.findOne().bounds());
//     console.log('left: ', buttonRedFloat.findOne().bounds().left);
//     console.log('right: ', buttonRedFloat.findOne().bounds().right);
//     console.log('top: ', buttonRedFloat.findOne().bounds().top);
//     console.log('bottom: ', buttonRedFloat.findOne().bounds().bottom);
    // 23:43:31.646/D: Rect(0, 1036 - 228, 1264)
    // 23:43:31.668/D: left:  0
    // 23:43:31.698/D: right:  228
    // 23:43:31.734/D: top:  1036
    // 23:43:31.765/D: bottom:  1264
    // id("redFloat").findOne().click();
    // click(left, top, bottom, right)
    // click(rect.left + 50, rect.top - 50);
    // press(rect.left + 50, rect.top - 50, 1);

    // click(0 + 50, 1036 - 50);
// }

// click(50, 1150);
// press(50, 1150, 1);

// sleeps.s5();



