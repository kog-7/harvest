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

