'use strict';

var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}

NestJS.Web.Object = require('../web/web_object.js');

var path = require('path');
var fs = require('fs');

NestJS.Router = function (req, res) {
    this.request = req;
    this.response = res;
    this.mimetype = '';
    this.encoding = '';
}

NestJS.Router.prototype = new NestJS.Web.Object();
NestJS.Router.prototype.constructor = NestJS.Router;

NestJS.Router.prototype.getMimeType = function() {
	return this.mimetype;
}

NestJS.Router.prototype.getEncoding = function() {
	return this.encoding;
}

NestJS.Router.prototype.translate = function(callback) {}

NestJS.Router.prototype.dispatch = function(callback) {}

module.exports = NestJS.Router;