var Cat=function(){
};



var catPrototype=new Shape();

var _ear=function(c2d,x,y,wd,hg,rotate){
c2d.save();
    c2d.beginPath();
c2d.translate(x,y);
c2d.rotate(toArc(rotate));
c2d.moveTo(-wd/2,0);
c2d.quadraticCurveTo(-wd/2-5,-hg/2,0,-hg);
c2d.moveTo(wd/2,0);
c2d.quadraticCurveTo(wd/2+5,-hg/2,0,-hg);
  c2d.stroke();
  c2d.fill();
c2d.restore();
};

var _eye=function(c2d,x,y,r){
var aim=5,add=0.1;
this._arc(c2d,-x-5,-y,r);
this._arc(c2d,x-5,-y,r);
};


// var move
var _drawHead=function(c2d,wd,hg,rotate){
c2d.save();
console.log(rotate)
if(rotate){
c2d.rotate(rotate);
}
    var top=hg/2,top2=10,r=3;
this._ear(c2d,-wd/2,-top/3,wd/2,top/2,-30);
this._ear(c2d,wd/2,-top/3,wd/2,top/2,30);
      c2d.beginPath();
    c2d.moveTo(-wd,0);
    c2d.lineTo(0,10);
    c2d.lineTo(wd,0);
    c2d.quadraticCurveTo(0,-top,-wd,0);
    c2d.stroke();
  c2d.fill();

   this._ellipse(c2d,-wd/2,-top2,12,0.7,30);
   this._ellipse(c2d,wd/2,-top2,12,0.7,-30);

c2d.fillStyle="grey";
this._eye(c2d,wd/2,top2,r);

 c2d.fillStyle="transparent";
this._arc(c2d,0,0,7)

    c2d.beginPath();
    c2d.moveTo(-5,-5);
    c2d.lineTo(5,5);
    c2d.stroke();
   c2d.beginPath();
    c2d.moveTo(5,-5);
    c2d.lineTo(-5,5);
    c2d.stroke();

    c2d.restore();
}




var _drawBody=function(c2d,wd,hg){
 c2d.beginPath();
 c2d.moveTo(-wd/3,0);
 c2d.lineTo(-wd/1.5,hg);
c2d.lineTo(wd/1.5,hg);
c2d.lineTo(wd/3,0);
c2d.stroke();
c2d.fill();
};

var _drawTail=function(c2d,wd,hg){
 c2d.beginPath();
var x1=-wd/3,y1=hg/1.2,cx=-wd/3+100,cy=hg/1.2,x2=-wd/3+50,y2=hg/1.2-50;
var ts=this;
ts._ring(c2d,x1,y1,cx,cy,x2,y2,10,-10);
// ts._ring(c2d,x1,y1,cx+50,cy,x2,y2);
}

var draw=function(c2d,x,y,wd,hg,animate){
wd=wd?wd:100,hg=hg?hg:100;
c2d.save();
c2d.strokeStyle="black";
c2d.lineWidth=0.3;
c2d.fillStyle="#68B19E";
c2d.translate(x,y);
c2d.beginPath();
this._drawTail(c2d,wd,hg);
this._drawBody(c2d,wd,hg);
this._drawHead(c2d,wd,hg,toArc(5));
c2d.fill();
c2d.restore();
}


miniExtend(catPrototype,{
    draw:draw,
    _ear:_ear,
    _eye:_eye,
    _drawHead:_drawHead,
    _drawBody:_drawBody,
    _drawTail:_drawTail
});

Cat.prototype=catPrototype;


var c2d=document.getElementById("canv").getContext("2d");
var ct=new Cat();
var x=150,add=0.1;



var f=function(){
// c2d.clearRect(0,0,300,300)
x+=add;
ct.draw(c2d,x,120,40,100);


    // requestAnimationFrame(f);
}

f();


