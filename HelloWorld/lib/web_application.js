'use strict';
var http = require('http');
var fs = require('fs');
var path = require('path');

var WebApplication = function () { };

WebApplication.create = function(url, port, callback) {
    http.createServer(function (req, res) {
        if (typeof callback === 'function') {
            callback.call(this, req, res);
        }
    }).listen(port);
};

WebApplication.include = function (directory, filename, callback) {
    var filename = path.join(directory, filename);

    fs.readFile(filename, {'encoding': 'utf-8'}, function (err, data) {
        if (typeof callback === 'function') {
            callback.call(this, err, data);
        }
    });
};

module.exports = WebApplication;