'use strict';
var path = require('path');
var fs = require('fs');

var folders = __dirname.split(path.sep);

folders.pop();

global.PHINK_ROOT = folders.join(path.sep) + path.sep;

folders.pop();
folders.pop();

global.SITE_ROOT = folders.join(path.sep) + path.sep;
global.APP_ROOT = SITE_ROOT + 'app' + path.sep;
global.APP_DATA = APP_ROOT + 'data' + path.sep;
global.DOCUMENT_ROOT = SITE_ROOT + 'web' + path.sep;

var BootStrap = function() {};

BootStrap.init = function() {

    var _concat = function(srcdir, srctree, destfile) {
        var content = "";

        for(var i = 0; i < srctree.length; i++) {
            content += fs.readFileSync(srcdir + srctree[i]) + "\n";
        }
        fs.writeFileSync(destfile, content, {encoding: 'utf-8', mode: 0o666, flag: 'w'});

    }

//".." + path.sep + 
    var outfile = SITE_ROOT + "vendor" + path.sep + "phink" + path.sep + "phink.js";
    // var dir = __dirname + path.sep + "server" + path.sep;
    // var tree = [ 
    //     "core.js", 
    //     "core" + path.sep + "object.js", 
    //     "rest" + path.sep + "rest_router.js", 
    //     "utils" + path.sep + "io.js", 
    //     "web" + path.sep + "web_object.js", 
    //     "web" + path.sep + "web_application.js", 
    // ];
    
    var dir = __dirname + path.sep + ".." + path.sep + "client" + path.sep;
    var tree = [ 
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
    
    _concat(dir, tree, outfile);

}

BootStrap.init();

module.exports = BootStrap;
