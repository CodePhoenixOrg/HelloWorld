'use strict';

var port = process.env.PORT || 1234;
var app = require('../vendor/phink/server/web/web_application');

var Connection = require('../app/data/connection');
var conn = new Connection();

app.create('http://sample.loc', port, function (req, res, data) {
    // console.log(req.headers);
    if(data.mimetype !== 'image/vnd.microsoft.icon') {
        //console.log('received data: ' + data.stream);
    }
        
    // var stmt = conn.direct();
    // stmt.connect(function(err) {});
    // stmt.query('SELECT * from track', function(err, rows, fields) {
    //     console.log(fields);
    // });
    // stmt.end();        

});
