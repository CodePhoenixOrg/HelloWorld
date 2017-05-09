'use strict';

var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}

NestJS.Web.Object = require('../web/web_object.js');

NestJS.MVC.View = function (viewName) {
    this.viewName = viewName;
    this.viewFileName = APP_VIEWS + viewName + '.html';
    NestJS.Web.Object.apply(this, arguments);
};

NestJS.MVC.View.prototype = new NestJS.Web.Object();
NestJS.MVC.View.prototype.constructor = NestJS.MVC.View;
    
NestJS.MVC.View.prototype.getTemplate = function (callback)
{
    require('fs').readFile(this.viewFileName, 'utf-8', function(err, data) {
        callback(err, data);
    });
}

module.exports = NestJS.MVC.View;