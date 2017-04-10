'use strict';

var WebApplication = function () {

};

WebApplication.headers = {};

WebApplication.create = function (url, port, callback) {
    var http = require('http');

    http.createServer(function (req, res) {
        //console.log(req.headers);
        WebApplication.headers = req.rawHeaders;
        var url = (req.url === '/') ? 'index.html' : req.url;
        var dotoffset = url.lastIndexOf('.');
        var mimetype = (dotoffset === -1) ? 'text/html' :
            {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.json': 'application/json',
                '.xml': 'application/xml',
                '.zip': 'application/zip',
                '.ico': 'image/vnd.microsoft.icon',
                '.jpg': 'image/jpg',
                '.png': 'image/png'
            }[url.substring(dotoffset)];
        res.writeHead(200, { 'Content-Type': mimetype });
        url = (mimetype === 'text/html') ? '../app/views/' + url : '../' + url; 
        WebApplication.include(__dirname, url, function (err, data) {
            if (!err) {
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

WebApplication.include = function (directory, filename, callback) {
    var fs = require('fs');
    var path = require('path');

    var filePath = path.join(directory, filename);

    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (typeof callback === 'function') {
            callback.call(this, err, data);
        }

    });

};

WebApplication.load = function (url, callback) {

 
    WebApplication.include(__dirname, '../app/views/' + viewname, function (err, data) {
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