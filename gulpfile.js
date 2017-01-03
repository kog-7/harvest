var gulp = require("gulp"); 
 var packme = require("packme"); 
 var cpaste=require("cpaste"); 
 var pm=new packme(); 
 var browserSync = require('browser-sync').create(); 
 // var cp=cpaste().copy("../list.html").paste("html/copy"); 
 
 gulp.task('server', function() { 
   gulp.watch('dest/*').on("change",browserSync.reload); 
     browserSync.init({ 
         server: { 
             baseDir: "./dest/" 
         } 
     }); 
 }); 
 
 gulp.task("wat",function(){ 
   var watcher=gulp.watch(["index.html","html/**","html/copy/*","index.less","less/**","index.js","js/map/*.js","js/dom/*.js","js/animate/shape/*.js","js/*.js"],function(){ 
     // cpaste().copy(["../list.html","../content-nav.html"]).paste("html/copy").setCallback(function(){ 
       pm.export({ 
         callback:function(){ 
           console.log("over"); 
         } 
       }); 
     // }); 
   }) 
 }) 
 
 gulp.task("testWat",function(){ 
   var watcher=gulp.watch(["test/index.html","test/html/**","test/html/copy/*","test/index.less","less/**","test/index.js","js/map/*.js","js/dom/*.js","js/animate/shape/*.js","js/*.js"],function(){ 
     // cpaste().copy(["../list.html","../content-nav.html"]).paste("html/copy").setCallback(function(){ 
       pm.export({ 
        config:"test",
         callback:function(){ 
           console.log("over"); 
         } 
       }); 
     // }); 
   }) 
 }) 


gulp.task("pack",function(){ 
pm.export({ 
  callback:function(){ 
    console.log("over") 
  } 
}); 
 
 
 })