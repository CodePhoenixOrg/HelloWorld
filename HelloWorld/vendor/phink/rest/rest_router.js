'use strict';
var NestJSRouter = require('../core/base_router.js');

var path = require('path');
var fs = require('fs');

class NestJSRestRouter extends NestJSRouter {
	constructor(parent, req, res) {
		super(parent, req, res);

		this.application = null;
		this.apiName = '';
		this.className = '';
		this.baseNamespace = '';
		this.apiFileName = '';
		this.parameter = '';
		//this.application = app;
		// this.request = req;
		// this.response = res;
	}

	translate(callback) {
		//var nsParts = ('\\', __NAMESPACE__);
		//this.baseNamespace = array_shift(nsParts);

		var qstring = this.request.url.replace(/\/api\//, '');
		var qParts = qstring.split('/');
		this.apiName = qParts.shift();
		this.parameter = qParts.shift();

		//this.apiName = preg_replace('/[^a-z0-9_]+/i','', array_shift(qParts));
		this.className = this.apiName;

		this.apiFileName = global.APP_ROOT + 'rest' + path.sep + this.apiName + '.js';
		console.log(this.apiFileName);

		fs.exists(this.apiFileName, function (exists) {
			callback(exists);
		});
	}

	dispatch(callback) {
		var data = [];
		var method = this.request.method.toLowerCase();
		console.log(method);

		//var fqObject = this.baseNamespace + '\\Rest\\' + this.className;
		var fqObject = require(this.apiFileName);
		//var instance = new fqObject();

		var result = '';
		if (typeof fqObject[method] === 'function') {
			//result = fqObject[method]();
			var res = this.response;
			var req = this.request;
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
			console.log(this.className + '.' + method + ' not found');
		}

	}
}

module.exports = NestJSRestRouter;