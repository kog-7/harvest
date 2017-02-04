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