/**
 * 滑动
 */
var s = {};

/**
 * 滑动-右到左
 */
s.right = function () {
    swipe(900, 1100, 100, 1100, 500);
    sleep(1 * 1000)
};

/**
 * 滑动-右到左
 */
s.right200 = function () {
    swipe(900, 200, 100, 200, 500);
    sleep(1 * 1000)
};

/**
 * 滑动-右到左
 */
s.right300 = function () {
    swipe(900, 300, 100, 300, 500);
    sleep(1 * 1000)
};

/**
 * 滑动-右到左
 */
s.right2100 = function () {
    swipe(900, 2100, 100, 2100, 500);
    sleep(1 * 1000)
};

/**
 * 滑动-刷新
 */
s.refresh = function () {
    swipe(500, 600, 500, 1000, 500);
    sleep(5 * 1000)
};

/**
 * 滑动-刷新
 */
s.refresh600 = function () {
    swipe(500, 600, 500, 1200, 500);
    sleep(5 * 1000)
};

/**
 * 滑动-下到上
 */
s.down = function () {
    swipe(500, 1600, 500, 600, 500);
    sleep(1 * 1000)
};

/**
 * 滑动-下到上
 */
s.down900 = function () {
    swipe(500, 1000, 500, 100, 300);
    sleep(1 * 1000)
};

/**
 * 滑动-下到上
 */
s.down1600 = function () {
    swipe(500, 1700, 500, 100, 500);
    sleep(1 * 1000)
};

module.exports = s;
