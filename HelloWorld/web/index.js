'use strict';

var port = process.env.PORT || 1234;
var app = require('../vendor/phink/server/web/web_application');

var Connection = require('../app/data/connection');
var conn = new Connection();
        console.log(PHINK_ROOT);

app.create('http://sample.loc', port, function (req, res, data) {
    console.log(req.headers);
    if(data.mimetype !== 'image/vnd.microsoft.icon') {
        console.log('received data: ' + data.stream);
        




        // app.get("/",function(req,res){
        // connection.query('SELECT * from user LIMIT 2', function(err, rows, fields) {
        // connection.end();
        // if (!err)
        //     console.log('The solution is: ', rows);
        // else
        //     console.log('Error while performing Query.');
        // });
        // });

        conn.open(function(stmt, srv) {

            // stmt.connect(function(err){
            //     if(!err) {
            //         console.log("Database is connected ... nn");    
            //     } else {
            //         console.log("Error connecting database ... nn");    
            //     }
            //     stmt.query('SELECT * from track', function(err, rows, fields) {
            //     if (!err)
            //         console.log('The solution is: ', rows);
            //     else
            //         console.log('Error while performing Query.');
            //     });
            // });            
            

            // stmt.end();        

        });
        

    }

});
