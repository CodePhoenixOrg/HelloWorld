'use strict';

var port = process.env.PORT || 80;
var app = require('./lib/web_application');

app.create('http://sample.loc', port, function (req, res, data) {
    console.log(req.headers);
    console.log('received data: ' + data);

});
