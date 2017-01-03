task(function(size){
    var width=size.width,height=size.height;
    if(ifmobile){
        d3.select("#article").style({width:toPx(width),height:toPx(height),left:toPx(0),top:toPx(0),position:"absolute",display:"block"});
         d3.select("#map").style({width:toPx(width),height:toPx(height-100)});
         // d3.select("#game").style({position:"absolute","left":"0px","top":"0px"}).attr({width:0,height:0});
         // document.documentElement.addEventListener("touchmove",function(e){
         //    e.preventDefault();
         //    // return false;
         // },false );


    }
    else{
         d3.select("#article").style({width:toPx(width),height:toPx(height),left:"50%",top:"50%",position:"absolute",display:"block","margin-left":toPx(-width/2),"margin-top":toPx(-height/2)});
         d3.select("#map").style({width:toPx(width),height:toPx(height-100)});
         // d3.select("#game").style({position:"absolute","left":"0px","top":"0px"}).attr({width:0,height:0});
    }


        d3.select("#loop").attr({"data-jdrag":true,"data-jdrag-distance":width,"data-jdrag-length":4});
        d3.select("#loopContents").style({width:6*width+"px",height:"100%",position:"relative",left:-width+"px"});
        d3.selectAll(".loop-content-item").style({width:width+"px"});


},"size");
