'use strict';
var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}
NestJS.Rest = NestJS.Rest || {}

NestJS.Web.Object = require('./web_object.js');
NestJS.Web.Router = require('./web_router.js');
NestJS.Rest.Router = require('../rest/rest_router.js');

var bootstrap = require('../bootstrap');

NestJS.Web.Application = function () {};

NestJS.Web.Application.prototype = new NestJS.Web.Object();
NestJS.Web.Application.prototype.constructor = NestJS.Web.Application;

NestJS.Web.Application.headers = {}

NestJS.Web.Application.create = function (url, port, callback) {

    require('http').createServer(function (req, res) {
        //console.log(req.headers);
        NestJS.Web.Application.headers = req.rawHeaders;
        var body = [];

        req.on('error', function (err) {
            console.error(err);
        }).on('data', function (chunk) {
            body.push(chunk);
            console.log(chunk);
        }).on('end', function () {

            body = Buffer.concat(body).toString();
            console.log(body);
            req.on('error', function (err) {
                console.error(err);
            })

            if (req.method == 'POST') {


                var post = require('querystring').parse(body);
                console.log('POST DATA BEGIN');
                console.log(require('sys').inspect(post));
                console.log(post);
                console.log('END POST DATA');
            }

            var router = null;
            if (req.url.indexOf("/api/") > -1) {
                router = new NestJS.Rest.Router(req, res);
            } else {
                router = new NestJS.Web.Router(req, res);
            }

            console.log(req.url);
            router.translate(function (exists) {
                if (exists) {
                    router.dispatch(function (rreq, rres, stream) {
                        if (typeof callback === 'function') {
                            callback(rreq, rres, stream);
                        }

                        rres.write(stream);
                        rreq.emit('finish');
                    });
                } else {
                    res.writeHead(404, {
                        'Content-Type': router.getMimeType()
                    });
                    res.write("Error 404 - It looks like you are lost in middle of no ware ...");
                    req.emit('finish');
                }
            });

        }).on('finish', function () {
            res.end();
            console.log("FINISH");
            req.emit('close');
        }).on('close', function () {
            console.log("CLOSE");
            req = null;
            res = null;
        });


    }).listen(port);
};

module.exports = NestJS.Web.Application;