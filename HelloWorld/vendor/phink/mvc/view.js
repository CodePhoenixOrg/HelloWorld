'use strict';
let NestJSWebObject = require('../web/web_object.js');

class NestJSMVCView extends NestJSWebObject {
  
  constructor (viewName) {
    this.viewName = viewName;
    this.viewFileName = global.APP_VIEWS + viewName + '.html';
  
}

getTemplate  (callback) {
    require('fs').readFile(this.viewFileName, 'utf-8', function (err, data) {
        callback(err, data);
    });
}
}

module.exports = NestJSMVCView;