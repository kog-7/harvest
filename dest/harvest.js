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
  
var namespace=function(gbl,scope){
//工具
var getValue=function(attr,obj){
var out=obj;
return attr.indexOf(".")!==-1?(attr.split(".").forEach(function(val){out[val]&&(out=out[val])}),out):out[attr];
};

//参数与函数覆盖
scope=scope?scope:window,namespace=null;

var create=function(name,val){//创建属性
var arr=name.split("."),lg=arr.length;
if(lg===1){gbl[name]=val;} 
else{
  var i=0,temp=null,tp;
  for(;i<lg-1;i+=1){
    temp=gbl[arr[i]],tp=typeof temp;
    if(["undefined","object"].indexOf(tp)===-1){return false;}
    tp==="undefined"&&(temp=gbl[arr[i]]={});
  }
  gbl[arr[i]]=val;
}
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


module(function(create,size){
  var slider=function(dom,startCallback,moveCallback,upCallback){
    var data={down:false,startX:0,startY:0,moveX:0,moveY:0};
    dom.addEventListener(edown,function(e){
      data.down=true;
      var xy=eventXY(e),x=xy.x,y=xy.y;
      data.startX=x,data.startY=y;
      startCallback(data);
    },false);
    dom.addEventListener(emove,function(e){
      e.preventDefault();
      e.stopPropagation();
      if(data.down!==true){return;}
      var xy=eventXY(e),x=xy.x,y=xy.y;
      data.moveX=x,data.moveY=y;
      moveCallback(data);
    });
    dom.addEventListener(eup,function(e){
      if(data.down!==true){return;}
      data.down=false;
      upCallback(data);
    });
  }
  
  create("slider",slider)
},["size"]);



module(function(create){
  
  
  function Line (x1, y1, x2, y2) {
    this.x = x1;
    this.y = y1;
    this.x1=this.y1=0;
    // this.x1 = (x1 === undefined) ? 0 : x1;
    // this.y1 = (y1 === undefined) ? 0 : y1;
    this.x2 = (x2 === undefined) ? 0 : x2;
    this.y2 = (y2 === undefined) ? 0 : y2;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.lineWidth = 1;
    
  }
  
  Line.prototype={
    draw:function (context,x2,y2) {
      var x=this.x,y=this.y;
    (x2!==undefined)&&(this.x2=x2-x);
    (y2!==undefined)&&(this.y2=y2-y);
    if(this.x2<0){return;}
    context.save(); context.translate(this.x, this.y); context.rotate(this.rotation); context.scale(this.scaleX, this.scaleY); context.lineWidth = this.lineWidth; context.beginPath();
    context.strokeStyle="rgb(180,180,180)";
     context.moveTo(this.x1, this.y1); context.lineTo(this.x2, this.y2); context.closePath(); context.stroke(); context.restore();
   },
   getDeg:function(){
     return Math.atan2(this.y2-this.y1,this.x2-this.x1);
   }
    // getBounds:function () {
    //   if (this.rotation === 0) {
    //     var minX = Math.min(this.x1, this.x2),
    //         minY = Math.min(this.y1, this.y2),
    //         maxX = Math.max(this.x1, this.x2),
    //         maxY = Math.max(this.y1, this.y2);
    //     return {
    //       x: this.x + minX,
    //       y: this.y + minY,
    //       width: maxX - minX,
    //       height: maxY - minY
    //     }
    //   } else {
    //     var sin = Math.sin(this.rotation),
    //         cos = Math.cos(this.rotation),
    //         x1r = cos * this.x1 + sin * this.y1,
    //         x2r = cos * this.x2 + sin * this.y2,
    //         y1r = cos * this.y1 + sin * this.x1,
    //         y2r = cos * this.y2 + sin * this.x2;
    //     return {
    //       x: this.x + Math.min(x1r, x2r),
    //       y: this.y + Math.min(y1r, y2r),
    //       width: Math.max(x1r, x2r) - Math.min(x1r, x2r),
    //       height: Math.max(y1r, y2r) - Math.min(y1r, y2r)
    //     };
    //   }
    // }
  };
  

  
  create("line",Line);
  
});
module(function(create){

  function Ball (radius, color) {
  if (radius === undefined) { radius = 40; }
  if (color === undefined) { color = "#ff0000"; }
  this.x = 0;
  this.y = 0;
  // this.xpos = 0;
  // this.ypos = 0;
  // this.zpos = 0;
  this.radius = radius;
  this.vx = 0;
  this.vy = 0;
  // this.vz = 0;
  this.mass = 1;
  this.rotation = 0;
  this.scale = 1;
  // this.scaleY = 1;
  // this.color = utils.parseColor(color);
  this.lineWidth = 0;
  this.visible = true;
  // this.fillStyle=0;

  // var r=Math.random()*255+50, g=Math.random()*255+10, b=Math.random()*255+30;
  
  // r=r>255?255:r;
  // g=g>255?255:g;
  // b=b>255?255:b;
  // this.r=r,this.g=g,this.b=b;
}

Ball.prototype={
  constructor:Ball,
  draw:function (context) {
    var scale=this.scale;
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(scale, scale);
    var opa=scale+0.2;
    opa>1?opa=1:opa;
    // if(opa<0.1){opa=0;}
    // console.log(opa)
    
    context.fillStyle=getRgb(200,10,10,opa);
    
    
    // console.log(getRgb(200,10,10,opa))
    // console.log(getRgb(this.r,this.g,this.b,opa))
    context.lineWidth = this.lineWidth;
    // context.fillStyle = this.color;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
    context.closePath();

    context.fill();
    if (this.lineWidth > 0) {
      context.stroke();
    }
    context.restore();
  }
  // draw2:function(context){
  //   context.save();
  //   context.translate(this.oriX, this.oriY);
  //   context.scale(this.scale, this.scale);
  //   this.draw(context);
  //   context.restore();
  // }
  
}

  
    create("ball",Ball);
  
});


module(function(create,ball){

  var Tree=function() {
    this.x = 0;
    this.y = 0;
    this.xpos = 0;
    this.ypos = 0;
    this.zpos = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = "#ffffff";
    this.alpha = 1;
    this.lineWidth =1;
    this.branch = [];
    //generate some random branch positions
    this.branch[0] = -320 - Math.random() * 20;
    this.branch[1] = -30 - Math.random() * 30;
    this.branch[2] = Math.random() * 80 - 40;
    this.branch[3] = -100 - Math.random() * 40;
    this.branch[4] = -60 - Math.random() * 40;
  this.branch[5] = Math.random() * 60 - 30;
    this.branch[6] = -110 - Math.random() * 20;
    var tBall=this.ball=new ball();
    tBall.tree=this;
    this.ballRadius=0.2+Math.random()*0.6;
  }

  
  Tree.prototype.draw = function (context) {
    var scale=this.scaleX;
    var newBall=false,tball=this.ball;
    
    context.save();
    context.translate(this.x, this.y);
    context.scale(scale,scale);
    context.lineWidth = this.lineWidth;

    

    context.strokeStyle="rgba(0,0,0,"+(scale+0.5)+")";

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, this.branch[0]);
    context.moveTo(0, this.branch[1]);
    context.lineTo(this.branch[2], this.branch[3]);
    context.moveTo(0, this.branch[4]);
    var endX=this.branch[5],endY=this.branch[6];
    // var tball=this.ball;
    
    
    
    context.lineTo(endX,endY);
    context.stroke();

  if(scale<=this.ballRadius){
    if(this.ball===null){
      tball=this.ball=new ball(),tball.tree=this;
      newBall=true;
    }
    tball.x=endX,tball.y=endY,tball.scale=scale;
    
    tball.oriX=(this.x)+endX*scale,tball.oriY=(this.y)+endY*scale;
    
    // tball.oriX=this.x+0,tball.oriY=this.y+0;
    tball.draw(context);
    tball.visible=true;
  }
  else{
    if(tball){
    tball.visible=false;
  }
  }
    context.restore();
  return {new:newBall,ball:tball};
    
  };
  
    create("tree",Tree);
  
},["ball"]);

module(function(create,tree,line){

var trees=[],balls=[],flyBalls=[],lines=[];

var beginGame=function(c2d,ballNo,width,height){
    var i=0,tempTree=null,tempBall=null;
    
    var vz=0,friction = 0.98,vpX=width/2,vpY=height/2.8,floor=vpY,fl=260;

    
    for(;i<ballNo;i+=1){
        tempTree=new tree();
      tempTree.xpos = Math.random() * 2000 - 1000;
      tempTree.ypos = floor;
      tempTree.zpos = Math.random() * 10000;
      // console.log(tempTree.zpos)
      trees.push(tempTree);
      balls.push(tempTree.ball);
    }
    
    
    var _zMove=function(tr){
        tr.zpos += vz;
        if (tr.zpos < -fl) {
          tr.zpos += 10000;
        }
        if (tr.zpos > 10000 - fl) {
          tr.zpos -= 10000;
        }
        var scale = fl / (fl + tr.zpos);
        tr.scaleX = tr.scaleY = scale;
        tr.x = vpX + tr.xpos * scale;
        tr.y = vpY + tr.ypos * scale;
    // tr.alpha = scale;
      }
    
    

    var _st=function(a, b) {
        return (b.zpos - a.zpos);
      };
      
      var _draw=function(tr){
        var ballOb=tr.draw(c2d),ball=ballOb.ball;
        if(ballOb.new===true){//如果为新的ball
          balls.push(ballOb.ball);
        }
      }
      
      
    var _clearBall=function(ball,i){
      if(ball.visible===true){return;}
      var scale=ball.scale;
      var tree=ball.tree;
      ball.x=ball.oriX,ball.y=ball.oriY;

      ball.tree=null;
      tree.ball=null;
      balls.splice(i,1);
      
      if(scale>0.76){return;}
      ball.radius=ball.radius*scale*scale,ball.scale=1;
      var vx=(ball.x/width)*3;
      ball.vx=ball.x>width/2?-vx:vx,ball.vy=-(ball.y/height)*10;
      flyBalls.push(ball);
    };
    
    
    var _fly=function(ball,i,c2d){
        var vx=ball.vx,vy=ball.vy+=0.1;
        ball.x+=vx,ball.y+=vy;
        lines.forEach(function(ln){
          // console.log(ln);
          collisionBallLine(ball,ln,ln.getDeg(),0.5);
        });
        var inRect=containsRect(ball,width,height);
        inRect===false?(flyBalls.splice(i,1)):ball.draw(c2d);
    };
    
    var no=0;
    
    (function f(){
      // no+=1;
      // if(no>500){return;}
      requestAnimationFrame(f);
      c2d.clearRect(0,0,width,height);
      trees.forEach(_zMove);
      vz *= friction;
      trees.sort(_st);
      trees.forEach(_draw);
      
      var lg=balls.length,i=lg-1;
      for(;i>=0;i-=1){
        _clearBall(balls[i],i);
      }
      var lg2=flyBalls.length,i=lg2-1;
  
      for(;i>=0;i-=1){
        _fly(flyBalls[i],i,c2d);
      }
      vz-=0.1;
    })()
}    
    
// var ln=new line();

var drawAllLine=function(c2d,ln,width,height,endX,endY){
  c2d.clearRect(0,0,width,height);
  if(ln){
  var ind=lines.indexOf(ln);
  if(ind===-1){return;}
}
  lines.forEach(function(l,ind){
    if(ln&&l===ln){
        l.draw(c2d,endX,endY);
    }
    else{
      l.draw(c2d);
    }
  });
};

var drawLine=function(width,height){
  return {
    start:function(startX,startY){
      var ln=this.line=new line(startX,startY);
      lines.push(ln);
    },
    draw:function(c2d,endX,endY){
      var ln=this.line;
      drawAllLine(c2d,ln,width,height,endX,endY);
    },
    clear:function(c2d){
      var ln=this.line;
      var ind=lines.indexOf(ln);
      lines.splice(ind,1);  
      drawAllLine(c2d,null,width,height);
    }
  }
}


    
    
    
    create("game",{
      drawLine:drawLine,
      begin:beginGame
    });
  
},["tree","line"]);



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
  

var beginControl={
  
  
}


  
  

  
});



