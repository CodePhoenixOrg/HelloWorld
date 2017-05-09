/**
 * Description of home
 *
 * @author David
 */
var Home = function() {

    //put your code here

    this.banner = "SoundLib";
    this.collection = "";
    this.userid = 0;
}
    
Home.prototype.load = function () {
        
    var coll = require(APP_MODELS + 'collection');

    coll.getAllTracks(function(data) {

        console.log(data);
        var result = '<ol>';
        data = data.collection;

        for(var i = 0; i < data.length; i++) {
            var duration = data[i].duration;

            var minutes = Math.floor(duration / 60);
            var seconds = duration - (minutes * 60);
            duration = minutes + ':' + ('00' + seconds).toString().slice(-2);

            result += '<li><a href="javascript:pl.addTrack(' + data[i].id + ')" ><img src="/css/images/add.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')'  + '</li>';
        }
        result += '</ol>';

        this.collection = result;
            
        this.userid = 1;
    })
}

