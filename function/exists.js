/**
 * 功能集合-元素存在判断
 */
var exists = {}

/**
 * 查询 元素 列表，再根据 宽、高 去判断元素是否存在
 * @param {string} element
 * @param {number} width
 * @param {number} height
 * @returns {boolean}
 */
exists.elementWidthHeight = function (element, width, height) {
    isOk = false
    element.find().forEach(value => {
        if (value.bounds().width() !== width || value.bounds().height() !== height) {
            return false
        }

        isOk = true
    })

    return isOk
}

/**
 * 查询 金额 元素的值
 * @param element
 * @returns {number}
 */
exists.money = function (element) {
    money = 0.0

    if (!element.exists()) {
        return money
    }

    currentMoney = element.findOne(300).contentDescription
    if (currentMoney !== "" && currentMoney !== null) {
        currentMoney = currentMoney.toString()
        currentMoney = currentMoney.replace(/¥/, '')
        currentMoney = currentMoney.replace(/￥/, '')
        currentMoney = currentMoney.replace(/约/, '')
        currentMoney = currentMoney.replace(/元/, '')
        currentMoney = currentMoney.trim()
        if (currentMoney > 0) {
            money = currentMoney
            return money
        }
    }

    currentMoney = element.findOne(300).text()
    if (currentMoney === "" || currentMoney === null) {
        return money
    }
    currentMoney = currentMoney.toString()
    currentMoney = currentMoney.replace(/¥/, '')
    currentMoney = currentMoney.replace(/￥/, '')
    currentMoney = currentMoney.replace(/约/, '')
    currentMoney = currentMoney.replace(/元/, '')
    currentMoney = currentMoney.trim()
    money = currentMoney

    return money
}

/**
 * 查询 金额 元素的值是否 ≥ money
 * @param element
 * @param {number} currentMoney
 * @returns {number}
 */
exists.moneyEgt = function (element, currentMoney) {
    money = exists.money(element)

    return money >= currentMoney
}

/**
 * 查询 金额 元素的值是否 ≥ 0.01
 * @param element
 * @returns {number}
 */
exists.moneyEgt001 = function (element) {
    return exists.moneyEgt(element, 0.01)
}

/**
 * 查询 金额 元素的值是否 ≥ 0.02
 * @param element
 * @returns {number}
 */
exists.moneyEgt002 = function (element) {
    return exists.moneyEgt(element, 0.02)
}

/**
 * 查询 金额 元素的值是否 ≥ 0.1
 * @param element
 * @returns {number}
 */
exists.moneyEgt01 = function (element) {
    return exists.moneyEgt(element, 0.1)
}

/**
 * 查询 金额 元素的值是否 ≥ 0.2
 * @param element
 * @returns {number}
 */
exists.moneyEgt02 = function (element) {
    return exists.moneyEgt(element, 0.2)
}

/**
 * 查询 金额 元素的值是否 ≥ 1
 * @param element
 * @returns {number}
 */
exists.moneyEgt1 = function (element) {
    return exists.moneyEgt(element, 1)
}

/**
 * 查询 金额 元素的值是否 ≥ 5
 * @param element
 * @returns {number}
 */
exists.moneyEgt5 = function (element) {
    return exists.moneyEgt(element, 5)
}

/**
 * 查询 金额 元素的值是否 ≥ 10
 * @param element
 * @returns {number}
 */
exists.moneyEgt10 = function (element) {
    return exists.moneyEgt(element, 10)
}

/**
 * 查询 金额 元素的值是否 ≥ 15
 * @param element
 * @returns {number}
 */
exists.moneyEgt15 = function (element) {
    return exists.moneyEgt(element, 15)
}

/**
 * 查询 金额 元素的值是否 ≥ 100
 * @param element
 * @returns {number}
 */
exists.moneyEgt100 = function (element) {
    return exists.moneyEgt(element, 100)
}

/**
 * 查询 金额 元素的值是否 ≥ 50000
 * @param element
 * @returns {number}
 */
exists.moneyEgt50000 = function (element) {
    return exists.moneyEgt(element, 50000)
}

/**
 * 根据 当前元素 的 祖先级元素 去判断元素是否存在
 * @param {string} currentElement
 * @param {string} parentsElement
 * @returns {boolean}
 */
exists.parents = function (currentElement, parentsElement) {
    if (currentElement.find().size() === 0) {
        return false
    }

    element = currentElement.findOne(300).parent().parent().findOne(parentsElement)
    if (element == null) {
        return false
    }

    return true
}

/**
 * 根据 当前元素 的 父级元素 去判断元素是否存在
 * @param {string} currentElement
 * @param {string} parentElement
 * @returns {boolean}
 */
exists.parent = function (currentElement, parentElement) {
    if (currentElement.find().size() === 0) {
        return false
    }

    element = currentElement.findOne(300).parent().findOne(parentElement)
    if (element == null) {
        return false
    }

    return true
}

/**
 * 回到指定元素存在的页面
 * @param {string} element 指定元素
 * @returns {boolean}
 */
exists.backToElement = function (element) {
    if (!element || element.exists === undefined) {
        return false
    }

    for (var i = 0; i < 10; i++) {
        if (element.exists()) {
            return true
        }

        back()
        sleep(3 * 1000)
    }

    return false
}

module.exports = exists
