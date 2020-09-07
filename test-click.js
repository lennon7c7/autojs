var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

main();

function main() {

    var buttonClickTask = className("android.view.View").text("看视频赚海量金币");
    if (!buttonClickTask.exists()) {
        console.log("---------- task ad nothing ----------");
        return false;
    }
    console.log("---------- click ad ----------");
    clicks.findOne(buttonClickTask)
}
