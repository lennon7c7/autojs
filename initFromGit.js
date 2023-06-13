/**
 * 初始化代码
 * 从 git 到 手机，不经过PC
 */
main()

/**
 * 入口
 */
function main() {
    toastLog('---------- start ----------')

    // step1: 获取git代码
    var codeList = httpGet()

    // step2: 写入手机端，会强行覆盖文件
    var isOk = overWriteFile(codeList)
    if (!isOk) {
        toastLog('shit happen')
    }

    toastLog('---------- end ----------')
}

/**
 * 获取文件
 * @returns {array} 代码内容列表
 */
function httpGet() {
    var returnList = []

    var masterUrl = 'https://gitee.com/api/v5/repos/lennon7c7/autojs/git/trees/master'
    var masterContent = http.get(masterUrl).body.json()
    if (!masterContent) {
        toastLog(masterUrl + ': !masterContent')
        return
    }

    var rawUrlPrefix = 'https://gitee.com/lennon7c7/autojs/raw/master/'
    var ignoreFile = ['apk', '.gitignore', 'README.md', 'action-all.js', 'action-every-20-min.js', 'action-temp.js', 'test-click.js', 'test-exists.js', 'test-swipe.js']
    masterContent.tree.forEach((value1) => {
        // 有些文件真的需要过滤
        if (ignoreFile.indexOf(value1.path) !== -1) {
            return
        }

        if (value1.type === 'tree') {
            // 文件夹目录
            var treeContent = http.get(value1.url).body.json()
            if (!treeContent) {
                toastLog(value1.url + ': !treeContent')
                return
            }

            treeContent.tree.forEach((value2) => {
                var path = value1.path + '/' + value2.path
                var url = rawUrlPrefix + path
                var content = http.get(url).body.string()
                if (!content) {
                    toastLog(value2.path + ': !content')
                    return
                }

                returnList.push({
                    'path': path,
                    'content': content,
                })

                toastLog('http.get: ' + url)
            })
        } else {
            // 文件
            var url = rawUrlPrefix + value1.path
            var content = http.get(url).body.string()
            if (!content) {
                toastLog(value1.path + ': !content')
                return
            }

            returnList.push({
                'path': value1.path,
                'content': content,
            })

            toastLog('http.get: ' + url)
        }
    })

    return returnList
}

/**
 * 写入手机端，会强行覆盖文件
 */
function overWriteFile(codeList) {
    var isOk = false

    codeList.forEach((value1) => {
        isOk = files.ensureDir(value1.path)
        if (!isOk) {
            toastLog(value1.path + ': !isOk')
            return
        }

        files.write(value1.path, value1.content)
    })

    return isOk
}
