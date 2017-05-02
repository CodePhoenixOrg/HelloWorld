var coll = require(APP_MODELS + 'collection');

/**
 * Description of playlist
 *
 * @author David
 */
var Collection = function() {};

//put your code here
Collection.get = function(callback) {
    //var result = Playlist::getUserFavorites($userId);
    coll.getAllTracks(function(data) {
        callback(data.collection);
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

module.exports = Collection;