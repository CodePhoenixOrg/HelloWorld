/**
 * Description of user
 *
 * @author David
 */
var User = function () {}

    //put your code here
User.getInfo = function (userId)
{
    var result = {};
    result.info = [];
    
    var mysql = require('mysql');
    var conf = require(APP_DATA + 'configuration');
    var stmt = mysql.createConnection(conf.parameters);

    var sql = " \
select usr_id as id, usr_name as name, usr_email as email \
from user \
where usr_id = ? \
SELECT \
"

    stmt.connect();
    stmt.query(sql, [userId], function(err, rows, fields) {
      
      rows.forEach(function(element) {
            result.info.push(element);
      })

      callback(result);
        
    });
    stmt.end();

}
