/**
 * 功能集合-点击
 */
var s = {};

/**1
 * 查询 元素 列表，再根据 宽、高 点击
 */
s.elementWidthHeight = function (element, width, height) {
    isOk = false;
    element.find().forEach((value, key) => {
        if (value.bounds().width() != width || value.bounds().height() != height) {
            return false;
        }

        value.click();
        sleep(3 * 1000);

        isOk = true;
    });

    if (isOk) {
        return true;
    }

    log('---------- fail: element =', element, ' width =', width, ' height =', height, ' ----------');

    return false;
};

/**
 * xy
 */
s.xy = function (x, y) {
    if (x <= 0 && y <= 0) {
        log('---------- fail: x =', x, ' y =', y, ' ----------');
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
 * 元素
 */
s.element = function (e) {
    if (e.exists != undefined && !e.exists()) {
        return false;
    }

    if (e.size != undefined && e.size() == 0) {
        return false;
    }

    e.click();
    sleep(3 * 1000);

    return true;
};

/**
 * 根据 文本 元素的宽高去点击
 * @param {string} myString
 * @returns {boolean}
 */
s.centerXyByText = function (myString) {
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
    if (x >= 0 && y >= 0) {
        click(x, y);
        sleep(3 * 1000);
        return true;
    }

    log('---------- fail: click ', myString, ' ----------');

    return false;
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

    text(myString).click()
    sleep(3 * 1000);

    return true;
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
 * 根据 描述 元素的宽高去点击
 * @param {string} myString
 * @returns {boolean}
 */
s.centerXyByDesc = function (myString) {
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
    if (x >= 0 && y >= 0) {
        click(x, y);
        sleep(3 * 1000);
        return true;
    }

    log('---------- fail: click ', myString, ' ----------');

    return false;
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

    desc(myString).click()
    sleep(3 * 1000);

    return true;
};

/**
 * 根据 id 元素的宽高去点击
 * @param {string} myString
 * @returns {boolean}
 */
s.centerXyById = function (myString) {
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
    if (x >= 0 && y >= 0) {
        click(x, y);
        sleep(3 * 1000);
        return true;
    }

    if (id(myString).click()) {
        sleep(3 * 1000);
        return true;
    }

    log('---------- fail: click ', myString, ' ----------');

    return false;
};

/**
 * 根据 当前元素 的 祖先级元素 去点击
 * @param {string} currentElement
 * @param {string} parentElement
 * @returns {boolean}
 */
s.parents = function (currentElement, parentsElement) {
    if (currentElement.find().size() == 0) {
        log('---------- fail: currentElement =', currentElement, ' none exist ----------');
        return false;
    }

    element = currentElement.findOne().parent().parent().findOne(parentsElement);
    if (element == null || !s.element(element)) {
        log('---------- fail: parentElement =', parentsElement, ' none exist ----------');
        return false;
    }

    return true;
};

/**
 * 根据 当前元素 的 父级元素 去点击
 * @param {string} currentElement
 * @param {string} parentElement
 * @returns {boolean}
 */
s.parent = function (currentElement, parentElement) {
    if (currentElement.find().size() == 0) {
        log('---------- fail: currentElement =', currentElement, ' none exist ----------');
        return false;
    }

    element = currentElement.findOne().parent().findOne(parentElement);
    if (element == null || !s.element(element)) {
        log('---------- fail: parentElement =', parentElement, ' none exist ----------');
        return false;
    }

    return true;
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

    id(myString).click()
    sleep(3 * 1000);

    return true;
};

/**
 * id-元素存在则点击
 * @param {string} myString
 * @returns {boolean}
 */
s.idIfExists = function (myString) {
    if (myString == '' || !id(myString).exists()) {
        return false;
    }

    return s.id(myString);
};

module.exports = s;
