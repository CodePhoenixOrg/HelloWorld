'use strict';
var WebObject = require('../web_object.js');
var Path = require('path');
var File = require('fs');

var RestRouter = function (req, res) {

    
    //put your code here
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

RestRouter.prototype = new WebObject();
RestRouter.prototype.constructor = RestRouter;

RestRouter.prototype.translate = function()
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

RestRouter.prototype.dispatch = function()
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

module.exports = RestRouter;