module(function(create,size){
var width=size.width;

var outHtml=function(data){
    // console.error(data);
d3.select("#loopContents").selectAll(".loop-content-item").data(data).enter().append("div").attr("class","loop-content-item").attr("data-id",function(d,ind){return d.id;}).style({width:width+"px",height:"100%"}).append("span").attr({class:"loop-content-item-text"}).text(function(d,ind){
return d.name;
});

}

create("createLoop",outHtml);

},"size");