var Rain=function(){

}


Rain.prototype={
constructor:Rain,
draw:function(){


},
_cloud:function(c2d,x,y,wd){//云朵是写死的暂时
    c2d.save();
    c2d.translate(x,y);
    c2d.beginPath();
     c2d.arc(-wd,0,8,0,Math.PI*2);
     c2d.arc(-wd+5,-10,7,0,Math.PI*2);
     c2d.arc(-wd+7,0,6,0,Math.PI*2);
     c2d.arc(-wd+11,-7,7,0,Math.PI*2);
     c2d.arc(-wd+17,0,9,0,Math.PI*2);
     c2d.arc(-wd+21,-8,6,0,Math.PI*2);
     c2d.arc(-wd+28,0,5,0,Math.PI*2);
    // c2d.stroke();
    c2d.fillStyle="grey";
    c2d.fill();
    c2d.restore();
}
}



var ss=new Rain();

var c2d=document.getElementById("canv").getContext("2d");
ss._cloud(c2d,20,20,10);