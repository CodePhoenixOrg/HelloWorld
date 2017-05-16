'use strict';
let NestJSWebObject = require('../web/web_object.js');

class NestJSMVCController extends NestJSWebObject {
    constructor(viewName) {
        this.viewName = viewName;
        this.view = new (require(global.PHINK_ROOT + 'mvc/view'))(this.viewName);
    }

    load() { }

    render(callback) {
        console.log("RENDER");
        let self = this;
        this.load().bind(this).then(function () {
            self.parse(function (data) {
                callback(data);
            });
        });

    }

    parse(callback) {
        this.view.getTemplate(function (err, template) {
            let matches = template.match("/(<% [a-z]+ %>)/");

            matches.forEach(function (match) {
                let variable = match.replace(/%\>/, '', match.replace(/\<%/, ''));
                template = template.replace(match, this[variable]);
            });

            callback(template);

        });

    }
}
module.exports = NestJSMVCController;