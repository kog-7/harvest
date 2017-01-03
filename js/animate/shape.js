module(function(create,size){

'@include(./shape/base.js)'
'@include(./shape/sun.js)'
'@include(./shape/snow.js)'
create("shape",{sun:Sun,snow:Snow});

},["size"]);