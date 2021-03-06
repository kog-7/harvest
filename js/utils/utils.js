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


//判断一个形状是否超过设置的矩形范围，true为在里面，false为超过
var containsRect=function(ball,bwidth,bheight){
var x=ball.x,y=ball.y,r=ball.radius,bx=0,by=0;
return !(x+r<bx||x-r>bx+bwidth||y+r<by||y-r>by+bheight);//一个外面的都不满足，那么就在里面
}


var collisionBallLine=function(ball,line,deg,bounce){
  var sin=Math.sin(deg),cos=Math.cos(deg);
  var distanceX=ball.x-line.x,distanceY=ball.y-line.y;
  var newDistanceX=distanceX*cos+distanceY*sin,newDistanceY=distanceY*cos-distanceX*sin;
  var newVx=newVy=null;
  //如下是把所有的线都旋转成水平的方向，都是假设从上面落到线上,
  if(newDistanceY>-ball.radius&&ball.x<line.x2+line.x&&ball.x>line.x){
     newVx=ball.vx*cos+ball.vy*sin,newVy=ball.vy*cos-ball.vx*sin;
     newDistanceY=-ball.radius,newVy*=bounce;
     distanceX=newDistanceX*cos-newDistanceY*sin,distanceY=newDistanceY*cos+newDistanceX*sin;
     //更变速度为下一次内容准备
    ball.vx=newVx*cos-newVy*sin,ball.vy=newVy*cos+newVx*sin;
    //重置ball的x，y，一般情况下，在递归中，ball.x会自动运行
    ball.x=line.x+distanceX,ball.y=line.y+distanceY;
  
  }
};

var getRgb=function(r,g,b,t){
  return "rgba("+r+","+g+","+b+","+t+")";
}







