/**
 * 功能集合-点击
 */
var s = {};

/**
 * xy
 */
s.xy = function (x, y) {
    click(x, y);
    sleep(3 * 1000);
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
 */
s.text = function (text) {
    click(text);
    sleep(3 * 1000);
};

/**
 * 元素
 */
s.findOne = function (e) {
    e.findOne().click();
    sleep(3 * 1000);
};

/**
 * 元素
 */
s.findOneParent = function (e) {
    e.findOne().parent().click();
    sleep(3 * 1000);
};

module.exports = s;
