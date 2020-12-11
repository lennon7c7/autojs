/**
 * 每20分钟调用一次
 */
main();

setInterval(function () {
    main();
}, 1200 * 1000);

function main() {
    douyinhuoshan = require('module/douyinhuoshan.js');
    douyinhuoshan.cron();

    douyinlite = require('module/douyinlite.js');
    douyinlite.cron();

    fanqie = require('module/fanqie.js');
    fanqie.cron();

    huoshan = require('module/huoshan.js');
    huoshan.cron();

    qqreader = require('module/qqreader.js');
    qqreader.cron();

    toutiao = require('module/toutiao.js');
    toutiao.cron();

    uc = require('module/uc.js');
    uc.cron();
}
