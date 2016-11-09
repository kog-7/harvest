/*
 * @Author: jxj
 * @Date:   2016-10-17 21:36:37
 * @Last Modified by:   jxj
 * @Last Modified time: 2016-11-09 11:37:54
 */

'use strict';

var fs = require("fs");

var format = require("./format.js");

var render = require("./render.js");

var tool = require("./base.js");

var typeHim = tool.typeHim,
    isEmptyObject = tool.isEmptyObject,
    miniExtend = tool.miniExtend,
    createInherit = tool.createInherit;
var simpleUrl = tool.simpleUrl;
var depExtend = tool.depExtend;
var syncOb = require("./sync.js");
var sync = syncOb.sync;
var collect = syncOb.collect;


var path = require("path");
// var urlMy = function(url) {
//     if (url.slice(-1) !== "\/") {
//         url = url + "\/";
//     }
//     return url;
// }



var packJs = function() {}
var packJsPrototype = new render();


//入口的设置+配置读取

//设置同步读取文件的
var readData = function(url, configOb) {
    var ts = this;
    // console.log('\x1B[36m%s\x1B[0m',url)
    fs.readFile(url, "utf8", function(err, data) {
        if (err) {
            // configOb.data=null;
            ts.collect();
            return;
        }
        var ob;
        try {
            ob = JSON.parse(data);
        } catch (e) {
            ts.collect();
            return;
        }
        configOb.data = ob;
        ts.collect();
    });
};



var readFilter = function(url, runScope) { //runScope是核心运行对象
    var ts = this;
    var filterOb = null;
    // var aimUrl=path.relative(process.cwd(),url);
    try {
        filterOb = require(url);
        if (typeof filterOb === "object") { //统一设置过滤器
            runScope.setFilter(filterOb);
        }
    } catch (e) {
        console.log("require " + url + " fail");
        ts.collect();
        return;
    }
    ts.collect();
};


miniExtend(packJsPrototype, {
    export: function(opt, configOb, fromModule) { //如果传入configOb，则表明，已经通过gulp把配置文件读出来了
        var ts = this;
        var configUrl = opt.config, //配置文件目录
            data = opt.data,
            cback = opt.callback;
        var environment = opt.environment;
        // 由于是gulp进来的，已经是绝对路径
        if (!fromModule && environment !== "gulp") { //没有frommodule，不是二级模块的时候，才使用据对路径
            configUrl = path.join(process.cwd(), configUrl); //形成绝对路径
        }
        if (typeof this.pas !== "object") { //咱贴的对象初始化
            this.paste = {};
        }

        var exportFile = opt.export;
        var filter = opt.filter; //过滤js字符串
        if(typeof filter==="function"){this.callbackFilter=filter;}
        ts.noMerge = opt.noMerge; //是否合并数据
        if (opt.match) { //如果有才设置，否则为默认的？
            ts.match = opt.match; //自己设置的正则匹配
        }
        if (fromModule) {
            ts.fromModule = fromModule;
        }
        // 生成一个新的this
        var newTs = createInherit(ts, {}); //继承一个防止以后扩展
        newTs.data = data ? data : {}; //如果没有data则为空对象
        newTs.configUrl = configUrl; //配置根路径
        newTs.exportFile = exportFile;
        newTs.mark = newTs.mark ? newTs.mark : [];


        newTs.readConfig(configUrl, function(configOb) {
            if (configOb !== false) { //为false表示没有配置文件,正确则表示指向一个文件夹,并且读出他的根目录文件
                newTs._preExport(configOb, cback);
            }
        }, configOb);
        // if (typeof configOb === "object" && configOb !== null) { //如果有配置文件
        //     newTs._preExport(configOb, cback);
        // } else {
        //     newTs.readConfig(configUrl, function(configOb) {
        //         if (configOb !== false) { //为false表示没有配置文件,正确则表示指向一个文件夹,并且读出他的根目录文件

        //             newTs._preExport(configOb, cback);
        //         }
        //     });
        // }
    },
    readConfig: function(url, callback, configOb) { //进入到这个配置文件就是需要去读取的，url是目标模块文件夹

        var ts = this;
        var configPath = path.join(url, "config.json");
        var fromModule=ts.fromModule;
        fromModule=fromModule?fromModule:"";
        if (!configOb) {
            fs.readFile(configPath, "utf8", function(err, data) { //直接读取文件
                if (err || !data) {
                    console.log(fromModule+" write config.json is better");
                }
                if (!data) { //默认放入一个根目录对象
                    data = '{"root":"index.js"}';
                }
                try {
                    configOb = JSON.parse(data);
                } catch (e) { //如果里面是乱放的东西，则
                    console.log("config.json do not have right format,change is better")
                    configOb = { //如果读取错误
                        root: "index.js"
                    }
                }
                ts._handConfig(url, callback, configOb);
            });
        } else {
            ts._handConfig(url, callback, configOb);
        }
    },
    _handConfig: function(url, callback, configOb) {
        var ts = this;
        configOb.data = configOb.data ? configOb.data : "data.json";
        configOb.filter = configOb.filter ? configOb.filter : "filter.js";
        //生成配置输出文件目标
        ts.exportFile = ts.exportFile ? ts.exportFile : (configOb.export ? configOb.export : "_test_export.js");

        var dataUrl = path.join(url, configOb.data),
            filterUrl = path.join(url, configOb.filter);
        //定义一个收集来读取data.js和filter.js
        var col = new collect();
        col.setLength(2);
        col.get(readData);
        col.get(readFilter);
        col.setArg({
            item: 0,
            arg: [dataUrl, configOb]
        });
        col.setArg({
            item: 1,
            arg: [filterUrl, ts]
        });
        col.setEndCallback(function() {
            callback(configOb); //回调配置对象
        });
        col.go();
        //把配置文件和this绑定的数据合并，
    }
});





