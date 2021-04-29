/**
 * 功能集合-调试代码
 */
var clicks = require('./clicks.js');
var exists = require('./exists.js');
var others = require('./others.js');
var sleeps = require('./sleeps.js');
var swipes = require('./swipes.js');
var debugs = {};

/**
 * 获取指定应用、或者当前应用的版本号
 * @param {string} packageName 应用包名
 * @returns {string} 版本号
 */
debugs.getPackageVersion = function (packageName) {
    if (!packageName) {
        if (typeof currentAPP !== 'undefined' && currentAPP.PACKAGE_NAME) {
            packageName = currentAPP.PACKAGE_NAME;
        } else {
            return '';
        }
    }

    importPackage(android.content);
    var pckMan = context.getPackageManager();
    var packageInfo = pckMan.getPackageInfo(packageName, 0);

    return packageInfo.versionName;
}

/**
 * 获取主目录上的某文件内容
 * @param {string} path 相对文件路径，比如：module/pinduoduo、test-others
 * @returns {string}
 */
debugs.getJsFileContent = function (path) {
    filename = files.cwd() + '/' + path + '.js';

    if (!files.exists(filename)) {
        toastLog('shit happen');
        return '';
    }

    return files.read(filename);
}

/**
 * 获取主目录上的所有文件名
 * @param {string} dirName 相对文件路径，比如：module、function
 * @returns {string}
 */
debugs.getListDir = function (dirName) {
    var sourceDir = files.cwd() + '/' + dirName;
    var sourceFile = files.listDir(sourceDir, function (name) {
        return name.endsWith('.js') && files.isFile(files.join(sourceDir, name));
    });

    var list = '';
    sourceFile.forEach((value) => {
        list += value + '\n';
    });

    return list;
}

/**
 * 打印所有元素
 */
debugs.printElementTreeAll = function () {
    var output = '\n\n';
    output += '------------------------------------------------------------------------------------------\n';

    function printElement(element, level) {
        var spaceCount = '';
        for (var i = 0; i < level; i++) {
            spaceCount += ' ';
        }

        element.children().forEach((value, key) => {
            output += (spaceCount + debugs.getElementAttr(value) + '\n');

            printElement(value, level + 1);
        });
    }

    printElement(debugs.getElementTop(className('android.widget.FrameLayout').findOne(3000)), 0);
    output += '------------------------------------------------------------------------------------------\n';
    log(output);
}

/**
 * 递归遍历获取第一级元素
 * @param {string} element 父元素
 * @return {string} 第一级元素
 */
debugs.getElementTop = function (element) {
    if (element && element.parent() && element.parent()) {
        return getElementTop(element.parent());
    } else {
        return element
    }
}

/**
 * 返回元素的属性
 * @param {string} element
 * @returns {string} output
 */
debugs.getElementAttr = function (element) {
    var output = '';

    output += element.className();
    output += ' indexInParent = ' + element.indexInParent();
    output += ' childCount = ' + element.childCount();
    output += ' width = ' + element.bounds().width() + ' height = ' + element.bounds().height();
    output += ' centerX = ' + element.bounds().centerX() + ' centerY = ' + element.bounds().centerY();

    if (element.id()) {
        output += ' id = ' + element.id();
    }
    if (element.text()) {
        output += ' text = ' + element.text();
    }
    if (element.desc()) {
        output += ' desc = ' + element.desc();
    }

    return output;
}

module.exports = debugs;
