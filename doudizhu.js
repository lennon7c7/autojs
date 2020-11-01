/**
 * 斗地主
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.douzigame.verddz';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    clicks.xy(950, 500);
  
    clicks.xy(550, 1750);
    sleeps.s35to40();
    clicks.centerXyById('tt_video_ad_close_layout');

    for (var i = 0; i < 5; i++) {
        clicks.xy(1000, 1300);
        clicks.xy(540, 1540);

        clicks.xy(48, 162);
        sleeps.s35to40();
        clicks.centerXyById('tt_video_ad_close_layout');
    
        sleeps.s3();
        clicks.xy(500, 1200);
    }
}
