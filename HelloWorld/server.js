'use strict';

var port = process.env.PORT || 1337;
var app = require('./lib/web_application');

app.create('http://sample.loc', port, function (req, res) {

    app.getView('Page1.html', function (err, data) {

        if (!err) {
            console.log('received data: ' + data);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        } else {
            console.log(err);
        }

    });

});
