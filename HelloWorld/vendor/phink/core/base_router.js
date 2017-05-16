'use strict';
let NestJSWebObject = require('../web/web_object.js');

class NestJSRouter extends NestJSWebObject { 
    constructor (req, res) {
        this.request = req;
        this.response = res;
        this.mimetype = '';
        this.encoding = '';
    }


    get MimeType () {
        return this.mimetype;
    }

    get Encoding () {
        return this.encoding;
    }

    translate (callback) {}

    dispatch (callback) {}
}

module.exports = NestJSRouter;