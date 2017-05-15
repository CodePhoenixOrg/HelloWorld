'use strict';
NestJSWebObject = require('../web/web_object.js');

var NestJSMVCController = function (viewName) {
    this.viewName = viewName;
    NestJSWebObject.apply(this, arguments);
};

NestJSMVCController.prototype = new NestJSWebObject();
NestJSMVCController.prototype.constructor = NestJSMVCController;

NestJSMVCController.prototype.load = function () {}

NestJSMVCController.prototype.view = new(require(PHINK_ROOT + 'mvc/view'))(this.viewName);

NestJSMVCController.prototype.render = function (callback) {
    console.log("RENDER");
    var self = this;
    this.load().bind(this).then(function () {
        self.parse(function (data) {
            callback(data);
        });
    });

}

NestJSMVCController.prototype.parse = function (callback) {
    this.view.getTemplate(function (err, template) {
        var matches = template.match("/(<% [a-z]+ %>)/");

        matches.forEach(function (match) {
            var variable = match.replace(/%\>/, '', match.replace(/\<%/, ''));
            template = template.replace(match, this[variable]);
        });

        callback(template);

    });

}

module.exports = NestJSMVCController;