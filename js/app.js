task(function(size,page,game,slider){
page.layout("article","canvas","canvasBall",size);
var c2d=$("canvas").getContext("2d");
var c2d2=$("canvasBall").getContext("2d");
var width=size.width,height=size.height;
game.begin(c2d,200,width,height);
var drawLine=game.drawLine;
slider(document.body,function(data){
  var focus=data.focus=drawLine(width,height);
  var article=$("article");
  var offsetX=article.offsetLeft,offsetY=article.offsetTop;
  data.offsetX=offsetX,data.offsetY=offsetY;
  var startX=data.startX,startY=data.startY;
  focus.start(startX-offsetX,startY-offsetY);
},function(data){
  var focus=data.focus;
  var offsetX=data.offsetX,offsetY=data.offsetY;
  var moveX=data.moveX,moveY=data.moveY;
  focus.draw(c2d2,moveX-offsetX,moveY-offsetY);
},function(data){
  var focus=data.focus;
  data.focus=null;
  focus.clear(c2d2);
});
},["size","page","game","slider"]);

