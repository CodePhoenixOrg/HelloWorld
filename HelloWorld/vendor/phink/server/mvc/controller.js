'use strict';

var NestJS = NestJS || {}
NestJS.Web = NestJS.Web || {}
NestJS.MVC = NestJS.MVC || {}

NestJS.Web.Object = require('../web/web_object.js');

NestJS.MVC.Controller = function (viewName) {
    this.viewName = viewName;
    NestJS.Web.Object.apply(this, arguments);
};

NestJS.MVC.Controller.prototype = new NestJS.Web.Object();
NestJS.MVC.Controller.prototype.constructor = NestJS.MVC.Controller;

NestJS.MVC.Controller.prototype.load = function () {}

NestJS.MVC.Controller.prototype.view = new (require(PHINK_ROOT + 'server/mvc/view'))(this.viewName);

NestJS.MVC.Controller.prototype.render = function (callback)
{
    this.load(function(data) {
        this.parse(function (data) {
            callback.bind(this, data);
        }).bind(this);

    });

}

NestJS.MVC.Controller.prototype.parse = function (callback) 
{
    this.view.getTemplate(function(err, template) {
        var matches = template.match("/(<% [a-z]+ %>)/");
        
        matches.forEach(function (match) {
            var variable = match.replace(/%\>/, '', match.replace(/\<%/, ''));
            template = template.replace(match, this[variable]);
        });
        
        callback(template);

    });

}

module.exports = NestJS.MVC.Controller;