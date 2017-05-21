'use strict';
let NWebObject = require('./web_object.js');
let NWebRouter = require('./web_router.js');
let NRestRouter = require('../rest/rest_router.js');
let NBaseRouter = require('../core/base_router.js');

let bootstrap = require('../bootstrap');

class NestJSWebApplication extends NWebObject {
    constructor() {
        super(this);

        this._headers = null;
    }

    get headers() {
        return this._headers;
    }

    static create(url, port, callback) {
        require('http').createServer(function (req, res) {
            //console.log(req.headers);
            let body = [];
            let the = this;

            req.on('error', function (err) {
                console.error(err);
            }).on('data', function (chunk) {
                body.push(chunk);
                // console.log(chunk);
            }).on('end', function () {

                body = Buffer.concat(body).toString();
                // console.log(body);
                req.on('error', function (err) {
                    console.error(err);
                })

                let router = new NBaseRouter(this, req, res);
                router.match();
                console.log('reqtype: ' + router.requestType);
                console.log('translation: ' + router.translation);

                // if (req.url.indexOf("/api/") > -1) {
                if (router.requestType === 'rest') {
                    router = new NRestRouter(router);
                } else {
                    router = new NWebRouter(router);
                }
                router.parameters = (body !== '') ? JSON.parse(body) : null;

                console.log(req.url);
                router.translate(function (exists) {
                    if (exists) {
                        router.dispatch(function (rreq, rres, stream) {
                            the._headers = rreq.headers;
                            if (typeof callback === 'function') {
                                callback(rreq, rres, stream);
                            }

                            rres.write(stream);
                            rreq.emit('finish');
                        });
                    } else {
                        res.writeHead(404, {
                            'Content-Type': router.mimeType
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
    }
}

module.exports = NestJSWebApplication;