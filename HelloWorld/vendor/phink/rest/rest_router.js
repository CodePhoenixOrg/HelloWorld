'use strict';
var NestJSRouter = require('../core/base_router.js');

var path = require('path');
var fs = require('fs');

class NestJSRestRouter extends NestJSRouter {
	constructor(parent, req, res) {
		super(parent, req, res);

		this._apiName = '';
		this._className = '';
		this._baseNamespace = '';
		this._apiFileName = '';
	}

	translate(callback) {

		var qstring = this.request.url.replace(/\/api\//, '');
		var qParts = qstring.split('/');
		this._apiName = qParts.shift();
		this._parameter = qParts.shift();

		//this._apiName = preg_replace('/[^a-z0-9_]+/i','', array_shift(qParts));
		this._className = this._apiName;

		this._apiFileName = global.APP_ROOT + 'rest' + path.sep + this._apiName + '.js';
		console.log(this._apiFileName);

		fs.exists(this._apiFileName, function (exists) {
			callback(exists);
		});
	}

	dispatch(callback) {
		var data = [];
		var method = this._request.method.toLowerCase();
		console.log(method);

		var fqObject = require(this._apiFileName);
		//var instance = new fqObject();

		var result = '';
		if (typeof fqObject[method] === 'function') {
			//result = fqObject[method]();
			var res = this._response;
			var req = this._request;
			
			var data = this._parameters;

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