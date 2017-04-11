'use strict';

var WebApplication = function () {

};

WebApplication.headers = {};

WebApplication.create = function (url, port, callback) {
    var http = require('http');

    http.createServer(function (req, res) {
        //console.log(req.headers);
        WebApplication.headers = req.rawHeaders;
        
        WebApplication.include(__dirname, req.url, function (err, data) {
            if (!err) {
                res.writeHead(200, { 'Content-Type': data.mimetype });
                if (typeof callback === 'function') {
                    callback.call(this, req, res, data);
                }
                res.write(data);
                res.end();
            } else {
                console.log(err);
            }
        });
    }).listen(port);
}; 

WebApplication.include = function (directory, url, callback) {
    var fs = require('fs');
    var path = require('path');

    var url = (url === '/') ? 'index.html' : url;
    var dotoffset = url.lastIndexOf('.');
    var extension = (dotoffset === -1) ? url.substring(dotoffset) : '';
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

    url = (extension === '.html') ? '../app/views/' + url : '../' + url;

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


WebApplication.getView = function (viewname, callback) {

    WebApplication.include(__dirname, '../app/views/' + viewname, function (err, data) {
        if (typeof callback === 'function') {
            callback.call(this, err, data);
        }
    });

};

module.exports = WebApplication; 