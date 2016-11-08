/*
 * @Author: jxj
 * @Date:   2016-10-01 17:28:44
 * @Last Modified by:   jxj
 * @Last Modified time: 2016-11-08 10:09:14
 */
var path = require("path");
var main=require("./lib/main.js");

var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;

const PLUGIN_NAME = "gulp-packjs";

var prefixStream=function(prefixText) {
    var stream = through();
    stream.write(prefixText);
    return stream;
}

var urlMy = function(url) {
    if (url.slice(-1) !== "\/") {
        url = url + "\/";
    }
    return url;
}

function gulpPackjs(opt) {
    if (["string", "number"].indexOf(typeof opt) !== -1) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'option has error'));
    }
    if (!opt) {
        opt = {}
    }
    var no = 0;
    var stream = through.obj(function(ck, enc, cb) {
        if (ck.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }
        var pkJs = new main();
        var configOb, ts = this;
        var baseDir = ck.base;
        if (!ck.contents) { //如果有配置文件的话
            throw new PluginError(PLUGIN_NAME, "no content");
        }
        configOb = ck.contents.toString("utf8");
        //这里configOb不能有注释

        try {
            configOb = JSON.parse(configOb);
        } catch (e) {
            console.log("error,config.json must be json format")
            this.emit('error', new PluginError(PLUGIN_NAME, 'config.json write error,not a json'));
            return cb();
        }

        var exportFile = opt.name;

        if (!exportFile) { //如果读取不到读文件名字
            exportFile = configOb.name ? configOb.name + ".js" : path.basename(baseDir) + ".js";
        } else {
            exportFile = exportFile + ".js";
        }
        //输入到相对路径
        baseDir = urlMy(baseDir);
        ck.path = path.join(baseDir , exportFile);
        pkJs.export({
            environment:"gulp",
            config: baseDir,
            callback: function(jsStr) {
                var strm = prefixStream(jsStr);
                strm.end(function() {
                    ck.contents = strm;
                    ts.push(ck);
                    cb();
                    console.log("export "+exportFile+" to gulp.dest");
                })
            },
            data: opt.data,
            filter:opt.filter
        }, configOb);
    })
    return stream;
}
gulpPackjs.export = function(opt) {
    var pkJs = new packJs();
    pkJs.export(opt);
}



module.exports = gulpPackjs;