'use strict';
let NestJSWebObject = require('../web/web_object.js');
let NestJSRegistry = require('./registry.js');

const WEB = 1;
const REST = 2;

class NestJSRouter extends NestJSWebObject {


    constructor(parent, req, res) {
        if (parent instanceof NestJSRouter) {
            super(parent.parent);
            this._request = parent.request;
            this._response = parent.response;
        } else {
            super(parent);
            this._request = req;
            this._response = res;
        }

        this._mimetype = '';
        this._encoding = '';
        this._parameters = {};
        this._routes = {};

    }

    get request() {
        return this._request;
    }

    get response() {
        return this._response;
    }

    match() {
        let result = WEB;

        return result;
    }

    get routes() {
        let _routes = NestJSRegistry.item('routes');

        if (_routes.length === undefined) {
            if (require('fs').existsSync(global.SITE_ROOT + 'routes.json')) {
                _routes = require('fs').readFileSync(global.SITE_ROOT + 'routes.json');
                _routes = _routes.toString();
            }
            if (_routes.length > 0) {
                _routes = JSON.parse(_routes);
                Object.keys(_routes).forEach(function (key) {
                    const value = _routes[key];
                    NestJSRegistry.write('routes', key, value);
                });
            }
        }

        return _routes;
    }

    get parameters() {
        return this._parameters;
    }
    set parameters(parameters) {
        this._parameters = parameters;
    }

    get mimeType() {
        return this._mimetype;
    }

    get encoding() {
        return this._encoding;
    }

    translate(callback) {}

    dispatch(callback) {}
}

module.exports = NestJSRouter;