'@include(js/utils.js)'

var namespace=function(gbl,scope){
//工具
var getValue=function(attr,obj){
var out=obj;
return attr.indexOf(".")!==-1?(attr.split(".").forEach(function(val){out[val]&&(out=out[val])}),out):out[attr];
};

//参数与函数覆盖
scope=scope?scope:window,namespace=null;
var create=function(name,val){//创建属性
gbl[name]=val;
};
var changeModule=function(module){//修改模块字符串为对象
var mds=[];
module&&(typeHim(module)==="array"?module.forEach(function(md){mds.push(getValue(md,gbl))}):mds.push(getValue(module,gbl)));//&&的优先级高于?，会先合并&&两个相邻的
return mds;
};
scope.module=function(defineFun,module){//namespace以后扩展
if(!defineFun){return false;}
defineFun.apply(null,[create].concat(changeModule(module)));
};
scope.task=function(runFun,module){
if(!runFun){return false;}
runFun.apply(null,changeModule(module));
};
};



namespace(window);

'@include(js/size.js)'
'@include(js/gesture/drag.js)'
'@include(js/dom/page.js)'
'@include(js/dom/create-loop.js)'
'@include(js/map/map.js)'

'@include(js/animate/shape.js)'

'@include(js/app.js)'