//合并config和参数，并且，载入其他模块
var lookModule = function(opt) {
    //查找模块
    var ts = this;
    var name = opt.name,
        url = opt.url;
    var wrapTs = opt.wrapTs;
    var oldUrl = url;
    var configUrl = wrapTs.configUrl;
    url = path.relative("../", url); //这里测试打印
    if (wrapTs.mark.indexOf(url) !== -1) {
        ts.next(); //如果已经有了相关目录，则不再继续。
        return;
    } else {
        wrapTs.mark.push(oldUrl);
    }
    url = path.join(path.dirname(configUrl), url);
    if (url) { //如果有url指向
        var cf = {
            config: url,
            noMerge: true,
            callback: function(htm, copyOb) { //得到类型｛xcc:"var xx"｝的
                var paste = wrapTs.paste; //拿到咱贴对象
                // paste = wrapTs.paste;
                var mOb = {};
                copyOb.__root__ = htm; //根字符串是所有的
                mOb[name] = copyOb; //根据名字来传入paste
                miniExtend(paste, mOb);
                //下一步运行什么
                ts.next();
            }
        };
        //传给二级的paste已经有了paste，那么所有的二级paste都公用一个paste
        var newTs = createInherit(wrapTs);
        newTs.export(cf, null, name); //name表示来自哪个模块
    } else {
        ts.next();
    }
};


miniExtend(packJsPrototype, {
    _preExport: function(configOb, callback) {
        var ts = this;
        if (configOb.data) {
            ts._combineData(configOb.data);
        }
        var rt = configOb.root;
        rt = rt ? rt : "index.js";
        var url = path.join(ts.configUrl, rt);
        // 读取张贴内容
        var pasteOb = configOb.paste;
        if (pasteOb && (typeof pasteOb === "object")) { //如果里面有张贴模块，则引入这些张贴字符串
            var sy = new sync();
            var item = 0;
            var val = null;
            var ctr = false;
            for (var attr in pasteOb) { //得到paste的属性和值，值为url指向
                val = pasteOb[attr];
                ctr = true; //表示对象不为空
                sy.setArg({
                    item: item,
                    arg: [{
                        name: attr,
                        url: val,
                        wrapTs: ts
                    }]
                });
                sy.get(lookModule); //转入lk函数
                item += 1;
            }

            sy.setEndCallback(function() {
                ts._readFile(url, callback);
            });
            if (ctr === true) { //不为空paste才会运行
                sy.go();
            } else {

                ts._readFile(url, callback);
            }
        } else {

            ts._readFile(url, callback);
        }
    },
    _combineData: function(data) { //data是配置文件的data
        depExtend(this.data, data);
    }
});



//被renderjs过滤掉,并且写入文件
miniExtend(packJsPrototype, {
    _readFile: function(url, callback) {
        var ts = this;
        var data = ts.data;
        var noMerge = ts.noMerge;
        var match = ts.match;
        var pasteOb = ts.paste;
        var fromModule = ts.fromModule; //来自的模块，表示别名
        var configUrl = ts.configUrl;
        var callbackFilter=ts.callbackFilter;
        fs.stat(url, function(err, stat) {
            if (err) {
                console.log(url + " path is not exist");
                // return;
            }
            ts.render({
                url: url,
                data: data,
                noMerge: noMerge,
                match: match,
                paste: pasteOb,
                callback: function(jsStr, copyOb) {
                    if (copyOb) {
                        copyOb.__root__ = jsStr; //根字符串是所有的
                        // var pasteOb = ts.paste;
                        //来自那个模版
                        if (fromModule) { //在二级pack里面和一级pack同个paste
                            pasteOb[fromModule] = copyOb;
                        }
                    }

                    if(callbackFilter){
                        var tempOut="";
                        tempOut=callbackFilter(jsStr);
                        if(tempOut){//只有回调过滤函数让字符串存在的时候，才会赋予相关值，否则，用原来的值
                            jsStr=tempOut;
                        }
                    }

                    var exportFile = ts.exportFile;
                    exportFile = path.join(configUrl, exportFile);
                    if (exportFile) { //
                        // console.log(exportFile);
                        fs.writeFile(exportFile, jsStr, "utf8", function(err) {
                            if (err) {
                                console.log("write export file " + ts.exportFile + " error");
                            } else {
                                console.log(exportFile + " write")
                            }
                        })
                    }
                    if (typeof callback === "function") {
                        callback(jsStr, copyOb);
                    }
                }
            })
        });
    }
})



packJs.prototype = packJsPrototype;
module.exports = packJs;