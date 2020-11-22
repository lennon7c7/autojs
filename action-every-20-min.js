/**
 * 每20分钟调用一次
 */
main();

setInterval(function () {
    main();
}, 1200 * 1000);

function main() {
    douyinlite = require('module/douyinlite.js');
    douyinlite.cron();

    fanqie = require('module/fanqie.js');
    fanqie.cron();

    huoshan = require('module/huoshan.js');
    huoshan.cron();

    toutiao = require('module/toutiao.js');
    toutiao.cron();
}
