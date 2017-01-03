module(function(create){

var createDragData=function(config){
var outData={time:0,id:0,target:null,children:{},focus:0,name:"jdrag",focusLength:0,down:false,prompt:"",create:function(startX,startY){
return {startX:startX,startY:startY,x:0,y:0,control:[],top:0,left:0,distance:0,absA:2,absV:2};
}};
if(typeof config==="object"){
    miniExtend(outData,config);
}
return outData;
};

var _animateTrim=function(dom,data,callback){
var distance=data.distance,left=data.left,a=data.absA,v=data.absV;
var mod=Math.abs(left%distance),divide=left/distance,ceil=Math.ceil(divide)*distance,floor=Math.floor(divide)*distance;
if(mod===0){
if(typeof callback==="function"){callback();};return;}
var aimLeft=mod>distance/2?(left>0?ceil:floor):(left>0?floor:ceil);
var opt={aim:aimLeft,now:left,spring:0.3};
//这里由于是静止然后运行的，所以只确定一个方向，就是大和小
var ctr=data.control,tf={tf:1};ctr.push(tf);
var style=dom.style;
var f=function(){
if(tf.tf===0){if(typeof callback==="function"){callback();};return;}
easeValue(opt)===false?(left=aimLeft):(left=opt.now);
data.left=left,style[transform]=toTranslate(left,0);
if(left===aimLeft){if(typeof callback==="function"){callback();};return;}
requestAnimationFrame(f);
};
f();
}



var _animateEase=function(dom,data,v,callback){
var distance=data.distance,left=data.left,ifPlus=v>=0?1:-1,ifPlusA=-1*ifPlus,a=data.absA*ifPlusA;//加速度有正有反
var no=v<0?Math.ceil(1-v/a):Math.floor(1-v/a);//算出最终的位置数量
var add=v*no+a*no*(no-1)/2;//得到增加的最大长度
var aimLeft=left+add;
var mod=Math.abs(aimLeft%distance),divide=aimLeft/distance,ceil=Math.ceil(divide)*distance,floor=Math.floor(divide)*distance;//在速度的情况下，假设相关的目标位置
aimLeft=v>0?floor:ceil;
var ctr=data.control,tf={tf:1};ctr.push(tf);
var style=dom.style;
var opt={now:left,aim:aimLeft,spring:0.2};
var f=function(){
if(tf.tf===0){if(typeof callback==="function"){callback();};return;}
easeValue(opt)===false?left=aimLeft:left=opt.now;
style[transform]=toTranslate(left,0),data.left=left;
if(left===aimLeft){
    if(typeof callback==="function"){
    callback();};return;}
requestAnimationFrame(f);
}
f();
}




var handleDragEvent={
 down:function(dom,data,callback){
    this.clear(data);
    var left=data.left,distance=+data.distance,lg=+data.length;
    if(left>distance/2){left=-lg*distance+left,dom.style[transform]=toTranslate(left,0),data.left=left;}
    else if(left<(1-lg)*distance-distance/2){
        left=distance+left%distance,dom.style[transform]=toTranslate(left,0),data.left=left;}
    data.gesture=true;  
 },
 move:function(dom,data,callback){
    var dy=data.x-data.startX,left=data.left;
    dom.style[transform]=toTranslate(dy+left,0);
 },
 up:function(dom,data,callback){ 
    var time=Math.abs(data.upTime-data.time),x=data.x,lastX=data.lastX;lastX=lastX===undefined?x:lastX;
    var lg=Math.abs(x-lastX),ifPlus=x-data.startX>0?1:-1;//qq浏览器上面lastx和x不准确
    lg=lg*ifPlus;
    var v=lg*60/time;//时间和速度
    var left=data.left;left=data.left=data.x-data.startX+left;//换算出真实的left值
    var aimLeft;
   
    if(time/1000>0.8||Math.abs(v)<3){_animateTrim(dom,data,function(){data.gesture=false;
        var item=data.left/data.distance-1;

        callback(item);
    });
    return;
    }//如果时间太长，或者速度太小，那么直接返回
    
    var v=v>=0?(v>40?40:v):(v<-40?-40:v);
    _animateEase(dom,data,v,function(){data.gesture=false;
                var item=data.left/data.distance-1;
 callback(item);
    });
 },
 clear:function(data){
    var ctr=data.control;//清空上一次的加速度
    ctr.forEach(function(val){val.tf=0;})
    return data.control=[];
 },
 animate:function(dom,data){
    var ctr=this.clear(data);
    var tf={tf:1};ctr.push(tf);
    var left=data.left,ifPlus=left>=0?ifPlus=1:ifPlus=-1;//变成正数
    var distance=+data.distance,mod=left%distance,divide=Math.floor(left/distance),aimLeft=null;
    var style=dom.style,tempLeft=null;
    aimLeft=(divide-1)*distance;
    var opt={now:left,aim:aimLeft,spring:0.1};
    var f=function(){
        if(tf.tf===0){return;}
        easeValue(opt)===false?left=aimLeft:left=opt.now;
        data.left=left,style[transform]=toTranslate(left,0);
        if(left===aimLeft){return;}
        requestAnimationFrame(f);
    }
    f();
    return tf;
 }
};



var dragEvent=function(handle,config,callback){
return {
down:function(e){
var tar=e.target,name=config.name,children=config.children,ts=this,ifbind=tar.getAttribute("data-"+name);
while(!ifbind&&tar!==ts){
 tar=tar.parentNode,ifbind=tar.getAttribute("data-"+name);
}
ifbind=ifbind==="true"?true:ifbind;
var id=tar.getAttribute("data-"+name+"-id"),data=null;
if(ifbind!==true){return;}//如果没有绑定的证明不是相关
var eventData=eventXY(e);
if(id){//是否绑定相关id数据
data=children[id];
data.startX=eventData.x,data.startY=eventData.y;
}
else{
id=config.id+=1;tar.setAttribute("data-"+name+"-id",id);
data=children[id]=config.create(eventData.x,eventData.y);//如果没有数据，初始化相关位置一个数据，开始传入down事件的x，y进去
var distanceLength=+tar.getAttribute("data-"+name+"-distance");
var length=+tar.getAttribute("data-"+name+"-length");
data.length=length,data.distance=distanceLength;//得到distance值
//给相关的dom设置prevent
tar.addEventListener(emove,function(e){e.preventDefault();},false);
}
tar=tar.children[0];
handle.down(tar,data,callback);
config.focus=id,config.down=true,config.target=tar;
},
move:function(e){e.preventDefault();
if(config.down!==true){return;}
var data=config.children[config.focus],tar=config.target;
var eventData=eventXY(e),x=eventData.x,y=eventData.y;

data.lastX=data.x,data.lastY=data.y;//注入上一次的数据，为加速度做准备
data.x=x,data.y=y;
handle.move(tar,data,callback);
data.time=(+new Date);//时间用作加速度
},
up:function(e){  
 if(config.down!==true){return;} 
 var data=config.children[config.focus];  
config.down=false,data.upTime=(+new Date);//时间用作加速度
var data=config.children[config.focus],tar=config.target;

handle.up(tar,data,callback);
},
time:function(opt){//非手势事件，自动运行，比如轮播,但是在手势运行的过程中，不能够time。

var delay=config.delay,aim=opt.aim,gap=config.gap;
var name=config.name;id=aim.getAttribute("data-"+name+"-id"),data=null,children=config.children;
// var distanceLength=config.distance;
var distanceLength=+aim.getAttribute("data-"+name+"-distance");   //distance为每个具体委托到的dom的具体的子元素的distance
var length=+aim.getAttribute("data-"+name+"-length")
// if(!distanceLength){distanceLength=window.getComputedStyle(aim.childNodes[0],null)["height"];}
delay=delay?delay:0,gap=gap?gap:2000;//得到间隔和延迟事件
//绑定相关dom的id。是否拖拉是html写好的。
if(!id){id=config.id+=1;data=children[id]=config.create();aim.setAttribute("data-"+name+"-id",id);
// aim.addEventListener(emove,function(e){e.preventDefault();},false);
}
else{data=children[id];}//设置数据
data.distance=distanceLength,data.length=length;
aim=aim.children[0];
// if(data.gesture===true){return;}//表示手势在运行，不能自动播放
var tf=null;
var f=function(){//间隔周期运行
    if(tf&&tf.tf===0){return;}//上一次
    tf=handle.animate(aim,data);//每个animate的整体长度动画，有一个tf.tf=1;默认情况下，只有下一次animate运行的时候，上一次的tf.tf会清空为0
    setTimeout(f, gap);
}
setTimeout(function(){
    if(data.gesture!==true){f();}}, delay);
}
};
};




var drag=function(option){
var config=option.config,container=option.container,callback=option.callback,aim=option.aim;

var outConfig=createDragData(config);
if(typeof container==="string"){container=document.querySelector(container);}
var events=dragEvent(handleDragEvent,outConfig,callback);
// if(aim){aim=typeof aim==="string"?document.querySelector(aim):aim;
// events.time({aim:option.aim,gap:outConfig.gap,delay:outConfig.delay});
// }
container.addEventListener(edown,events.down,false);
container.addEventListener(emove,events.move,false);
container.addEventListener(eup,events.up,false);
container.addEventListener(eleave,events.up,false);
}

create("drag",drag);

});


// drag({container:document.getElementById("art"),config:{gap:3000,delay:0},aim:document.getElementById("cont")});