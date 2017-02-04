
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