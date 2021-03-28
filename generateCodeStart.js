/**
 * 生成启动代码
 * 方便随时运行某个APP
 */
main();

/**
 * 入口
 */
function main() {
    toastLog('---------- start ----------');

    var isOk = generate();
    if (!isOk) {
        toastLog('shit happen');
    }

    toastLog('---------- end ----------');
}

/**
 * 生成代码
 */
function generate() {
    var sourceDir = files.cwd() + '/module';
    var sourceFile = files.listDir(sourceDir, function (name) {
        return name.endsWith('.js') && files.isFile(files.join(sourceDir, name));
    });

    var targetDir = files.cwd() + '/start/';
    var isOk = files.ensureDir(targetDir);
    if (!isOk) {
        toastLog('!isOk');
        return;
    }

    sourceFile.forEach((value) => {
        var path = targetDir + value;
        var content = 'var module = require(\'../module/' + value + '\');\n' +
            'module.start();';
        files.write(path, content);
    });

    return isOk;
}
