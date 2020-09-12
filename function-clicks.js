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
 * @param {string} text
 * @returns {boolean}
 */
s.text = function (texaa) {
    if (!texaa) {
        toastLog("---------- fail: param none exist ----------");
        return false;
    }

    if (!text(texaa).exists()) {
        toastLog("---------- fail: element none exist ----------");
        return false;
    }


    if (click(text(texaa).findOne().bounds().centerX(), text(texaa).findOne().bounds().centerY())) {
        sleep(3 * 1000);
        return true;
    }

    if (text(texaa).click()) {
        sleep(3 * 1000);
        return true;
    }

    if (text(texaa).findOne().click()) {
        sleep(3 * 1000);
        return true;
    }
 
    toastLog("---------- fail: click ----------");

    return false;
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
