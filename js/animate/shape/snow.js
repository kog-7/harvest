var Snow=function(){
this.control=[];
this.store=[];
}

var snowProtype=new Shape();

miniExtend(snowProtype,{
 constructor:Snow,
 _clear:function(){
    this.control.forEach(function(val){val.tf=0;});this.control=[];   
    this.store=[]; 
 },
 _random:function(wd,hg){
    var x=Math.random()*wd,y=Math.random()*hg;
    var scale=Math.random(),r=2*scale;r=r>1?r:1;
    return {x:x,y:y,r:r};
 },
 draw:function(c2d,wd,hg,no){
  
    no=no?no:1;
    var temp,ts=this,store=ts.store;
    ts._clear();
    for(var i=0;i<no;i+=1){
        temp=ts._random(wd,hg);
        store.push(temp);
    }

    var tf={tf:1};ts.control.push(tf);
    var f=function(){
          c2d.clearRect(0,0,wd,hg);
          if(tf.tf===0){return;}
        store.forEach(function(ob){
            ts._draw(c2d,ob.x,ob.y,ob.r);
            var y=ob.y+=0.05;
            if(y>hg+8){ob.y=0;}
        })
        requestAnimationFrame(f);
    }
    f();

 },
    _draw:function(c2d,x,y,r){
        c2d.save();
        c2d.translate(x,y);
        // c2d.rotate(toArc(rotate));
        // c2d.scale(0.5,0.5);
        // c2d.lineWidth=0.2;
        c2d.fillStyle="#E4D623";
    
         c2d.beginPath();
        // c2d.moveTo(0,r+3);
        // c2d.arcTo(r*2,0,0,-(r+3),r+3);
        // c2d.arcTo(-r*2,0,0,(r+3),r+3);
        c2d.arc(0,0,r,0,2*Math.PI);
         // c2d.stroke();

    //     c2d.beginPath();
    //     c2d.moveTo(0,r);
    // c2d.arcTo(r*2,0,0,-r,r);
    //     c2d.arcTo(-r*2,0,0,r,r);
       
    //     c2d.stroke();
    c2d.fill();

        // r=r+2;
/*        c2d.beginPath();
        c2d.moveTo(-r,-r);
        c2d.lineTo(r,r);
         c2d.stroke();
        c2d.beginPath();
        c2d.moveTo(r,-r);
        c2d.lineTo(-r,r);
         c2d.stroke();*/
        c2d.restore();
    }
})



Snow.prototype=snowProtype;
