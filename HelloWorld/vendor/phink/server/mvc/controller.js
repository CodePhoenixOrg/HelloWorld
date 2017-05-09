'use strict';

var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}


NestJS.Web.Object = require('../web/web_object.js');

NestJS.MVC.Controller = function () {};

NestJS.MVC.Controller.prototype = new NestJS.Web.Object();
NestJS.MVC.Controller.prototype.constructor = NestJS.MVC.Controller;



    var qstring = this.request.url;
    var qParts = qstring.split('/');
    this.className = qParts.shift();
	this.method = qParts.shift();
 
    this.classFileName = APP_ROOT + 'controller' + path.sep + this.className + '.js';
    console.log(this.classFileName);
    
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

