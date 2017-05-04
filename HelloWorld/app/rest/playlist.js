var pl = require(APP_MODELS + 'playlist');
/**
 * Description of playlist
 *
 * @author David
 */
var Playlist = function() {

};

//put your code here
Playlist.get = function(callback) {
    var userId = 1;
    pl.getUserFavorites(userId, function(data) {
        callback(data.playlist);
    });
}
 
//Playlist.prototype.put function($playlist, $trackId) {
//    $return = \SoundLib\Models\Playlist::addTrack($playlist, $trackId);
//    $this->response->setData($return);
//}

//Playlist.prototype.delete = function($trackId) {
//    $return = \SoundLib\Models\Playlist::removeTrack($trackId);
//    $this->response->setData($return);
//}

module.exports = Playlist;