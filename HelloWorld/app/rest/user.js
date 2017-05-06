/**
 * Description of playlist
 *
 * @author David
 */
var User = function() {

};

//put your code here
User.get = function() {
    //var result = Playlist::getUserFavorites($userId);
    return {'name': 'Lambda'};
}
 
//Playlist.prototype.put function($playlist, $trackId) {
//    $return = \SoundLib\Models\Playlist::addTrack($playlist, $trackId);
//    $this->response->setData($return);
//}

//Playlist.prototype.delete = function($trackId) {
//    $return = \SoundLib\Models\Playlist::removeTrack($trackId);
//    $this->response->setData($return);
//}

module.exports = User;