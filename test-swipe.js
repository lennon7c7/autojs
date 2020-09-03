var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');

main();

function main() {

    while (true) {
        // swipes.right200();

        swipe(900, 300, 100, 300, 500);
        sleep(1 * 1000)
    
    }
}