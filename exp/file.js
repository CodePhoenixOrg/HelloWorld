'use strict';
var path = require('path');
var fs = require('fs');
var promise = require('promise');

var folders = __dirname.split(path.sep);

folders.pop();

global.PHINK_ROOT = folders.join(path.sep) + path.sep + 'vendor' + path.sep + 'phink' + path.sep;

folders.pop();
folders.pop();

global.SITE_ROOT = folders.join(path.sep) + path.sep;

var _concat = function(srcdir, srctree, destfile) {
    var content = "";

    for(var i = 0; i < srctree.length; i++) {
        fs.readFile(srcdir + srctree[i], function (err, data) {

        });
    }
    fs.writeFileSync(destfile, content, {encoding: 'utf-8', mode: 0o666, flag: 'w'});

}

var outfile = __dirname + path.sep + "phink.js";

var dir = PHINK_ROOT + "client" + path.sep;
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
