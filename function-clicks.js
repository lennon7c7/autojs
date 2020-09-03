/**
 * 功能集合-点击
 */
var s = {};

/**
 * 普通
 */
s.click = function (x, y) {
    click(x, y);
    sleep(3 * 1000);
}

/**
 * 元素
 */
s.findOne = function (e) {
    e.findOne().click();
    sleep(3 * 1000);
}

/**
 * 元素
 */
s.findOneParent = function (e) {
    e.findOne().parent().click();
    sleep(3 * 1000);
}

module.exports = s;
