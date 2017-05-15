'use strict';
var fs = require('fs');
var path = require('path');

var NestJSObject = require(__dirname + '/../core/object.js');

var NestJSWebObject = function (parent) {
    this.setParent(parent);
};

NestJSWebObject.prototype = new NestJSObject();
NestJSWebObject.prototype.constructor = NestJSWebObject;

NestJSWebObject.include = function (file, encoding, callback) {
    fs.readFile(file, encoding, function (err, stream) {
        if (typeof callback === 'function') {
            callback(err, stream);
        }

    });

};

module.exports = NestJSWebObject;