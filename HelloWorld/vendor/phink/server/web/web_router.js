'use strict';

var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}

NestJS.Web.Object = require('../web/web_object.js');

var path = require('path');
var fs = require('fs');

NestJS.Web.Router = function (req, res) {
    this.application = null;
    this.methods = '';
    this.className = '';
    this.baseNamespace = '';
    this.classFileName = '';
    this.parameter = '';
    //this.application = app;
    this.request = req;
    this.response = res;
}

NestJS.Web.Router.prototype = new NestJS.Web.Object();
NestJS.Web.Router.prototype.constructor = NestJS.Web.Router;

NestJS.Web.Router.prototype.translate = function(callback)
{

    var qstring = this.request.url;
    var qParts = qstring.split('/');
    this.className = qParts.shift();
	this.method = qParts.shift();
 
    this.classFileName = APP_ROOT + 'controller' + path.sep + this.className + '.js';
    console.log(this.classFileName);
    
    fs.exists(this.classFileName, function(exists) {
        callback.call(this, exists);
    });
}

NestJS.Web.Router.prototype.dispatch = function()
{
    var data = [];
    console.log(method);

    var fqObject = require(this.classFileName);

    var result = '';
    if(typeof fqObject[this.method] === 'function') {
        result = fqObject[this.method]();
    } else {
        console.log(this.className + '.' + method + ' not found');
    }

    this.response.write(JSON.stringify(result));
    this.response.end();


}

module.exports = NestJS.Web.Router;