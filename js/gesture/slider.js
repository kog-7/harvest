module(function(create,size){
  var slider=function(dom,startCallback,moveCallback,upCallback){
    var data={down:false,startX:0,startY:0,moveX:0,moveY:0};
    dom.addEventListener(edown,function(e){
      data.down=true;
      var xy=eventXY(e),x=xy.x,y=xy.y;
      data.startX=x,data.startY=y;
      startCallback(data);
    },false);
    dom.addEventListener(emove,function(e){
      e.preventDefault();
      e.stopPropagation();
      if(data.down!==true){return;}
      var xy=eventXY(e),x=xy.x,y=xy.y;
      data.moveX=x,data.moveY=y;
      moveCallback(data);
    });
    dom.addEventListener(eup,function(e){
      if(data.down!==true){return;}
      data.down=false;
      upCallback(data);
    });
  }
  
  create("slider",slider)
},["size"]);