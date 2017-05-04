'use strict';
var SoundLib = SoundLib || {};

SoundLib.Data = {};

var mysql = require('mysql');
var tunnel = require('tunnel-ssh');
var fs = require('fs');

SoundLib.Data.Connection = function () {
    this.connection = null;
}

SoundLib.Data.Connection.prototype = {
    direct: function (callback) {
        var _conn = new mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'djay',
            password: 'demo',
            database: 'soundlib',
            charset: 'utf8mb4'
        });
        return _conn;
    },
    tunneled: function (callback) {
        
        var key = fs.readFileSync(APP_DATA + "/ssh/id_rsa");

        var config = {
            username: "david",
            host: "192.168.1.150:22",
            privateKey: key,
            dstPort: 3306
        };

        tunnel(config, function(err, server) {
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
