/**
 * 初始化代码
 * 从 PC端 到 手机端
 */
main();

/**
 * 入口
 */
function main() {
    toastLog('---------- start ----------');

    // step1: 手机连接PC

    // step2: 手动开启文件服务，下面是php的例子
    // php -S 192.168.25.222:9999

    // step3: 配置同步的文件
    var fileList = configHttp();

    // step4: 获取文件
    var codeList = httpGet(fileList);

    // step5: 写入手机端，会强行覆盖文件
    var isOk = overWriteFile(codeList);
    if (!isOk) {
        toastLog('shit happen');
    }

    toastLog('---------- end ----------');
}

/**
 * 配置同步的文件
 * @returns {array} 代码内容列表
 */
function configHttp() {
    var returnList = [];

    domain = 'http://192.168.25.222:9999/';
    filenameList = [
        'function/clicks.js', 'function/debugs.js', 'function/exists.js', 'function/others.js', 'function/sleeps.js', 'function/swipes.js',

        'module/baidu.js', 'module/baiduhaokan.js', 'module/baidutieba.js',
        'module/diandiancaige.js', 'module/douyin.js', 'module/douyinlite.js', 'module/douyinhuoshan.js',
        'module/fanqie.js', 'module/fanqiechangting.js',
        'module/huohuoshipin.js', 'module/huoshan.js',
        'module/jibubao.js', 'module/jingdonglite.js', 'module/jukandian.js',
        'module/kaola.js', 'module/kuaikandian.js', 'module/kuaishou.js', 'module/kuaiyin.js', 'module/kugoudaziban.js',
        'module/mojitianqi.js', 'module/momo.js',
        'module/oupenglite.js', 'module/pinduoduo.js',
        'module/qqbrowser.js', 'module/qqreader.js', 'module/qutoutiao.js', 'module/shuqi.js', 'module/tianmao.js',
        'module/taobao.js', 'module/taobaolive.js', 'module/tencentnews.js', 'module/tencentnow.js', 'module/toutiao.js',
        'module/uc.js',
        'module/weishi.js', 'module/weixin.js', 'module/ximalaya.js', 'module/zhifubao.js', 'module/zhongqingkandian.js', 'module/zuiqiangdaren.js',

        'action-all.js', 'action-every-20-min.js', 'test-swipe.js',
    ];

    filenameList.forEach((value, key) => {
        returnList[key] = {
            'url': domain + value,
            'path': files.cwd() + '/' + value,
        }
    });

    return returnList;
}

/**
 * 获取文件
 * @returns {array} 代码内容列表
 */
function httpGet(fileList) {
    var returnList = [];

    fileList.forEach((value, key) => {
        var content = http.get(value.url).body.string();
        if (!content) {
            toastLog('!content');
            return;
        }

        returnList[key] = {
            'path': value.path,
            'content': content,
        }
    });

    return returnList;
}

/**
 * 写入手机端，会强行覆盖文件
 */
function overWriteFile(codeList) {
    var isOk = false;

    codeList.forEach((value) => {
        isOk = files.ensureDir(value.path);
        if (!isOk) {
            toastLog('!isOk');
            return;
        }

        files.write(value.path, value.content);
    });

    return isOk;
}
