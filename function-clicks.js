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
s.text = function (textString) {
    if (!textString) {
        toastLog("---------- fail: param none exist ----------");
        return false;
    }

    if (!text(textString).exists()) {
        toastLog("---------- fail: element none exist ----------");
        return false;
    }


    if (click(text(textString).findOne().bounds().centerX(), text(textString).findOne().bounds().centerY())) {
        sleep(3 * 1000);
        return true;
    }

    if (text(textString).click()) {
        sleep(3 * 1000);
        return true;
    }

    if (text(textString).findOne().click()) {
        sleep(3 * 1000);
        return true;
    }
 
    toastLog("---------- fail: click ----------");

    return false;
};

/**
 * 描述
 * @param {string} descString
 * @returns {boolean}
 */
s.desc = function (descString) {
    if (!descString) {
        toastLog("---------- fail: param none exist ----------");
        return false;
    }

    if (!desc(descString).exists()) {
        toastLog("---------- fail: element none exist ----------");
        return false;
    }


    if (click(desc(descString).findOne().bounds().centerX(), desc(descString).findOne().bounds().centerY())) {
        sleep(3 * 1000);
        return true;
    }

    if (desc(descString).click()) {
        sleep(3 * 1000);
        return true;
    }

    if (desc(descString).findOne().click()) {
        sleep(3 * 1000);
        return true;
    }
 
    toastLog("---------- fail: click ----------");

    return false;
};

/**
 * id
 * @param {string} descString
 * @returns {boolean}
 */
s.id = function (idString) {
    if (!idString) {
        toastLog("---------- fail: param none exist ----------");
        return false;
    }

    if (!id(idString).exists()) {
        toastLog("---------- fail: element none exist ----------");
        return false;
    }


    if (click(id(idString).findOne().bounds().centerX(), id(idString).findOne().bounds().centerY())) {
        sleep(3 * 1000);
        return true;
    }

    if (id(idString).click()) {
        sleep(3 * 1000);
        return true;
    }

    if (id(idString).findOne().click()) {
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
