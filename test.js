/*
 * @Author: jxj
 * @Date:   2016-10-22 11:06:29
 * @Last Modified by:   jxj
 * @Last Modified time: 2016-10-28 12:17:44
 */




'use strict';
var gulp = require("gulp");

var pj = require("./index.js");


gulp.src("jscomp/config.json").pipe(pj({
    config: "jscomp",
    data: {
        mm: 123,
        a: ["a", 1]
    },
    callback: function() {}
}));