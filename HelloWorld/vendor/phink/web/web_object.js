'use strict';
let NestJSObject = require(__dirname + '/../core/object.js');

class NestJSWebObject extends NestJSObject {
    constructor(parent) {
        super(parent)

        this.Parent(parent);
    }

    static include(file, encoding, callback) {
        require('fs').readFile(file, encoding, function (err, stream) {
            if (typeof callback === 'function') {
                callback(err, stream);
            }

        });
    }
}

module.exports = NestJSWebObject;