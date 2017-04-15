'use strict';
var WebObject = require(__dirname + '/web_object.js');
var RestRouter = require(__dirname + '/rest/rest_router.js');

var WebApplication = function () {

};

WebApplication.prototype = new WebObject();
WebApplication.prototype.constructor = WebApplication;

WebApplication.headers = {};

WebApplication.create = function (url, port, callback) {
    var http = require('http');

    http.createServer(function (req, res) {
        //console.log(req.headers);
        WebApplication.headers = req.rawHeaders;

        if (req.url.indexOf("/api/") > -1) {

            var router = new RestRouter(req, res);

            if (router.translate()) {

                router.dispatch();
            }


        } else {
            WebObject.include(__dirname, req.url, function (err, data) {
                if (!err) {
                    res.writeHead(200, { 'Content-Type': data.mimetype });
                    if (typeof callback === 'function') {
                        callback.call(this, req, res, data);
                    }
                    res.write(data.stream);
                    res.end();
                } else {
                    console.log(err);
                }
            });

        }
    }).listen(port);
}; 

module.exports = WebApplication; 