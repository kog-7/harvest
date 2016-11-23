#   gulp-jspool   #

a easy way to pack javascript components. Bundling files without much changes of your code;

![](https://img.shields.io/npm/v/gulp-jspool.svg?style=flat)

## Installation
```base
npm install gulp-jspool
```



## Features
  * use config.json to pack
  * control flow with ? ?
  * @include
  * copy/paste
  * filters
  * use filesystem to pack multiple environment
  * use scope name to divide data environment
  * Loop and conditional expressions 
  
  
## why use gulp-jspool
* we want to store our jscode,just like Carousel,data handle,UI interactions and so on,all of these codes need different running environment and develop environment.
* some animation js maybe have long running cycle,we need split them and write/test each cycle
* some jscomponent is composed by some other jscomponent,we need to have a mechanism to compose them in project.


## a example about the ./example folder which export example.js
###### gulpfile.js
```js
var gulp = require("gulp");
var rename=require("gulp-rename"),uglify=require("gulp-uglify");
var jspool = require("gulp-jspool");
gulp.tast("example", function() {
    gulp.src("./config.json").pipe(jspool()).pipe(gulp.dest("dest"))
  //can use .pipe(uglify()) .pipe(rename(function(path){path.extname=".min.js";})) .pipe(gulp.dest("dest")) or some other gulp plugin.
});

```
###### index.js

```js 
  '@include(js/utils.js)'
  '@paste(tool)'//By jspool writing directories
  var Exp=function(){
    
  };
  var prototypeExp={constructor:Exp};
  
  '@include(js/extendFilter.js)'
  
  extend(prototypeExp,extendFilter);
  Exp.prototype=prototypeExp;
  $("?button?").on("click",function(){
    //..
  });
  var canvas=$("#canvas")[0];
  var c2d=canvas.getContext("2d");
  //some c2d handle code
  {{for shape in ?shapes?}}
   {{if ?shape.type? == circle}}
      c2d.arc(?shape.x?,?shape.y?,?shape.radius?,0,2*Math.PI);
   {{/if}}
   {{if ?shape.type? == line}}
     c2d.lineTo(?shape.x?,?shape.y?);
   {{/if}}
  {{/for}}
```

###### config.js
```js 
{
    "export": "example.js",
    "paste": {"tool": "../tool"}, 
    "data": "data.json", "filter": "filter.js"},
    "name":"example"
```
###### data.json 
```js 
{"button":"#btn","elements":[{"width":200,"height":100....}]}
```
###### dir tool is same to dir example

- - -
*instructions for use and api*

## filesystem
 * index.js   //root js of project
 * config.json  //config file of project,must have json format.can be empty like {}. normal content is {"export":"example.js","paste":{"tool":"../tool"},"data":"data.json","filter":"filter.js","root":"index.js","name":"example"}

  //config.json  If no data attr,default value is data.json.If no filter ,default value is filter.js.If no export attr,default value is _test_export.js（This file is generated by the jspool,not by gulp.dest..）.paste attr use for copy other same jspool directory.If no root attr,default value is index.js.If no name attr,the name of gulp.dest export file will be the name of dir.If use name attr,the name of gulp.dest export file will be the this name

* data.json //store data match variable
* filter.js  //use node require to module.exports filters ob

>multiple environment test/development/online in project ../example

* config.json 
```js 
{"export": "example.js", "root": "index.js","name":"example"} 
```
* dev-config.json 
```js 
{ "export": "dev-example.js", "root": "dev-index.js","name":"dev-example"}
```
* test-config.json 
```js 
{ "export": "test-example.js", "root": "test-index.js","name":"test-example"}
```

>can use *npm install jdirectory* via [jdirectory](https://www.npmjs.com/package/jdirectory) to create dirs and files,use like  ...project1>jdir jspool 

## @include
```js 
'@include(js/event.js)'
//if want diff data environment for other js
{{scope canvas as ?size|handRect,handColor?}}
    '@include(js/canvas.js)'
{{/scope}}

```

## @paste
  
>some base utils js don't write in current dir,it exists in other directory;

 * dir./tool
 ```js 
   {{copy array}}
   var handArr1=function(){...};
   var handArr2=function(){...};
   {{/copy}}
   {{copy string}}
   var string1=function(){}
   var string2=function(){}
   {{/copy}}

 ```

* dir ./example
 
 *config.json  {"paste":{"tool":"../tool"}}*

 some js file can have
 ```js 
    
    '@paste(tool.array)'
    ......
'@paste(tool)'
 ```


## variable

```js 
//if can't match width,use 200 instead,
?width:200|toPx?
//can use much variable and filter
?width:200,height:100,left:20,top:20|toPx,toScale?

//use for express
//also can use {{for da in [1,2,3]}}or {{for....{"a":123,..}}}
//if ?data? is object type,,da will just like {attr:"a",value:123}
{{for da in ?data?}}//object type
?da.attr?
?da.value?
{{/for}}
{{for da in ?data?}}//array type
?da?
{{/for}}
//use complex loop
var temp=null;
{{for ele in ?elements?}}
  temp=ob.ele?ele.name|upperA?=createElement(
  ?ele.width:100?,?ele.height:200?
  );
    {{for sz in ["image","text"]}}
          {{if ?ele.width? > 50}}
              temp.createSize("?sz?");
          {{/if}}
    {{/for}}
  {{/for}}


// use if express
//if support <,>,>=,<=,==,!= 

{{if ?width? > ?smallWidth?}}
    {{if ?wd? > 5}}
    .......
    {{/if}}
{{/if}}

//use scope,  pic.js will use the valueof ?pic?,for example:
//?pData? is equal to {x:66,y:2},in pic.js,can use ?pic.x? to get 66;
//?pData? is equal to 6 ,in pic.js ,can use ?pic? to get 6
{{scope pic as ?pData?}}
'@include(js/pic.js)'
{{/scope}}

```

## filter
```js 
//in your filter.js file
//built-in filter is upper (upperCase string),lower (lowerCase string),length (length of array)
module.exports={
toPx:function(variableValue,item,length){
//variableValue is the value of ?..?,
//if use multi variable ?wd,hg,lf?,varibleValue will be a array to include all,
//if use for loop,item will be the no of loop item,length is the length of loop length;
}
};
//tips:if you use filter to handle variableValue of type object in ??,
//after you change this object attr,value, the change will exists in other situation;
//for example: ?ob1|filter1?  the value of ob1 is {x:1,y:1},and filter1 is function(variableValue){variableValue.z=3;return variableValue;} 
//then you use ?ob1? after  the previous operation,the value of ob1 will be {x:1,y:1,z:3}.
//so in filter1 ,use function(variableValue){
//var ob=copy(variableValue);//copy is your copy object function;  
//ob.z=3;return ob;} 
//is better which you don't want to change the original data;
```

##api
```js 
gulp.src("./config.json").pipe(jspool({
data:{},//optional,the data will merge with data.json.
name:"somename"//optional,this name will cover the name attr of config.json

})).pipe(gulp.dest("dest"));

```

## process

![tip](http://jspool.oss-cn-hongkong.aliyuncs.com/jspool.png)

## fix
 * 11-9  fix filter read bug.
 * 11-10 fix buffer to use uglify.
 * 11-23 can export just like a/b/c/d/exp.js


