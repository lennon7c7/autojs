/**
 * 所有脚本放一起调用
 */
cron();

baidu = require('module/baidu.js');
// baidu.start();

baiduhaokan = require('module/baiduhaokan.js');
// baiduhaokan.start();

baidutieba = require('module/baidutieba.js');
// baidutieba.start();

douyinhuoshan = require('module/douyinhuoshan.js');
douyinhuoshan.start();

douyinlite = require('module/douyinlite.js');
douyinlite.start();

fanqie = require('module/fanqie.js');
fanqie.start();

fanqiechangting = require('module/fanqiechangting.js');
fanqiechangting.start();

huohuoshipin = require('module/huohuoshipin.js');
huohuoshipin.start();

huoshan = require('module/huoshan.js');
huoshan.start();

jibubao = require('module/jibubao.js');
jibubao.start();

jingdonglite = require('module/jingdonglite.js');
jingdonglite.start();

jukandian = require('module/jukandian.js');
jukandian.start();

kaola = require('module/kaola.js');
kaola.start();

kuaishou = require('module/kuaishou.js');
kuaishou.start();

kuaiyin = require('module/kuaiyin.js');
kuaiyin.start();

kugoudaziban = require('module/kugoudaziban.js');
kugoudaziban.start();

mojitianqi = require('module/mojitianqi.js');
mojitianqi.start();

cron();

momo = require('module/momo.js');
momo.start();

pinduoduo = require('module/pinduoduo.js');
pinduoduo.start();

qqbrowser = require('module/qqbrowser.js');
qqbrowser.start();

qqreader = require('module/qqreader.js');
qqreader.start();

cron();

qutoutiao = require('module/qutoutiao.js');
qutoutiao.start();

shuqi = require('module/shuqi.js');
shuqi.start();

tianmao = require('module/tianmao.js');
tianmao.start();

taobao = require('module/taobao.js');
taobao.start();

tencentnews = require('module/tencentnews.js');
tencentnews.start();

tencentnow = require('module/tencentnow.js');
tencentnow.start();

toutiao = require('module/toutiao.js');
toutiao.start();

uc = require('module/uc.js');
// uc.start();

cron();

weishi = require('module/weishi.js');
weishi.start();

weixin = require('module/weixin.js');
weixin.start();

ximalaya = require('module/ximalaya.js');
ximalaya.start();

zhifubao = require('module/zhifubao.js');
zhifubao.start();

zhongqingkandian = require('module/zhongqingkandian.js');
zhongqingkandian.start();

// zuiqiangdaren = require('module/zuiqiangdaren.js');
// zuiqiangdaren.start();

function cron() {
    douyinhuoshan = require('module/douyinhuoshan.js');
    douyinhuoshan.cron();

    douyinlite = require('module/douyinlite.js');
    douyinlite.cron();

    fanqie = require('module/fanqie.js');
    fanqie.cron();

    fanqiechangting = require('module/fanqiechangting.js');
    fanqiechangting.cron();

    huoshan = require('module/huoshan.js');
    huoshan.cron();

    qqreader = require('module/qqreader.js');
    qqreader.cron();

    toutiao = require('module/toutiao.js');
    toutiao.cron();

    zhongqingkandian = require('module/zhongqingkandian.js');
    zhongqingkandian.cron();
}
