'use strict';
var port = process.env.PORT || 1337;
var app = require('./lib/web_application');

app.create('http://sample.loc', port, function (req, res) {

    app.include(__dirname, 'Page1.html', function (err, data) {

        if (!err) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(data);
            res.end();
        } else {
            console.log(err);
        }
            
    });
    
});