module(function(create){
  

var layout=function(dom,canvas,canvas2,size){
  var style=$(dom).style,wd=size.width,hg=size.height;
  coverExtend(style,{width:toPx(wd),height:toPx(hg),marginLeft:toPx(-wd/2),marginTop:toPx(-hg/2)});  
  coverExtend($(canvas),{width:wd,height:hg});  
  coverExtend($(canvas2),{width:wd,height:hg});  
};
  

create("page",{
  layout:layout
});  
  
},["size"]);



task(function(size,page,game,slider){
page.layout("article","canvas","canvasBall",size);
var c2d=$("canvas").getContext("2d");
var c2d2=$("canvasBall").getContext("2d");
var width=size.width,height=size.height;
game.begin(c2d,200,width,height);
var drawLine=game.drawLine;
slider(document.body,function(data){
  var focus=data.focus=drawLine(width,height);
  var article=$("article");
  var offsetX=article.offsetLeft,offsetY=article.offsetTop;
  data.offsetX=offsetX,data.offsetY=offsetY;
  var startX=data.startX,startY=data.startY;
  focus.start(startX-offsetX,startY-offsetY);
},function(data){
  var focus=data.focus;
  var offsetX=data.offsetX,offsetY=data.offsetY;
  var moveX=data.moveX,moveY=data.moveY;
  focus.draw(c2d2,moveX-offsetX,moveY-offsetY);
},function(data){
  var focus=data.focus;
  data.focus=null;
  focus.clear(c2d2);
});
},["size","page","game","slider"]);



})()