'use strict';
var path = require('path');
var fs = require('fs');

var BootStrap = function() {};

BootStrap.init = function() {

    // var dir = __dirname + path.sep + "server" + path.sep;
    // var tree1 = [ 
    //     "core.js", 
    //     "core" + path.sep + "object.js", 
    //     "rest" + path.sep + "rest_router.js", 
    //     "utils" + path.sep + "io.js", 
    //     "web" + path.sep + "web_object.js", 
    //     "web" + path.sep + "web_application.js", 
    // ];

    // var content1 = "";
    // var outfile1 = "vendor" + path.sep + "phink" + path.sep + "server.js";
    // for(var i = 0; i < tree1.length; i++) {
    //     content1 += fs.readFileSync(dir + tree1[i]) + "\n";
    // }
    // fs.writeFileSync(outfile1, content1, {encoding: 'utf-8', mode: 0o666, flag: 'w'});

    var content2 = "";
    var dir = __dirname + path.sep + ".." + path.sep + "client" + path.sep;
    var tree2 = [ 
        "main.js", 
        "core" + path.sep + "url.js", 
        "core" + path.sep + "registry.js", 
        "utils" + path.sep + "text.js", 
        "core" + path.sep + "object.js", 
        "web" + path.sep + "web_object.js", 
        "web" + path.sep + "web_application.js", 
        "web" + path.sep + "rest.js", 
        "mvc" + path.sep + "view.js", 
        "mvc" + path.sep + "controller.js",
        "web" + path.sep + "ui" + path.sep + "plugin.js", 
        "web" + path.sep + "ui" + path.sep + "plugin" + path.sep + "accordion.js", 
        "web" + path.sep + "ui" + path.sep + "plugin" + path.sep + "list.js", 
        "web" + path.sep + "ui" + path.sep + "plugin" + path.sep + "table.js"
    ];

    var outfile2 = "vendor" + path.sep + "phink" + path.sep + "phink.js";
    for(var i = 0; i < tree2.length; i++) {
        content2 += fs.readFileSync(dir + tree2[i]) + "\n";
    }
    fs.writeFileSync(outfile2, content2, {encoding: 'utf-8', mode: 0o666, flag: 'w'});

}

BootStrap.init();

module.exports = BootStrap;
