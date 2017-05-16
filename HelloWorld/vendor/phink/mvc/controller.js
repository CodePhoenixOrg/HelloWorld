'use strict';
let NestJSWebObject = require('../web/web_object.js');

class NestJSMVCController extends NestJSWebObject {
    constructor(parent, viewName) {
        NestJSWebObject.bind(parent);
        super(parent);
        this.viewName = viewName;
        this.view = new (require(global.PHINK_ROOT + 'mvc/view'))(parent, viewName);
    }

    load() { }

    render(callback) {
        console.log("RENDER");

        this.load();

        this.parse(function (data) {
            callback(data);
        });
    }

    parse(callback) {
        this.view.getTemplate(function (err, template) {
            console.log(template);
            let matches = template.match("/(\<% [a-z]+ %\>)/");

            if (matches) {
                matches.forEach(function (match) {
                    let variable = match.replace(/%\>/, '', match.replace(/\<%/, ''));
                    template = template.replace(match, this[variable]);
                });
            }

            callback(template);

        });

    }
}
module.exports = NestJSMVCController;