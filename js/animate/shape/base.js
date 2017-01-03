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