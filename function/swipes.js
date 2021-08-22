/**
 * 功能集合-滑动
 */
var swipes = {}

/**
 * 滑动-右到左
 */
swipes.right = function () {
    swipe(900, 1100, 100, 1100, 500)
    sleep(1 * 1000)
}

/**
 * 滑动-右到左
 */
swipes.right200 = function () {
    swipe(900, 200, 100, 200, 500)
    sleep(1 * 1000)
}

/**
 * 滑动-右到左
 */
swipes.right300 = function () {
    swipe(900, 300, 100, 300, 500)
    sleep(1 * 1000)
}

/**
 * 滑动-右到左
 */
swipes.right2100 = function () {
    swipe(900, 2100, 100, 2100, 500)
    sleep(1 * 1000)
}

/**
 * 滑动-刷新
 */
swipes.refresh = function () {
    swipe(500, 600, 500, 1000, 500)
    sleep(5 * 1000)
}

/**
 * 滑动-刷新
 */
swipes.refresh400_100 = function () {
    swipe(500, 600, 500, 1000, 100)
    sleep(5 * 1000)
}

/**
 * 滑动-刷新
 */
swipes.refresh600 = function () {
    swipe(500, 600, 500, 1200, 500)
    sleep(5 * 1000)
}

/**
 * 滑动-刷新
 */
swipes.refresh1300 = function () {
    swipe(500, 600, 500, 1900, 500)
    sleep(5 * 1000)
}

/**
 * 滑动-刷新
 */
swipes.refresh1500 = function () {
    swipe(500, 400, 500, 1900, 500)
    sleep(5 * 1000)
}

/**
 * 滑动-下到上
 */
swipes.scrollDown = function () {
    scrollDown()
    sleep(1 * 1000)
}

/**
 * 滑动-下到上
 */
swipes.scrollDown2 = function () {
    for (var i = 0; i < 2; i++) {
        swipes.scrollDown()
    }
}

/**
 * 滑动-下到上
 */
swipes.scrollDown3 = function () {
    for (var i = 0; i < 3; i++) {
        swipes.scrollDown()
    }
}

/**
 * 滑动-下到上
 */
swipes.down = function () {
    if (device.height < 1600) {
        swipe(500, device.height - 200, 500, 600, 500)
    } else {
        swipe(500, 1600, 500, 600, 500)
    }
    sleep(1 * 1000)
}

/**
 * 滑动-下到上
 */
swipes.down900 = function () {
    swipe(500, 1000, 500, 100, 300)
    sleep(1 * 1000)
}

/**
 * 滑动-下到上
 */
swipes.down1000_100 = function () {
    swipe(500, 1600, 500, 600, 100)
    sleep(1 * 1000)
}

/**
 * 滑动-下到上
 */
swipes.down1600 = function () {
    swipe(500, 1700, 500, 100, 500)
    sleep(1 * 1000)
}

/**
 * 滑动-下到上
 */
swipes.down2200 = function () {
    swipe(500, 2250, 500, 50, 500)
    sleep(1 * 1000)
}

/**
 * 滑动-下到上，直到元素出现在屏幕里
 * @param {string} element
 * @returns {boolean}
 */
swipes.downUntilElementShow = function (element) {
    if (!element || !element.exists()) {
        return false
    }

    for (var i = 0; i < 10; i++) {
        var elementY = element.findOne(3000).bounds().centerY()
        if (200 < elementY && elementY < (device.height - 200)) {
            return true
        }

        swipes.down()
    }

    return false
}

module.exports = swipes
