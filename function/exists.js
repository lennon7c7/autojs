/**
 * 功能集合-元素存在判断
 */
var s = {};

/**
 * 查询 元素 列表，再根据 宽、高 去判断元素是否存在
 * @param {string} element
 * @param {number} width
 * @param {number} height
 * @returns {boolean}
 */
s.elementWidthHeight = function (element, width, height) {
    isOk = false;
    element.find().forEach(value => {
        if (value.bounds().width() !== width || value.bounds().height() !== height) {
            return false;
        }

        isOk = true;
    });

    return isOk;
};

/**
 * 查询 金额 元素的值
 * @param element
 * @returns {number}
 */
s.money = function (element) {
    money = 0.0;

    if (!element.exists()) {
        return money;
    }

    currentMoney = element.findOne().contentDescription;
    if (currentMoney !== "" && currentMoney !== null) {
        currentMoney = currentMoney.toString();
        currentMoney = currentMoney.replace(/约/, '');
        currentMoney = currentMoney.replace(/元/, '');
        currentMoney = currentMoney.trim();
        if (currentMoney > 0) {
            money = currentMoney;
            return money;
        }
    }

    currentMoney = element.findOne().text();
    if (currentMoney === "" || currentMoney === null) {
        return money;
    }
    currentMoney = currentMoney.toString();
    currentMoney = currentMoney.replace(/约/, '');
    currentMoney = currentMoney.replace(/元/, '');
    currentMoney = currentMoney.trim();
    money = currentMoney;

    return money;
};

/**
 * 查询 金额 元素的值是否 ≥ 0.01
 * @param element
 * @returns {number}
 */
s.moneyEgt001 = function (element) {
    money = s.money(element);

    return money >= 0.01;
};

/**
 * 查询 金额 元素的值是否 ≥ 1
 * @param element
 * @returns {number}
 */
s.moneyEgt1 = function (element) {
    money = s.money(element);

    return money >= 1;
};

/**
 * 查询 金额 元素的值是否 ≥ 100
 * @param element
 * @returns {number}
 */
s.moneyEgt1 = function (element) {
    money = s.money(element);

    return money >= 100;
};

/**
 * 根据 当前元素 的 祖先级元素 去判断元素是否存在
 * @param {string} currentElement
 * @param {string} parentsElement
 * @returns {boolean}
 */
s.parents = function (currentElement, parentsElement) {
    if (currentElement.find().size() === 0) {
        return false;
    }

    element = currentElement.findOne().parent().parent().findOne(parentsElement);
    if (element == null) {
        return false;
    }

    return true;
};

/**
 * 根据 当前元素 的 父级元素 去判断元素是否存在
 * @param {string} currentElement
 * @param {string} parentElement
 * @returns {boolean}
 */
s.parent = function (currentElement, parentElement) {
    if (currentElement.find().size() === 0) {
        return false;
    }

    element = currentElement.findOne().parent().findOne(parentElement);
    if (element == null) {
        return false;
    }

    return true;
};

module.exports = s;
