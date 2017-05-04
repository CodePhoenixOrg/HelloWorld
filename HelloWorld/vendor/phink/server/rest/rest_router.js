'use strict';

var NestJS = NestJS || {}
NestJS.Rest = NestJS.Rest || {}
NestJS.Web = NestJS.Web || {}

NestJS.Web.Object = require('../web/web_object.js');

var path = require('path');
var fs = require('fs');

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

NestJS.Rest.Router.prototype.translate = function(callback)
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
        callback.call(this, exists);
    });
}

NestJS.Rest.Router.prototype.dispatch = function()
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
        fqObject[method](function(data) {
            res.writeHead(200, { 'Content-Type': 'application/json', 'charset': 'utf-8', 'Transfer-Encoding': 'utf-8' });
            res.write(JSON.stringify(data));
            res.end();

        });
    } else {
        console.log(this.className + '.' + method + ' not found');
    }


    // var body = [];
    // var the = this;
    // this.request.on('error', function (err) {
    //     console.error(err);
    // }).on('data', function (chunk) {
    //     body.push(chunk);
    // }).on('end', function () {
    //     body = Buffer.concat(body).toString();
    //     the.request.on('error', function (err) {
    //         console.error(err);
    //     })
    //     the.response.statusCode = 200;
    //     the.response.setHeader('Content-Type', 'application/json');

    //     var resBody = {
    //         headers: the.request.headers,
    //         method: the.request.method,
    //         url: the.request.url,
    //         body: result
    //     };

    //     the.response.write(JSON.stringify(resBody));
    //     the.response.end();
    // });

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