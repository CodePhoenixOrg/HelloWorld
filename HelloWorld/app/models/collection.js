
/**
 * Description of Playlist
 *
 * @author David
 */
var Collection = function() {}
  
    //put your code here
Collection.getAllTracks = function(callback) {
    var result = [];
    result.collection = [];
  
    var Connection = require(APP_DATA + 'connection');
    var conn = new Connection();

    var sql = "\
select trk_id as id, art_name as artist, trk_title as title, trk_duration as duration \
from artist a \
inner join track t on a.art_id = t.art_id \
order by art_name, trk_title \
";

    var stmt = conn.direct();
    stmt.connect(function(err) {});
    stmt.query(sql, function(err, rows, fields) {
      
      rows.forEach(function(element, i) {
        result.collection.push(element);
      })
      
      callback(result);
        
        
    });
    stmt.end(); 

    
    
}

module.exports = Collection;