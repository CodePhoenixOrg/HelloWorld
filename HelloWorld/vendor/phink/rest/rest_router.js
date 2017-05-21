'use strict';
var NestJSRouter = require('../core/base_router.js');

class NestJSRestRouter extends NestJSRouter {
	constructor(parent, req, res) {
		super(parent, req, res);

		this._apiName = '';
		this._apiFileName = '';
	}

	translate(callback) {

		console.log(this.translation);
		if (this.translation === '') {
			callback(false);
			return false;
		}
        let baseurl = require('url').parse(this._translation, true);
		this._apiName = require('path').basename(baseurl.pathname);
		this._parameters = this._parameters || {};
		Object.assign(this._parameters, baseurl.query);

		this._apiFileName = global.APP_ROOT + 'rest' + global.DIRECTORY_SEPARATOR  + this._apiName + '.js';
		console.log(this._apiFileName);

		require('fs').exists(this._apiFileName, function (exists) {
			callback(exists);
		});
	}

	dispatch(callback) {
		var data = [];
		var method = this._request.method.toLowerCase();
		console.log(method);

		var fqObject = require(this._apiFileName);

		var result = '';
		if (typeof fqObject[method] === 'function') {
			var res = this._response;
			var req = this._request;

			var data = this._parameters || {};

			console.log(data);

			Object.keys(data).forEach(function (key) {
				const value = data[key];
				const fqProperty = fqObject[key];

				if (typeof fqProperty === 'function') {
					fqProperty(value);
					var res = fqProperty();
					console.log(res);
				}

			});

			fqObject[method](function (data) {
				//res.statusCode = 200;
				//res.setHeader('Content-Type', 'application/json');
				res.writeHead(200, { 'Content-Type': 'application/json', 'charset': 'utf-8' });
				var stream = JSON.stringify(data);
				if (typeof callback === 'function') {
					callback(req, res, stream);
				}
			});
		} else {
			console.log(this._className + '.' + method + ' not found');
		}

	}
}

module.exports = NestJSRestRouter;