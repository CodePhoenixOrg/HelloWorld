'use strict';
NestJSRouter = require('../core/base_router.js');

var path = require('path');
var fs = require('fs');

NestJSRestRouter = function (req, res) {
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

NestJSRestRouter.prototype = new NestJSRouter();
NestJSRestRouter.prototype.constructor = NestJSRestRouter;

NestJSRestRouter.prototype.translate = function(callback)
{
	//var nsParts = ('\\', __NAMESPACE__);
	//this.baseNamespace = array_shift(nsParts);

    var qstring = this.request.url.replace(/\/api\//, '');
    var qParts = qstring.split('/');
    this.apiName = qParts.shift();
	this.parameter = qParts.shift();
 
	//this.apiName = preg_replace('/[^a-z0-9_]+/i','', array_shift(qParts));
	this.className = this.apiName;

    this.apiFileName = APP_ROOT + 'rest' + path.sep + this.apiName + '.js';
    console.log(this.apiFileName);
    
    fs.exists(this.apiFileName, function(exists) {
        callback(exists);
    });
}

NestJSRestRouter.prototype.dispatch = function(callback)
{
    var data = [];
    var method = this.request.method.toLowerCase();
    console.log(method);

	//var fqObject = this.baseNamespace + '\\Rest\\' + this.className;
    var fqObject = require(this.apiFileName);
	//var instance = new fqObject();

    var result = '';
    if(typeof fqObject[method] === 'function') {
        //result = fqObject[method]();
        var res = this.response;
        var req = this.request;
        fqObject[method](function(data) {
            //res.statusCode = 200;
            //res.setHeader('Content-Type', 'application/json');
            res.writeHead(200, { 'Content-Type': 'application/json', 'charset': 'utf-8' });
            var stream = JSON.stringify(data);
            if (typeof callback === 'function') {
                callback(req, res, stream);
            }
        });
    } else {
        console.log(this.className + '.' + method + ' not found');
    }

}

module.exports = NestJSRestRouter;