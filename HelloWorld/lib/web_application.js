'use strict';

var webApplication = function () {

};

webApplication.create = function (url, port, callback) {
    var http = require('http');
    http.createServer(function (req, res) {
        if (typeof callback === 'function') {
            callback.call(this, req, res);
        }
    }).listen(port);
};

webApplication.include = function (directory, filename, callback) {
    var fs = require('fs');
    var path = require('path');

    var filePath = path.join(directory, filename);

    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (typeof callback === 'function') {
            callback.call(this, err, data);
        }

    });

};

module.exports = webApplication; 