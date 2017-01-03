var drawEnv=function(c2d,wd,hg){
c2d.beginPath();
var grd=c2d.createRadialGradient(wd/2,hg/2,0,wd/2,hg/2,wd);
grd.addColorStop(0.6,"#111015");
grd.addColorStop(0.3,"#193334");
// grd.addColorStop(0.1,"#193936");
grd.addColorStop(0,"#1E5B54");
c2d.fillStyle=grd;
c2d.fillRect(0,0,wd,hg);
}

var c2d=document.getElementById("canv").getContext("2d");
drawEnv(c2d,300,300);