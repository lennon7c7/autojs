/**
 * 延迟执行
 */
var s = {};

// x秒
s.custom = function (time) {
    sleep(time * 1000);
};

// 2 ~ 3 秒
s.s2to3 = function () {
    s.custom(random(2, 3));
};

s.s2to4 = function () {
    s.custom(random(2, 4));
};

s.s2to5 = function () {
    s.custom(random(2, 5));
};

s.s2to10 = function () {
    s.custom(random(2, 10));
};

s.s5to10 = function () {
    s.custom(random(5, 10));
};

s.s10to20 = function () {
    s.custom(random(10, 20));
};

s.s10to30 = function () {
    s.custom(random(10, 30));
};

s.s15to20 = function () {
    s.custom(random(15, 30));
};

s.s35to40 = function () {
    s.custom(random(35, 40));
};

s.s60to70 = function () {
    s.custom(random(60, 70));
};

// 1秒
s.s1 = function () {
    sleep(1 * 1000);
};

s.s3 = function () {
    sleep(3 * 1000);
};

s.s4 = function () {
    sleep(4 * 1000);
};

s.s5 = function () {
    sleep(5 * 1000);
};

s.s10 = function () {
    sleep(10 * 1000);
};

s.s15 = function () {
    sleep(15 * 1000);
};

s.s30 = function () {
    sleep(30 * 1000);
};

s.s35 = function () {
    sleep(35 * 1000);
};

s.s50 = function () {
    sleep(50 * 1000);
};

s.s60 = function () {
    sleep(60 * 1000);
};

module.exports = s;
