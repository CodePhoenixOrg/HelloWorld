'use strict';
var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}
NestJS.Rest = NestJS.Rest || {}
NestJS.Utils = NestJS.Utils || {}
NestJS.Utils.IO = NestJS.Utils.IO || {}

'use strict';
var NestJS = NestJS || {}

NestJS.Object = function(parent) {
    this.id = '';
    this.name = '';
    this.parent = (parent !== undefined) ? parent : null;
};

NestJS.Object.prototype = {
    setId: function (value) {
        this.id = value;

        return this;
    }
    , getId: function () {
        return this.id;
    }
    , setName: function (value) {
        this.name = value;

        return this;
    }
    , getName: function () {
        return this.name;
    }
    , setParent: function (parent) {
        this.parent = (parent !== undefined) ? parent : null;
    }
    , getParent: function () {
        return this.parent;
    }
};


module.exports = NestJS.Object;
'use strict';

var NestJS = NestJS || {}
NestJS.Rest = NestJS.Rest || {}
NestJS.Web = NestJS.Web || {}

NestJS.Web.Object = require('../web/web_object.js');

var Path = require('path');
var File = require('fs');

NestJS.Rest.Router = function (req, res) {
    this.application = null;
    this.apiName = '';
    this.className = '';
    this.baseNamespace = '';
    this.apiFileName = '';
    this.parameter = '';
    //this.application = app;
    this.request = req;
    this.response = res;
}

NestJS.Rest.Router.prototype = new NestJS.Web.Object();
NestJS.Rest.Router.prototype.constructor = NestJS.Rest.Router;

NestJS.Rest.Router.prototype.translate = function()
{
	//var nsParts = ('\\', __NAMESPACE__);
	//this.baseNamespace = array_shift(nsParts);

    var qstring = this.request.url.replace(/\/api\//, '');
    var qParts = qstring.split('/');
    this.apiName = qParts.shift();
	this.parameter = qParts.shift();
 
	//this.apiName = preg_replace('/[^a-z0-9_]+/i','', array_shift(qParts));
	this.className = this.apiName;

    this.apiFileName = __dirname + Path.sep + '..' + Path.sep + '..' + Path.sep + 'app' + Path.sep + 'rest' + Path.sep + this.apiName + '.js';

    return File.exists(this.apiFileName);
}

NestJS.Rest.Router.prototype.dispatch = function()
{
    var data = [];
    var method = this.request.method;

	//var fqObject = this.baseNamespace + '\\Rest\\' + this.className;
    var fqObject = require(this.apiFileName);
	//var instance = new fqObject();
        
    var result = '';

    var body = [];
    var the = this;
    this.request.on('error', function (err) {
        console.error(err);
    }).on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        the.request.on('error', function (err) {
            console.error(err);
        })
        the.response.statusCode = 200;
        the.response.setHeader('Content-Type', 'application/json');

        var resBody = {
            headers: the.request.headers,
            method: the.request.method,
            url: the.request.url,
            body: result
        };

        the.response.write(JSON.stringify(resBody));
        the.response.end();
    });

 //   if (request_body !== undefined) {
 //       data = JSON.parse(request_body);
	//}
        
	//var params = [];
	//if(count(data) > 0) {
	//	params = data.keys();
	//	if(this.parameter !== null) {
	//		array_unshift(params, this.parameter);
	//	}
	//} else {
	//	if(this.parameter !== null) {
	//		params = [this.parameter];
	//	}
	//}

 //   if (params.length > 0) {
 //       Function.call(instance, params);
 //   } else {
 //       Function.call(instance);
	//}
        
	//this.response.end();

}

module.exports = NestJS.Rest.Router;
﻿var NestJS = NestJS || {}
NestJS.Utils = NestJS.Utils || {}
NestJS.Utils.IO = NestJS.Utils.IO || {}

var path = require('path');
var file = require('fs');

NestJS.Utils.IO.walkTree = function (dir, callback) {

    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return callback.call(err);
        var pending = list.length;
        if (pending === 0) return callback.call(null, results);

        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    pending--;
                    walkTree(file, callback);
                } else {
                    results.push(file);
                    pending--;
                    if (pending === 0) callback.call(null, results);
                }
            });
        });
    });
};

module.exports = NestJS.Utils.IO;
'use strict';
var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}

NestJS.Object = require(__dirname + '/../core/object.js');

NestJS.Web.Object = function (parent) {
    this.setParent(parent);
};

NestJS.Web.Object.prototype = new NestJS.Object();
NestJS.Web.Object.prototype.constructor = NestJS.Web.Object;

NestJS.Web.Object.include = function (directory, url, callback) {
    var fs = require('fs');
    var path = require('path');

    var url = (url === '/') ? 'index.html' : url;
    var dotoffset = url.lastIndexOf('.');
    var extension = (dotoffset === -1) ? '' : url.substring(dotoffset);
    var mime = (extension === '') ? ['text/plain', 'utf-8'] :
        {
            '.html': ['text/html', 'utf-8'],
            '.css': ['text/css', 'utf-8'],
            '.js': ['application/javascript', 'utf-8'],
            '.json': ['application/json', 'utf-8'],
            '.xml': ['application/xml', 'utf-8'],
            '.zip': ['application/zip', ''],
            '.ico': ['image/vnd.microsoft.icon', ''],
            '.jpg': ['image/jpg', ''],
            '.png': ['image/png', '']
        }[extension];

    url = (extension === '.html') ? '../../app/views/' + url : (extension === '.js' && url.lastIndexOf('/phink/') > -1) ? '../../lib/' + url : '../../web/' + url;


    var data = [];
    data.encoding = mime[1];
    data.mimetype = mime[0];
    var encoding = (data.encoding !== '') ? { 'encoding': data.encoding } : null;

    var filePath = path.join(directory, url);

    fs.readFile(filePath, encoding, function (err, stream) {

        data.stream = stream;
        if (typeof callback === 'function') {
            callback.call(this, err, data);
        }

    });

};

module.exports = NestJS.Web.Object;
﻿'use strict';
var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}

var webObject = require('./web_object.js');
var restRouter = require('../rest/rest_router.js');
var io = require('../utils/io.js');

var path = require('path');
var file = require('fs');

NestJS.Web.Application = function () {
    
};

NestJS.Web.Application.prototype = new webObject();
NestJS.Web.Application.prototype.constructor = NestJS.Web.Application;

NestJS.Web.Application.headers = {};

NestJS.Web.Application.create = function (url, port, callback) {
    var http = require('http');

    http.createServer(function (req, res) {
        //console.log(req.headers);
        NestJS.Web.Application.headers = req.rawHeaders;

        if (req.url.indexOf("/api/") > -1) {

            var router = new restRouter(req, res);
            if (router.translate()) {
                router.dispatch();
            }

        } else {
            webObject.include(__dirname, req.url, function (err, data) {
                if (!err) {
                    res.writeHead(200, { 'Content-Type': data.mimetype });
                    if (typeof callback === 'function') {
                        callback.call(this, req, res, data);
                    }
                    res.write(data.stream);
                    res.end();
                } else {
                    console.log(err);
                }
            });

        }
    }).listen(port);
}; 

module.exports = NestJS.Web.Application; 
