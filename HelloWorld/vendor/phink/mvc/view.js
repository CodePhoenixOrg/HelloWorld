'use strict';
NestJSWebObject = require('../web/web_object.js');

NestJSMVCView = function (viewName) {
    this.viewName = viewName;
    this.viewFileName = APP_VIEWS + viewName + '.html';
    NestJSWebObject.apply(this, arguments);
};

NestJSMVCView.prototype = new NestJSWebObject();
NestJSMVCView.prototype.constructor = NestJSMVCView;

NestJSMVCView.prototype.getTemplate = function (callback) {
    require('fs').readFile(this.viewFileName, 'utf-8', function (err, data) {
        callback(err, data);
    });
}

module.exports = NestJSMVCView;