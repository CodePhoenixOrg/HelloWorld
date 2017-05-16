'use strict';
let NestJSObject = require(__dirname + '/../core/object.js');

class NestJSWebObject extends NestJSObject {
    constructor(parent) {
        NestJSObject.bind(parent);
        super(parent)

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