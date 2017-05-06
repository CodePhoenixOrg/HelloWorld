﻿'use strict';
var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}
NestJS.Rest = NestJS.Rests || {}

NestJS.Web.Object = require('./web_object.js');
NestJS.Web.Router = require('./web_router.js');
NestJS.Rest.Router = require('../rest/rest_router.js');

var bootstrap = require('../bootstrap');

var path = require('path');
var file = require('fs');

NestJS.Web.Application = function () {
    
};

NestJS.Web.Application.prototype = new NestJS.Web.Object();
NestJS.Web.Application.prototype.constructor = NestJS.Web.Application;

NestJS.Web.Application.headers = {}

NestJS.Web.Application.create = function (url, port, callback) {
    var http = require('http');

    http.createServer(function (req, res) {
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

            var router = null;
            if (req.url.indexOf("/api/") > -1) {
                router = new NestJS.Rest.Router(req, res);
            } else {
                router = new NestJS.Web.Router(req, res);
            }
            
            console.log(req.url);
            router.translate(function(exists) {
                if(exists) router.dispatch(function (req2, res, stream) {
                    res.write(stream);
                    res.end();
                    
                    //req2.emit('finish');
                });
            });

  //          res.end();
  //          res.emit('close');
            
        }).on('finish', function() {
            console.log("FINISH");
            res.end();
            //res.removeAllListeners('data');
            //req.emit('close');
        }).on('close', function() {
            console.log("CLOSE");
            // req = null;
        });


    }).listen(port);
}; 

module.exports = NestJS.Web.Application; 