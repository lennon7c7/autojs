/**
 * 功能集合-延迟执行
 */
var sleeps = {}

// x秒
sleeps.custom = function (time) {
    sleep(time * 1000)
}

// 2 ~ 3 秒
sleeps.s2to3 = function () {
    sleeps.custom(random(2, 3))
}

sleeps.s2to4 = function () {
    sleeps.custom(random(2, 4))
}

sleeps.s2to5 = function () {
    sleeps.custom(random(2, 5))
}

sleeps.s2to10 = function () {
    sleeps.custom(random(2, 10))
}

sleeps.s5to10 = function () {
    sleeps.custom(random(5, 10))
}

sleeps.s10to20 = function () {
    sleeps.custom(random(10, 20))
}

sleeps.s10to30 = function () {
    sleeps.custom(random(10, 30))
}

sleeps.s15to20 = function () {
    sleeps.custom(random(15, 30))
}

sleeps.s20to25 = function () {
    sleeps.custom(random(20, 25))
}

sleeps.s30to35 = function () {
    sleeps.custom(random(30, 35))
}

sleeps.s35to40 = function () {
    sleeps.custom(random(35, 40))
}

sleeps.s60to70 = function () {
    sleeps.custom(random(60, 70))
}

sleeps.s120to130 = function () {
    sleeps.custom(random(120, 130))
}

sleeps.s180to190 = function () {
    sleeps.custom(random(180, 190))
}

// 1秒
sleeps.s1 = function () {
    sleep(1000)
}

sleeps.s3 = function () {
    sleep(3 * 1000)
}

sleeps.s4 = function () {
    sleep(4 * 1000)
}

sleeps.s5 = function () {
    sleep(5 * 1000)
}

sleeps.s8 = function () {
    sleep(8 * 1000)
}

sleeps.s10 = function () {
    sleep(10 * 1000)
}

sleeps.s15 = function () {
    sleep(15 * 1000)
}

sleeps.s20 = function () {
    sleep(20 * 1000)
}

sleeps.s25 = function () {
    sleep(25 * 1000)
}

sleeps.s30 = function () {
    sleep(30 * 1000)
}

sleeps.s35 = function () {
    sleep(35 * 1000)
}

sleeps.s50 = function () {
    sleep(50 * 1000)
}

sleeps.s60 = function () {
    sleep(60 * 1000)
}

module.exports = sleeps
