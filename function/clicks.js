/**
 * 功能集合-点击
 */
var s = {};

/**
 * 查询 元素 列表，再根据 宽、高 点击
 */
s.elementWidthHeight = function (element, width, height) {
    isOk = false;
    element.find().forEach((value, key) => {
        if (value.bounds().width() !== width || value.bounds().height() !== height) {
            return false;
        }

        if (value.clickable() === false) {
            click(value.bounds().centerX(), value.bounds().centerY());
        } else {
            value.click();
        }

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
 * x1y1x2y2
 */
s.x1y1x2y2 = function (x1, y1, x2, y2) {
    click(x1, y1, x2, y2);
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
            if (i !== (step - 1)) {
                click(x + xAdd * j, y - yAdd * i);
                sleep(300);
                click(x + xAdd * j, y - yAdd * i - yAdd);
                sleep(300);
            }

            // right
            if (i !== (step - 1)) {
                click(x + xAdd * j, y - yAdd * i);
                sleep(300);
                click(x + xAdd * j + xAdd, y - yAdd * i);
                sleep(300);
            }

            // bottom
            if (i !== 0) {
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
};

/**
 * 元素
 */
s.element = function (e) {
    if (e === undefined) {
        return false;
    } else if (e.exists !== undefined && !e.exists()) {
        log('---------- fail: param ', e, ' none exist ----------');
        return false;
    } else if (e.size !== undefined && e.size() === 0) {
        log('---------- fail: param ', e, ' none exist ----------');
        return false;
    }

    if (e.clickable() === false) {
        click(e.bounds().centerX(), e.bounds().centerY());
    } else {
        e.click();
    }
    sleep(3 * 1000);

    return true;
};

/**
 * 根据 文本 元素的宽高去点击
 * @param {string} myString
 * @returns {boolean}
 */
s.centerXyByText = function (myString) {
    if (myString === '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!text(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    element = text(myString).findOne(300).bounds();
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
 * 根据 文本 元素的rect去点击
 * @param {string} myString
 * @returns {boolean}
 */
s.rectByText = function (myString) {
    if (myString === '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!text(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    element = text(myString).findOne(300).bounds();
    click(element.left, element.top, element.right, element.bottom);
    sleep(3 * 1000);

    return true;
};
/**
 * 根据 最后的文本 元素的rect去点击
 * @param {string} myString
 * @returns {boolean}
 */
s.rectByLastText = function (myString) {
    elementAll = text(myString).find();
    lastOne = elementAll.size();
    elementAll.forEach((value, key) => {
        if ((key + 1) != lastOne) {
            return;
        }

        element = value.bounds();
        click(element.left, element.top, element.right, element.bottom);
        sleep(3 * 1000);
    });

    return true;
};

/**
 * 根据 秒素 元素的rect去点击
 * @param {string} myString
 * @returns {boolean}
 */
s.rectByDesc = function (myString) {
    if (myString === '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!text(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    element = desc(myString).findOne(300).bounds();
    click(element.left, element.top, element.right, element.bottom);
    sleep(3 * 1000);

    return true;
};

/**
 * 根据 文本 or 描述 元素去点击
 * @param {string} myString
 * @returns {boolean}
 */
s.textOrDesc = function (myString) {
    if (myString === '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (text(myString).exists() && !s.text(myString)) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    } else if (desc(myString).exists() && !s.desc(myString)) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    return true;
};

/**
 * 根据 文本 or 描述 元素的宽高去点击
 * @param {string} myString
 * @returns {boolean}
 */
s.centerXyByTextOrDesc = function (myString) {
    if (myString === '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (text(myString).exists() && !s.centerXyByText(myString)) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    } else if (desc(myString).exists() && !s.centerXyByDesc(myString)) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    return true;
};

/**
 * 根据 文本 or 描述 元素的rect去点击
 * @param {string} myString
 * @returns {boolean}
 */
s.rectByTextOrDesc = function (myString) {
    if (myString === '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (text(myString).exists() && !s.rectByText(myString)) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    } else if (desc(myString).exists() && !s.rectByDesc(myString)) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    return true;
};

/**
 * 文本
 * @param {string} myString
 * @returns {boolean}
 */
s.text = function (myString) {
    if (myString === '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!text(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    text(myString).click();
    sleep(3 * 1000);

    return true;
};

/**
 * 文本-元素存在则点击
 * @param {string} myString
 * @returns {boolean}
 */
s.textIfExists = function (myString) {
    if (myString === '' || !text(myString).exists()) {
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
    if (myString === '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!desc(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    element = desc(myString).findOne(300).bounds();
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
    if (myString === '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!desc(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    desc(myString).click();
    sleep(3 * 1000);

    return true;
};

/**
 * 描述-元素存在则点击
 * @param {string} myString
 * @returns {boolean}
 */
s.descIfExists = function (myString) {
    if (myString === '' || !desc(myString).exists()) {
        return false;
    }

    return s.desc(myString);
};

/**
 * 根据 id 元素的宽高去点击
 * @param {string} myString
 * @returns {boolean}
 */
s.centerXyById = function (myString) {
    if (myString === '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!id(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    element = id(myString).findOne(300).bounds();
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
 * @param {string} parentsElement
 * @returns {boolean}
 */
s.parents = function (currentElement, parentsElement) {
    if (currentElement.find().size() === 0) {
        log('---------- fail: currentElement =', currentElement, ' none exist ----------');
        return false;
    }

    element = currentElement.findOne(300).parent().parent().findOne(parentsElement);
    if (element == null || !s.element(element)) {
        log('---------- fail: parentsElement =', parentsElement, ' none exist ----------');
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
    if (currentElement.find().size() === 0) {
        log('---------- fail: currentElement =', currentElement, ' none exist ----------');
        return false;
    }

    element = currentElement.findOne(300).parent().findOne(parentElement);
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
    if (myString === '') {
        log('---------- fail: param ', myString, ' none exist ----------');
        return false;
    }

    if (!id(myString).exists()) {
        log('---------- fail: element ', myString, ' none exist ----------');
        return false;
    }

    id(myString).click();
    sleep(3 * 1000);

    return true;
};

/**
 * id-元素存在则点击
 * @param {string} myString
 * @returns {boolean}
 */
s.idIfExists = function (myString) {
    if (myString === '' || !id(myString).exists()) {
        return false;
    }

    return s.id(myString);
};

/**
 * 回到指定元素存在的页面
 * @param {string} element 指定元素
 * @returns {boolean}
 */
s.backToElement = function (element) {
    if (!element || element.exists === undefined) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (element.exists()) {
            element = element.findOne(300).bounds();
            x = element.centerX();
            y = element.centerY();
            if (x >= 0 && y >= 0) {
                click(x, y);
                sleep(3 * 1000);
                return true;
            }
        }

        back();
        sleep(3 * 1000);
    }

    return false;
};

/**
 * 回到指定元素存在的页面
 * @param {string} myString 指定元素text or desc
 * @returns {boolean}
 */
s.backToElementTextOrDesc = function (myString) {
    if (!myString) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (text(myString).exists() && s.rectByText(myString)) {
            return true;
        } else if (desc(myString).exists() && s.rectByDesc(myString)) {
            return true;
        }

        back();
        sleep(3 * 1000);
    }

    return false;
};

module.exports = s;
