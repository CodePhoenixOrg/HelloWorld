'use strict';
var Playlist = function() {};

Playlist.getConnection = function () {
    var conf = require(global.APP_DATA + 'configuration');
    var mysql = require('mysql').createConnection(conf.parameters);
    return mysql;    
}

//put your code here
Playlist.getUserFavorites = function (userId, callback) {
    
    var result = {};
    result.playlist = [];
    result.pid = 0;

    var mysql = Playlist.getConnection();

    var sql = " \
select p.pls_id as pid, plc_id as id, art_name as artist, trk_title as title, trk_duration as duration \
from user u \
left join playlist p on p.usr_id = u.usr_id \
left join playlist_content c on c.pls_id = p.pls_id \
left join track t on c.trk_id = t.trk_id \
left join artist a on t.art_id = a.art_id \
where u.usr_id = ? \
";

    mysql.connect();
    mysql.query(sql, [userId], function(err, rows, fields) {
      
      rows.forEach(function(element) {
            result.pid = element.pid;
            result.playlist.push({'id': element.id,'artist': element.artist, 'title': element.title, 'duration': element.duration});
      })

      callback(result);
        
    });
    mysql.end(); 
      
}

Playlist.addTrack = function(playlist, trackId, callback)
{
    //\SoundLib\Lib\Log::debug('GOING TO ADD : ' . print_r(['playlist' => $playlist, 'trackId' => $trackId], true));

    var mysql = Playlist.getConnection();
    
    var sql = " \
insert into playlist_content (`pls_id`, `trk_id`) values(?, ?) \
";
    
    mysql.connect();
    mysql.query(sql, [playlist, trackId], function(err, rows, fields) {
        var data = null;
        if(!err) {
            var affectedRows = 1;
        
            data = {'inserted': affectedRows, 'playlist': playlist, 'trackId': trackId};

        } else {
            data = {'error': err};
        }

        callback(data);
    });
    
}

//     public static function removeTrack($trackId)
//     {
//         $cnn = new Connection();
//         $stmt = $cnn->open();
        
//         $sql = <<<DELETE
// delete from playlist_content where plc_id = :trackId
// DELETE;
        
//         $res = $stmt->prepare($sql);
//         $res->execute([':trackId' => $trackId]);
        
//         $affectedRows = $res->rowCount();
        
//         return ['deleted' => $affectedRows, 'trackId' => $trackId];
//     }

console.log(__filename);

module.exports = Playlist;
