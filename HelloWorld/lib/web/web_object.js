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

    url = (extension === '.html') ? '../../app/views/' + url : '../../' + url;

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