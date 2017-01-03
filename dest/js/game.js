


//game scope 

(function(){

// 根据判断重载手机端或者pc端事件
// 依赖
var ifmobile = (function() {
    var ua = navigator.userAgent;
    if (ua.match(/AppleWebKit.*Mobile/) || !!ua.match(/Windows Phone/) || !!ua.match(/Android/) || !!ua.match(/MQQBrowser/) || screen.availWidth < 500) {
        return true;
    } else {
        return false;
    }
})();


    (function() {
  var agent = ['webkit', 'moz'];
  var tf = !window.requestAnimationFrame;
  var i = 0;
  tf?(
    agent.forEach(function(val,ind){ 
    window.requestAnimationFrame = window[agent[i] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[val + 'CancelAnimationFrame'] ||window[val + 'CancelRequestAnimationFrame'];}
    )):(
    window.requestAnimationFrame = function(callback) {return setTimeout(callback, 1000 / 60)},
    window.cancelAnimationFrame = function(id) {clearTimeout(id);}
    );
}());

    var toArc=function(angle){
return angle*Math.PI/180;
}

var typeHim = function(dm) {
  if (dm === undefined) {
    return "undefined";
  }
  if (dm === null) {
    return "null";
  }
  var tp = typeof dm;
  if (tp === "string" || tp === "number" || tp === "function") {
    return tp;
  }
  tp = Object.prototype.toString.call(dm);
  if (tp.indexOf("rray") !== -1 || tp.indexOf("rguments") !== -1) {
    return "array";
  } else if (tp.indexOf("ragment") !== -1) {
    return "fragment"
  } else if (tp.indexOf("odeList") !== -1) {
    return "nodelist";
  } else if (tp.indexOf("lement") !== -1) {
    return "node";
  } else if (tp.indexOf("egExp") !== -1) {
    return "regexp";
  } else if (tp.indexOf("bject") !== -1) {
    return "object";
  } else {
    return false;
  }
};

var miniExtend = function(aob, ob) {
  var i = null;
  for (i in ob) {
    if (!(i in aob)) {
      aob[i] = ob[i];
    }
  }
  return aob;
}

var coverExtend = function(aob, ob) {
  var i = null;for (i in ob) {aob[i] = ob[i];}
  return aob;
}

   var createInherit = function(fromProOb, opt) {
        // if(Object.create){return Object.create(from);}
        var f = function() {};
        var ob = null;
        f.prototype = fromProOb;
        ob = new f();
        if (opt) {
            coverExtend(ob, opt);
        }
        return ob;
    };
    var toTranslateVal=function(x,y){
    return "translate("+x+","+y+")";
}
    var toTranslate=function(x,y){
    return "translate("+x+"px,"+y+"px)";
}
    var copyObject=function(obj,fun){
        var ob={},val=null;
        for(var i in obj){ob[i]=typeof fun==="function"?(val=fun(obj[i])):obj[i];}
        return ob;
    }

var $=function(id){
return document.getElementById(id);
}
var $all=function(cla){
return document.querySelectorAll(cla);
}

    var valPx=function(str){
return +(str.slice(0,-2));
}

var toPx=function(val){
    return val+"px";
}


var edown="mousedown",emove="mousemove",eup="mouseup",eleave="mouseleave";
if(ifmobile){
    edown="touchstart",emove="touchmove",eup="touchend",eleave="touchcancel";
}

var eventXY = function(e, no) {
    var x, y;
    var tous = null;
    if ("touches" in e) {
        tous = "touches";
    } else {
        tous = "changedTouches";
    }
    if (ifmobile) {
        if (no !== undefined) {
            x = e[tous][no].clientX;
            y = e[tous][no].clientY;
        } else {
            x = e[tous][0].clientX;
            y = e[tous][0].clientY;
        }
    } else {
        x = e.clientX, y = e.clientY;
    }
    return {
        x: x,
        y: y
    };
}


var transform="transform";if(typeof document.createElement("div").style.webkitTransform!==undefined)transform="webkitTransform";


var easeValue = function(opt) { //spring为弹簧系数，aim为目标值，now为当前值。
    var aimx = opt.aim,
        nowx = opt.now,
        spring = opt.spring;
    var dx = aimx - nowx;
    var ea = dx * spring; //求出目标位置和当前位置的差值再乘以弹簧系数，那么这个ea会越来越小，那么就会缓动
    opt.now += ea;
    if (Math.abs(ea) < 0.01) {
        return false;
    } else {
        return true;
    }
}

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

module(function(create){
var bigWidth,bigHeight,bigLeft,bigTop;
if(ifmobile){
  bigWidth=document.documentElement.clientWidth,bigHeight=document.documentElement.clientHeight,bigLeft=bigTop=0;
}
else{
      bigWidth=600,bigHeight=600;
}
create("size",{width:bigWidth,height:bigHeight});
});
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
task(function(size){
    var width=size.width,height=size.height;
    if(ifmobile){
        d3.select("#article").style({width:toPx(width),height:toPx(height),left:toPx(0),top:toPx(0),position:"absolute",display:"block"});
         d3.select("#map").style({width:toPx(width),height:toPx(height-100)});
         // d3.select("#game").style({position:"absolute","left":"0px","top":"0px"}).attr({width:0,height:0});
         // document.documentElement.addEventListener("touchmove",function(e){
         //    e.preventDefault();
         //    // return false;
         // },false );


    }
    else{
         d3.select("#article").style({width:toPx(width),height:toPx(height),left:"50%",top:"50%",position:"absolute",display:"block","margin-left":toPx(-width/2),"margin-top":toPx(-height/2)});
         d3.select("#map").style({width:toPx(width),height:toPx(height-100)});
         // d3.select("#game").style({position:"absolute","left":"0px","top":"0px"}).attr({width:0,height:0});
    }


        d3.select("#loop").attr({"data-jdrag":true,"data-jdrag-distance":width,"data-jdrag-length":4});
        d3.select("#loopContents").style({width:6*width+"px",height:"100%",position:"relative",left:-width+"px"});
        d3.selectAll(".loop-content-item").style({width:width+"px"});


},"size");
module(function(create,size){
var width=size.width;

var outHtml=function(data){
    // console.error(data);
d3.select("#loopContents").selectAll(".loop-content-item").data(data).enter().append("div").attr("class","loop-content-item").attr("data-id",function(d,ind){return d.id;}).style({width:width+"px",height:"100%"}).append("span").attr({class:"loop-content-item-text"}).text(function(d,ind){
return d.name;
});

}

create("createLoop",outHtml);

},"size");
module(function(create,size){
var width=size.width,height=size.height;
var svg=d3.select("#map").append("svg").attr("width",width).attr("height",height);

// var proj=d3.geo.mercator().center([105, 31]).translate([width/2,height/2]);
var proj=d3.geo.mercator().center([105, 31]).scale(width/1.3).translate([width/2,height/2]);
var path=d3.geo.path().projection(proj);

var signPath="path",signText="text";

var createMap=function(cback){
var outData={};
d3.json("./data/china.json",function(error, toporoot){
    //将TopoJSON对象转换成GeoJSON，保存在georoot中
    var georoot = topojson.feature(toporoot,toporoot.objects.china).features;
    //输出GeoJSON对象
    //包含中国各省路径的分组元素
    var china = svg.append("g");
    //添加中国各种的路径元素
    var provinces = china.selectAll("path")
            .data( georoot )
            .enter()
            .append("path")
            .attr("class","province")
            .attr("data-id",function(d,ind){
                // var geo=d.geometry.coordinates[0],n=geo.length;
                // var c=Math.floor(n/2);
                // var a=geo[c];
                // if(typeof a[0]!=="number"){a=a[0];}
                // var size={x:a[0],y:a[1]};
                return ind;})
            .attr("id",function(d,ind){return signPath+ind;})
            .attr("d", path);
       svg.selectAll("text")  
            .data(georoot)  
            .enter()  
            .append("text")   
            .attr("transform",function(d,i){
                var x,y;
                 if(d.properties.id =="20"){x=path.centroid(d)[0]-20,y=path.centroid(d)[1]+20;}
                 else{x=path.centroid(d)[0]-10,y=path.centroid(d)[1];}
                 var name=d.properties.NAME;
                 outData[i]={x:x,y:y,id:i,name:name};
                 return toTranslateVal(x,y);

   
             })
            .attr("data-id",function(d,ind){

                return ind;
            })
            .attr("id",function(d,ind){return signText+ind;})
             .style({"font-size":10,"text-anchor":"right",display:"none"})
             .text(function(d){return d.properties.NAME;});

            var lastFun=(function(){
                var node1,node2;
                return function(nd1,nd2){
                    if(nd1||nd2){node1=nd1,node2=nd2;
                       if(node1){node1.style.fill="#D7E6E4";}
                        if(node2){node2.style.display="block";}
                    }
                    else{
                        if(node1){node1.style.fill="#E4E4E4";}
                        if(node2){node2.style.display="none";}
                    }
                }
            })();



            svg.on(edown,function(){
                 var e=d3.event,tar=e.target;
                 var x=e.offsetX,y=e.offsetY;
                 //阻止默认，去除自动出现的灰色背景
                 e.preventDefault();
                 var tName=tar.tagName;
                 if(["path","text"].indexOf(tName)===-1){
                    lastFun();
                    return;}
                 var id=tar.getAttribute("data-id"),path,text;

                // var ob=outData[id];
                 tName==="path"?(path=tar,text=$(signText+id)):(text=tar,path=$(signPath+id));
                 lastFun();
                 lastFun(path,text);
            })
cback(outData,lastFun);
});

}



create("map",createMap); 
},["size"]);

module(function(create,size){

var Shape=function(){

}

Shape.prototype={
constructor:Shape,
_ellipse:function(c2d,x,y,r,rate,rotate){
c2d.save();
c2d.translate(x,y);
c2d.rotate(toArc(rotate));
c2d.beginPath();
c2d.scale(1,rate);
c2d.arc(0,0,r,0,Math.PI*2);
c2d.stroke();
c2d.fill();
c2d.restore();
},
_arc:function(c2d,x,y,r){
    c2d.save();
    c2d.beginPath();
    c2d.translate(x,y);
    c2d.arc(0,0,r,0,2*Math.PI);
  c2d.stroke();
  c2d.fill();
  c2d.restore();
},
_ring:function(c2d,x1,y1,cx,cy,x2,y2,offsetX,offsetY){
c2d.beginPath();
c2d.moveTo(x1,y1);
c2d.bezierCurveTo(cx,cy,x2+25,y2-50,x2,y2);
c2d.stroke();
c2d.beginPath();
c2d.moveTo(x1,y1);
c2d.bezierCurveTo(cx,cy,x2+25+offsetX,y2-50+offsetY,x2,y2);
c2d.stroke();
}
}
var Sun=function(){
}

var sunPrototype=new Shape();
miniExtend(sunPrototype,{
 constructor:Sun,
    draw:function(c2d,x,y,add,num){
        c2d.save();
        var lg=this._spin(c2d,x,y,add,num);
        for(var i=0;i<10;i+=1){
            this._ray(c2d,x,y+10,lg+20,10,36*i);
        }
        c2d.restore();
    },
    _ray:function(c2d,x,y,offsetR,r,deg){
        c2d.save();
        c2d.translate(x,y);
        c2d.beginPath();
        c2d.strokeStyle="red"
        var x=offsetR*Math.cos(toArc(deg)),y=offsetR*Math.sin(toArc(deg));
        var x1=r*Math.cos(toArc(deg))+x,y1=r*Math.sin(toArc(deg))+y;
        c2d.moveTo(x,y);
        c2d.lineTo(x1,y1);
        c2d.stroke();
        c2d.restore();
    },
    _spin:function(c2d,x,y,add,num){
         c2d.save();
         c2d.strokeStyle="red";
         c2d.translate(x,y);
         c2d.beginPath();
         c2d.moveTo(0,0);
         var start=add,offset;
         for(var i=0;i<num;i+=1){
            offset=Math.random()*8;
            if(i%2===0){
            c2d.quadraticCurveTo(-start*3.5,start,offset,start*2);
            }
            else{
                c2d.quadraticCurveTo(start*3.5,0,-offset,-start);
            }
            start+=add;
         }

         c2d.stroke();

        c2d.restore();
        return start;
    }
});

Sun.prototype=sunPrototype;
var Snow=function(){
this.control=[];
this.store=[];
}

var snowProtype=new Shape();

miniExtend(snowProtype,{
 constructor:Snow,
 _clear:function(){
    this.control.forEach(function(val){val.tf=0;});this.control=[];   
    this.store=[]; 
 },
 _random:function(wd,hg){
    var x=Math.random()*wd,y=Math.random()*hg;
    var scale=Math.random(),r=2*scale;r=r>1?r:1;
    return {x:x,y:y,r:r};
 },
 draw:function(c2d,wd,hg,no){
  
    no=no?no:1;
    var temp,ts=this,store=ts.store;
    ts._clear();
    for(var i=0;i<no;i+=1){
        temp=ts._random(wd,hg);
        store.push(temp);
    }

    var tf={tf:1};ts.control.push(tf);
    var f=function(){
          c2d.clearRect(0,0,wd,hg);
          if(tf.tf===0){return;}
        store.forEach(function(ob){
            ts._draw(c2d,ob.x,ob.y,ob.r);
            var y=ob.y+=0.05;
            if(y>hg+8){ob.y=0;}
        })
        requestAnimationFrame(f);
    }
    f();

 },
    _draw:function(c2d,x,y,r){
        c2d.save();
        c2d.translate(x,y);
        // c2d.rotate(toArc(rotate));
        // c2d.scale(0.5,0.5);
        // c2d.lineWidth=0.2;
        c2d.fillStyle="#E4D623";
    
         c2d.beginPath();
        // c2d.moveTo(0,r+3);
        // c2d.arcTo(r*2,0,0,-(r+3),r+3);
        // c2d.arcTo(-r*2,0,0,(r+3),r+3);
        c2d.arc(0,0,r,0,2*Math.PI);
         // c2d.stroke();

    //     c2d.beginPath();
    //     c2d.moveTo(0,r);
    // c2d.arcTo(r*2,0,0,-r,r);
    //     c2d.arcTo(-r*2,0,0,r,r);
       
    //     c2d.stroke();
    c2d.fill();

        // r=r+2;
/*        c2d.beginPath();
        c2d.moveTo(-r,-r);
        c2d.lineTo(r,r);
         c2d.stroke();
        c2d.beginPath();
        c2d.moveTo(r,-r);
        c2d.lineTo(-r,r);
         c2d.stroke();*/
        c2d.restore();
    }
})



Snow.prototype=snowProtype;
create("shape",{sun:Sun,snow:Snow});

},["size"]);

task(function(size,drag,map,shape,createLoop){

var snow=new shape.snow();
// console.log(shape);

map(function(mapData,click){

var ob1=mapData[0],ob2=mapData[1],ob3=mapData[9],ob4=mapData[17],ob5=mapData[25],ob6=mapData[30];//临时创建几个数据
var arr=[ob6,ob1,ob2,ob3,ob4,ob5,ob6,ob1];
createLoop(arr);


drag({container:document.body,callback:function(item){

item=Math.floor(Math.abs(item));
var dom=$all(".loop-content-item")[item];
var focus=dom.getAttribute("data-id"),data=mapData[focus];
var canv=d3.select("#game");
click();
click($("path"+focus),$("text"+focus));
canv.style({left:data.x+"px",top:(data.y+3)+"px",display:"block"});
snow.draw(canv.node().getContext("2d"),30,30,15);

}});



})


},["size","drag","map","shape","createLoop"]);



    
})()
