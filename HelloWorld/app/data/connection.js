var mysql = require('mysql');
var SoundLib = SoundLib || {}

Soundlib.Data = {}

SoundLib.Data.Connection = function () {
    this.connection = null;
}

SoundLib.Data.Connection.prototype = {
    open: function () {
        return mysql.createConnection({
            host: 'localhost',
            user: 'djay',
            password: 'demo',
            database: 'soundlib'
        });

    }
}

module.exports = SoundLib.Data.Connection;
