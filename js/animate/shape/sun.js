var Sun=function(){
}

var sunPrototype=new Shape();
miniExtend(sunPrototype,{
 constructor:Sun,
    draw:function(c2d,x,y,add,num){
        c2d.save();
        var lg=this._spin(c2d,x,y,add,num);
        for(var i=0;i<10;i+=1){
            this._ray(c2d,x,y+10,lg+20,10,36*i);
        }
        c2d.restore();
    },
    _ray:function(c2d,x,y,offsetR,r,deg){
        c2d.save();
        c2d.translate(x,y);
        c2d.beginPath();
        c2d.strokeStyle="red"
        var x=offsetR*Math.cos(toArc(deg)),y=offsetR*Math.sin(toArc(deg));
        var x1=r*Math.cos(toArc(deg))+x,y1=r*Math.sin(toArc(deg))+y;
        c2d.moveTo(x,y);
        c2d.lineTo(x1,y1);
        c2d.stroke();
        c2d.restore();
    },
    _spin:function(c2d,x,y,add,num){
         c2d.save();
         c2d.strokeStyle="red";
         c2d.translate(x,y);
         c2d.beginPath();
         c2d.moveTo(0,0);
         var start=add,offset;
         for(var i=0;i<num;i+=1){
            offset=Math.random()*8;
            if(i%2===0){
            c2d.quadraticCurveTo(-start*3.5,start,offset,start*2);
            }
            else{
                c2d.quadraticCurveTo(start*3.5,0,-offset,-start);
            }
            start+=add;
         }

         c2d.stroke();

        c2d.restore();
        return start;
    }
});

Sun.prototype=sunPrototype;
