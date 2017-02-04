
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

