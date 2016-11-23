/*
* @Author: jxj
* @Date:   2016-10-13 11:26:38
* @Last Modified by:   jxj
* @Last Modified time: 2016-10-17 01:10:49
*/

'use strict';
var fs=require("fs")
var path=require("path");

var gulp=require("gulp");

var jp=require("gulp-jspool");
gulp.src("./dir/config.json").pipe(jp({
    data:{gobal:"vid"}
})).pipe(gulp.dest("dir2"));





