var clicks = require('function/clicks.js');
var exists = require('function/exists.js');
var others = require('function/others.js');
var sleeps = require('function/sleeps.js');
var swipes = require('function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.UCMobile';

main();

function main() {
    others.fixDir();
    others.fixDir();

    qqreader = require('module/qqreader.js');
    qqreader.start();
    }