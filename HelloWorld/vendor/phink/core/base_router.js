'use strict';
var NestJSWebObject = require('../web/web_object.js');

var path = require('path');
var fs = require('fs');

var NestJSRouter = function (req, res) {
    this.request = req;
    this.response = res;
    this.mimetype = '';
    this.encoding = '';
}

NestJSRouter.prototype = new NestJSWebObject();
NestJSRouter.prototype.constructor = NestJSRouter;

NestJSRouter.prototype.getMimeType = function () {
    return this.mimetype;
}

NestJSRouter.prototype.getEncoding = function () {
    return this.encoding;
}

NestJSRouter.prototype.translate = function (callback) {}

NestJSRouter.prototype.dispatch = function (callback) {}

module.exports = NestJSRouter;