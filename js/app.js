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