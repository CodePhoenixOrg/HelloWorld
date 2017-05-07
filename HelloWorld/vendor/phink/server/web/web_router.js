'use strict';

var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}

NestJS.Router = require('../core/base_router.js');

var path = require('path');
var fs = require('fs');

NestJS.Web.Router = function (req, res) {
    this.filePath = '';
    this.request = req;
    this.response = res;
    this.mimetype = '';
    this.encoding = '';
}

NestJS.Web.Router.prototype = new NestJS.Router();
NestJS.Web.Router.prototype.constructor = NestJS.Web.Router;

NestJS.Web.Router.prototype.translate = function(callback)
{

    var url = (this.request.url === '/') ? 'index.html' : this.request.url;
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

    this.encoding = mime[1];
    this.mimetype = mime[0];

    this.filePath = (extension === '.html') ? APP_ROOT + 'views/' + url : (extension === '.js' && url.lastIndexOf('/phink.js') > -1) ? PHINK_ROOT + 'phink.js' : DOCUMENT_ROOT + url;

    fs.exists(this.filePath, function(exists) {
        callback(exists);
    });
}

NestJS.Web.Router.prototype.dispatch = function(callback)
{

    var encoding = (this.encoding !== '') ? { 'encoding': this.encoding } : null;
    var res = this.response;
    var req = this.request;
    var mime = this.mimetype;

    require('./web_object').include(this.filePath, encoding, function (err, stream) {
        if (!err) {

            res.writeHead(200, { 'Content-Type': mime });
            if (typeof callback === 'function') {
                callback(req, res, stream);
            }
        } else {
            console.log(err);
        }
    });

}

module.exports = NestJS.Web.Router;