/**
 * 功能集合-点击
 */
var s = {};

/**
 * width and height
 */
s.wh = function (width, height) {
    className('android.widget.FrameLayout').find().forEach((value, key) => {
        if (value.bounds().width() != width || value.bounds().height() != height) {
            return false;
        }

        value.click();
        sleep(3 * 1000);

        return true;
    });

    log('---------- fail: width=', width, ' height=', height, ' ----------');

    return false;
};

/**
 * xy
 */
s.xy = function (x, y) {
    if (x <= 0 && y <= 0) {
        log('---------- fail: x=', x, ' y=', y, ' ----------');
        return false;
    }

    click(x, y);
    sleep(3 * 1000);

    return true;
};

/**
 * 批量点击-类似淘宝消消乐类型那种
 * @param {int} x 行起始位置
 * @param {int} y 列起始位置
 * @param {int} offset 偏移量
 * @param {int} step 行列的数目
 */
s.xiaoxiao = function (x, y, offset, step) {
    xAdd = offset;
    yAdd = offset;

    for (var i = 0; i < step; i++) {
        for (var j = 0; j < step; j++) {
            // top
            if (i != (step - 1)) {
                click(x + xAdd * j, y - yAdd * i);
                sleep(300);
                click(x + xAdd * j, y - yAdd * i - yAdd);
                sleep(300);
            }

            // right
            if (i != (step - 1)) {
                click(x + xAdd * j, y - yAdd * i);
                sleep(300);
                click(x + xAdd * j + xAdd, y - yAdd * i);
                sleep(300);
            }

            // bottom
            if (i != 0) {
                click(x + xAdd * j, y - yAdd * i);
                sleep(300);
                click(x + xAdd * j, y - yAdd * i + yAdd);
                sleep(300);
            }

            // left
            if (j > 0) {
                click(x + xAdd * j, y - yAdd * i);
                sleep(300);
                click(x + xAdd * j - xAdd, y - yAdd * i);
                sleep(300);
            }
        }
    }
}

/**
 * 根据 text 查找 xy
 * @param {string} myString
 * @returns {boolean}
 */
s.xyByText = function (myString) {
    if (myString == '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!text(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    element = text(myString).findOne().bounds();
    x = element.centerX();
    y = element.centerY();
    if (x >= 0 && y >= 0 && click(x, y)) {
        sleep(3 * 1000);
        return true;
    }

    log('---------- fail: click ', myString, ' ----------');

    return false;
};

/**
 * 根据 id 查找 xy
 * @param {string} myString
 * @returns {boolean}
 */
s.xyById = function (myString) {
    if (myString == '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!id(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    element = id(myString).findOne().bounds();
    x = element.centerX();
    y = element.centerY();
    if (x >= 0 && y >= 0 && click(x, y)) {
        sleep(3 * 1000);
        return true;
    }

    log('---------- fail: click ', myString, ' ----------');

    return false;
};

/**
 * 根据 desc 查找 xy
 * @param {string} myString
 * @returns {boolean}
 */
s.xyByDesc = function (myString) {
    if (myString == '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!desc(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    element = desc(myString).findOne().bounds();
    x = element.centerX();
    y = element.centerY();
    if (x >= 0 && y >= 0 && click(x, y)) {
        sleep(3 * 1000);
        return true;
    }

    log('---------- fail: click ', myString, ' ----------');

    return false;
};

/**
 * 元素
 */
s.element = function (e) {
    e.click();
    sleep(3 * 1000);

    return true;
};

/**
 * 文本
 * @param {string} myString
 * @returns {boolean}
 */
s.text = function (myString) {
    if (myString == '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!text(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    element = text(myString).findOne().bounds();
    x = element.centerX();
    y = element.centerY();
    if (x >= 0 && y >= 0 && click(x, y)) {
        sleep(3 * 1000);
        return true;
    }

    if (text(myString).click()) {
        sleep(3 * 1000);
        return true;
    }

    if (text(myString).findOne().click()) {
        sleep(3 * 1000);
        return true;
    }

    log('---------- fail: click ', myString, ' ----------');

    return false;
};

/**
 * 文本-元素存在则点击
 * @param {string} myString
 * @returns {boolean}
 */
s.textIfExists = function (myString) {
    if (myString == '' || !text(myString).exists()) {
        return false;
    }

    return s.text(myString);
};

/**
 * 描述
 * @param {string} myString
 * @returns {boolean}
 */
s.desc = function (myString) {
    if (myString == '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!desc(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }


    element = desc(myString).findOne().bounds();
    x = element.centerX();
    y = element.centerY();
    if (x >= 0 && y >= 0 && click(x, y)) {
        sleep(3 * 1000);
        return true;
    }

    if (desc(myString).click()) {
        sleep(3 * 1000);
        return true;
    }

    if (desc(myString).findOne().click()) {
        sleep(3 * 1000);
        return true;
    }

    log('---------- fail: click ', myString, ' ----------');

    return false;
};

/**
 * id
 * @param {string} myString
 * @returns {boolean}
 */
s.id = function (myString) {
    if (myString == '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!id(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    element = id(myString).findOne().bounds();
    x = element.centerX();
    y = element.centerY();
    if (x >= 0 && y >= 0 && click(x, y)) {
        sleep(3 * 1000);
        return true;
    }

    if (id(myString).click()) {
        sleep(3 * 1000);
        return true;
    }

    if (id(myString).findOne().click()) {
        sleep(3 * 1000);
        return true;
    }

    log('---------- fail: click ', myString, ' ----------');

    return false;
};

/**
 * 元素
 */
s.findOne = function (e) {
    e.findOne().click();
    sleep(3 * 1000);
};

module.exports = s;
