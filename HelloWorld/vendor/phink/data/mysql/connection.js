'use strict';
var NestJS = NestJS || {}
NestJS.Data = NestJS.Data || {}

NestJS.Data.MySQL = {};

var mysql = require('mysql');
var tunnel = require('tunnel-ssh');
var fs = require('fs');

NestJS.Data.MySQL.Connection = function (config) {
    this.config = config;
};

NestJS.Data.MySQL.Connection.prototype = {
    direct: function () {
        _conn = new mysql.createConnection(this.config);
        return _conn;
    },
    tunneled: function (sshConfig, callback) {
        
        var key = fs.readFileSync(APP_DATA + "/ssh/id_rsa");

        // var config = {
        //     username: "lambda",
        //     host: "192.168.1.150:22",
        //     privateKey: key,
        //     dstPort: 3306
        // };

        tunnel(sshConfig, function(err, server) {
            if (err) {
                return console.log(err);
            }
            // var _conn = new mysql.createConnection({
            //     host: 'localhost',
            //     port: 3307,
            //     user: 'djay',
            //     password: 'demo',
            //     database: 'soundlib'
            // });
            var _conn = null;
            

            if(typeof callback === 'function') {
                callback.call(null, _conn, server);
            }
        });

        // var _conn = mysql.createConnection({
        //     host: 'localhost',
        //     user: 'djay',
        //     password: 'demo',
        //     database: 'soundlib'
        // });

        


    }
}

module.exports = SoundLib.Data.Connection;
