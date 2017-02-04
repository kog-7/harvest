
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

