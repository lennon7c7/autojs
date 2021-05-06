/**
 * 初始化代码
 * 从 git 到 手机，不经过PC
 */
main();

/**
 * 入口
 */
function main() {
    toastLog('---------- start ----------');

    // step1: 获取git代码
    var codeList = httpGet();

    // step2: 写入手机端，会强行覆盖文件
    var isOk = overWriteFile(codeList);
    if (!isOk) {
        toastLog('shit happen');
    }

    toastLog('---------- end ----------');
}

/**
 * 获取文件
 * @returns {array} 代码内容列表
 */
function httpGet() {
    var returnList = [];

    var url = 'https://gitee.com/api/v5/repos/lennon7/autojs/git/trees/master';
    var content = http.get(url).body.json();
    if (!content) {
        toastLog(url + ': !content');
        return;
    }

    var rawUrlPrefix = 'https://gitee.com/lennon7/autojs/raw/master/';
    var ignoreFile = ['apk', '.gitignore', 'README.md', 'action-all.js', 'action-every-20-min.js', 'action-temp.js', 'test-click.js', 'test-exists.js', 'test-swipe.js'];
    content.tree.forEach((value1, key1) => {
        // 有些文件真的需要过滤
        if (ignoreFile.indexOf(value1.path) !== -1) {
            return;
        }

        if (value1.type === 'tree') {
            // 文件夹目录
            var url = value1.url;
            var content = http.get(url).body.json();
            if (!content) {
                toastLog(url + ': !content');
                return;
            }

            content.tree.forEach((value2, key2) => {
                var path = value1.path + '/' + value2.path
                var url = rawUrlPrefix + path;
                var content = http.get(url).body.string();
                if (!content) {
                    toastLog(value2.path + ': !content');
                    return;
                }

                returnList[key1 + key2] = {
                    'path': path,
                    'content': content,
                }

                toastLog('http.get: ' + url);

                // 防止请求速度过快，触发风控被404
                sleep(random(3, 5) * 1000);
            });
        } else {
            // 文件
            var url = rawUrlPrefix + value1.path;
            var content = http.get(url).body.string();
            if (!content) {
                toastLog(value1.path + ': !content');
                return;
            }

            returnList[key1] = {
                'path': value1.path,
                'content': content,
            }
        }

        toastLog('http.get: ' + url);

        // 防止请求速度过快，触发风控被404
        sleep(random(3, 5) * 1000);
    });

    return returnList;
}

/**
 * 写入手机端，会强行覆盖文件
 */
function overWriteFile(codeList) {
    var isOk = false;

    codeList.forEach((value1) => {
        isOk = files.ensureDir(value1.path);
        if (!isOk) {
            toastLog(value1.path + ': !isOk');
            return;
        }

        files.write(value1.path, value1.content);
    });

    return isOk;
}
