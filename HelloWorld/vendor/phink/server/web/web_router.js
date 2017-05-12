'use strict';

var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}

NestJS.Router = require('../core/base_router.js');

NestJS.Web.Router = function (req, res) {
    this.filePath = '';
    this.request = req;
    this.response = res;
    this.mimetype = '';
    this.encoding = '';
    this.extension = '';
    this.viewName = '';
}

NestJS.Web.Router.prototype = new NestJS.Router();
NestJS.Web.Router.prototype.constructor = NestJS.Web.Router;

NestJS.Web.Router.prototype.translate = function(callback)
{

    var url = (this.request.url === '/') ? 'index.html' : this.request.url;
    var dotoffset = url.lastIndexOf('.');
    var baseurl = require('url').parse(url);
    this.viewName = baseurl.pathname;
    this.extension = require('path').extname(this.viewName);
    var dotoffset = this.viewName.lastIndexOf('.');
    this.viewName = (dotoffset > -1) ? this.viewName.substring(0, dotoffset) : this.viewName;

    var mime = (this.extension === '') ? ['text/plain', 'utf-8'] :
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
        }[this.extension];

    this.encoding = mime[1];
    this.mimetype = mime[0];

    this.filePath = (this.extension === '.html') ? APP_ROOT + 'views/' + url : (this.extension === '.js' && url.lastIndexOf('/phink.js') > -1) ? PHINK_ROOT + 'phink.js' : DOCUMENT_ROOT + url;
 
    require('fs').exists(this.filePath, function(exists) {
        callback(exists);
    });
}

NestJS.Web.Router.prototype.dispatch = function(callback) {

    var encoding = (this.encoding !== '') ? { 'encoding': this.encoding } : null;
    var res = this.response;
    var req = this.request;
    var mime = this.mimetype;

    if(this.extension === '.html') {
        var Controller = require(APP_CONTROLLERS + this.viewName + '.js');
        var ctrl = new Controller(this.viewName);
        ctrl.render(function(stream) {
            callback(req, res, stream);
        });

        return true;
    } 

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