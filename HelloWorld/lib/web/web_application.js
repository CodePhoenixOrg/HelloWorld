'use strict';
var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}
NestJS.Rest = NestJS.Rest || {}

NestJS.Web.Object = require('./web_object.js');
NestJS.Rest.Router = require('../rest/rest_router.js');

NestJS.Web.Application = function () {

};

NestJS.Web.Application.prototype = new NestJS.Web.Object();
NestJS.Web.Application.prototype.constructor = NestJS.Web.Application;

NestJS.Web.Application.headers = {};

NestJS.Web.Application.create = function (url, port, callback) {
    var http = require('http');

    http.createServer(function (req, res) {
        //console.log(req.headers);
        NestJS.Web.Application.headers = req.rawHeaders;

        if (req.url.indexOf("/api/") > -1) {

            var router = new NestJS.Rest.Router(req, res);

            if (router.translate()) {

                router.dispatch();
            }


        } else {
            NestJS.Web.Object.include(__dirname, req.url, function (err, data) {
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

module.exports = NestJS.Web.Application; 