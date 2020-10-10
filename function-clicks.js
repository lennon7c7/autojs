/**
 * 功能集合-点击
 */
var s = {};

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

    if (text(myString).click()) {
        sleep(3 * 1000);
        return true;
    }

    element = text(myString).findOne().bounds();
    x = element.centerX();
    y = element.centerY();
    if (x >= 0 && y >= 0 && click(x, y)) {
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
