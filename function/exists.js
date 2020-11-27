/**
 * 功能集合-元素存在判断
 */
var s = {};

/**
 * 查询 元素 列表，再根据 宽、高 去判断元素是否存在
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
