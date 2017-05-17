'use strict';
let NestJSRouter = require('../core/base_router.js');

class NestJSWebRouter extends NestJSRouter {
    constructor(parent, req, res) {
        super(parent, req, res);
        
        this.filePath = '';
        this.mimetype = '';
        this.encoding = '';
        this.extension = '';
        this.viewName = '';

    }

    translate(callback) {

        let url = (this.request.url === '/') ? 'index.html' : this.request.url;
        let baseurl = require('url').parse(url);
        this.viewName = baseurl.pathname;
        this.extension = require('path').extname(this.viewName);
        let dotoffset = this.viewName.lastIndexOf('.');
        this.viewName = (dotoffset > -1) ? this.viewName.substring(0, dotoffset) : this.viewName;
        let mime = (this.extension === '') ? ['text/plain', 'utf-8'] :
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

        this.filePath = (this.extension === '.html') ? global.APP_ROOT + 'views/' + url : (this.extension === '.js' && url.lastIndexOf('/phink.js') > -1) ? global.PHINK_ROOT + 'phink.js' : global.DOCUMENT_ROOT + url;

        require('fs').exists(this.filePath, function (exists) {
            callback(exists);
        });
    }

    dispatch(callback) {
        let encoding = (this.encoding !== '') ? { 'encoding': this.encoding } : null;
        let res = this.response;
        let req = this.request;
        let mime = this.mimetype;

        if (this.extension === '.html') {
            let Controller = require(global.APP_CONTROLLERS + this.viewName + '.js');
            let ctrl = new Controller(this, this.viewName);
            ctrl.render(function (stream) {
                res.writeHead(200, { 'Content-Type': mime });
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
        })

    }
}

module.exports = NestJSWebRouter;