module(function(create,size){
var width=size.width,height=size.height;
var svg=d3.select("#map").append("svg").attr("width",width).attr("height",height);

// var proj=d3.geo.mercator().center([105, 31]).translate([width/2,height/2]);
var proj=d3.geo.mercator().center([105, 31]).scale(width/1.3).translate([width/2,height/2]);
var path=d3.geo.path().projection(proj);

var signPath="path",signText="text";

var createMap=function(cback){
var outData={};
d3.json("./data/china.json",function(error, toporoot){
    //将TopoJSON对象转换成GeoJSON，保存在georoot中
    var georoot = topojson.feature(toporoot,toporoot.objects.china).features;
    //输出GeoJSON对象
    //包含中国各省路径的分组元素
    var china = svg.append("g");
    //添加中国各种的路径元素
    var provinces = china.selectAll("path")
            .data( georoot )
            .enter()
            .append("path")
            .attr("class","province")
            .attr("data-id",function(d,ind){
                // var geo=d.geometry.coordinates[0],n=geo.length;
                // var c=Math.floor(n/2);
                // var a=geo[c];
                // if(typeof a[0]!=="number"){a=a[0];}
                // var size={x:a[0],y:a[1]};
                return ind;})
            .attr("id",function(d,ind){return signPath+ind;})
            .attr("d", path);
       svg.selectAll("text")  
            .data(georoot)  
            .enter()  
            .append("text")   
            .attr("transform",function(d,i){
                var x,y;
                 if(d.properties.id =="20"){x=path.centroid(d)[0]-20,y=path.centroid(d)[1]+20;}
                 else{x=path.centroid(d)[0]-10,y=path.centroid(d)[1];}
                 var name=d.properties.NAME;
                 outData[i]={x:x,y:y,id:i,name:name};
                 return toTranslateVal(x,y);

   
             })
            .attr("data-id",function(d,ind){

                return ind;
            })
            .attr("id",function(d,ind){return signText+ind;})
             .style({"font-size":10,"text-anchor":"right",display:"none"})
             .text(function(d){return d.properties.NAME;});

            var lastFun=(function(){
                var node1,node2;
                return function(nd1,nd2){
                    if(nd1||nd2){node1=nd1,node2=nd2;
                       if(node1){node1.style.fill="#D7E6E4";}
                        if(node2){node2.style.display="block";}
                    }
                    else{
                        if(node1){node1.style.fill="#E4E4E4";}
                        if(node2){node2.style.display="none";}
                    }
                }
            })();



            svg.on(edown,function(){
                 var e=d3.event,tar=e.target;
                 var x=e.offsetX,y=e.offsetY;
                 //阻止默认，去除自动出现的灰色背景
                 e.preventDefault();
                 var tName=tar.tagName;
                 if(["path","text"].indexOf(tName)===-1){
                    lastFun();
                    return;}
                 var id=tar.getAttribute("data-id"),path,text;

                // var ob=outData[id];
                 tName==="path"?(path=tar,text=$(signText+id)):(text=tar,path=$(signPath+id));
                 lastFun();
                 lastFun(path,text);
            })
cback(outData,lastFun);
});

}



create("map",createMap); 
},["size"]);