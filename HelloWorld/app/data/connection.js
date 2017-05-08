'use strict';
var SoundLib = SoundLib || {};

SoundLib.Data = {};

var mysql = require('mysql');

var config = {
        host: 'glacier',
        port: 3306,
        user: 'djay',
        password: 'demo',
        database: 'soundlib',
        charset: 'utf8mb4'
    };

SoundLib.Data.Connection = function() {};

SoundLib.Data.Connection.prototype = {
    direct : function () {
       return new mysql.createConnection(config);
    }
} 

module.exports = SoundLib.Data.Connection;
