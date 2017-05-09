var tr = require(APP_MODELS + 'track');

/**
 * Description of playlist
 *
 * @author David
 */

var Track = function() {}

//put your code here
Track.get = function(callback) {
    var trackId = 1;
    tr.getTrackById(trackId, function(data) {
        callback(data);
    });
}