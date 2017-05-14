'use strict';
var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}

var fs = require('fs');
var path = require('path');

NestJS.Object = require(__dirname + '/../core/object.js');

NestJS.Web.Object = function (parent) {
    this.setParent(parent);
};

NestJS.Web.Object.prototype = new NestJS.Object();
NestJS.Web.Object.prototype.constructor = NestJS.Web.Object;

NestJS.Web.Object.include = function (file, encoding, callback) {
    fs.readFile(file, encoding, function (err, stream) {
        if (typeof callback === 'function') {
            callback(err, stream);
        }

    });

};

module.exports = NestJS.Web.Object;