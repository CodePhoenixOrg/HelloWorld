/**
 * Description of playlist
 *
 * @author David
 */
var Playlist = function() {

};

//put your code here
Playlist.prototype.get = function() {
    //var result = Playlist::getUserFavorites($userId);
    return {'playlist': 'live'};
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