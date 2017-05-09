/**
 * Description of Playlist
 *
 * @author David
 */
var Track = function () {}

Track.getTrackById = function (trackId)
{
    var result = {};
    result.track = [];
    
    var mysql = require('mysql');
    var conf = require(APP_DATA + 'configuration');
    var stmt = mysql.createConnection(conf.parameters);
    
    var sql = "\
select trk_id as id, art_name as artist, trk_title as title, trk_duration as duration \
from artist a \
inner join track t on a.art_id = t.art_id \
where trk_id = ? \
";

    stmt.connect();
    stmt.query(sql, [trackId], function(err, rows, fields) {
      
      rows.forEach(function(element) {
            result.track.push({'track': element.track});
      })

      callback(result);
        
    });
    stmt.end(); 

}

