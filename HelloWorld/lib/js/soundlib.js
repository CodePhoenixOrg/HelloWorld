/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var SoundLib = function() {}

SoundLib.DOM = function () {}

SoundLib.User = function(userId) {
    this.currentUser = userId
}

SoundLib.Collection = function() {}

SoundLib.Playlist = function(userId) {
    this.currentUser = userId
    this.cuurentPlaylist = 0
}

/**
 * 
 * @param {type} f
 * @returns {undefined}
 */
SoundLib.DOM.ready = function(f){/in/.test(document.readyState)?setTimeout('SoundLib.DOM.ready('+f+')',9):f()}

/**
 * Performs a get request on User object and retrieves its properties giving its Id
 * 
 * @returns JSON stream
 */
SoundLib.User.prototype.getInfo = function() {
    Rest.get('/api/user/' + this.currentUser, function(data) {
        var user = data.info[0]
        document.getElementById('name').innerHTML = user.name
        document.getElementById('email').innerHTML = user.email
    })
}

/**
 * Performs a get request on collection object and retrieves all the tracks
 * 
 * @returns JSON stream
 */
SoundLib.Collection.prototype.fetch = function(callback) {
    Rest.get('/api/collection', function(data) {
        if(typeof callback === 'function') {
            callback.call(this, data)
        }
    })
    
}

/**
 * Performs a get request on user's playlist and retrieves all its tracks giving the userId
 * 
 * @returns JSON stream
 */
SoundLib.Playlist.prototype.getFavorites = function(callback) {
    var the = this
    Rest.get('/api/playlist/' + this.currentUser, function(data) {
        if(typeof callback === 'function') {
            the.currentPlaylist = data.pid
            callback.call(this, data)
        }
    })
    
}

/**
 * Performs a put request on user's playlist to add title chosen in the collection by its Id collection
 * 
 * @returns JSON stream
 */
SoundLib.Playlist.prototype.addTrack = function(trackId) {
    var the = this
    Rest.put('/api/playlist/' + this.currentPlaylist, {'track' : trackId}, function(data) {
        if(data.inserted == 1) {
            the.afterAddTrack()
        }
    })
}

SoundLib.Playlist.prototype.afterAddTrack = function() {}
/**
 * Performs a delete request on user's playlist to remove a title giving its Id in playlist
 * 
 * @returns JSON stream
 */
SoundLib.Playlist.prototype.removeTrack = function(trackId) {
    var the = this
    Rest.delete('/api/playlist/' + trackId, function(data) {
        if(data.deleted == 1) {
            the.afterRemoveTrack()
        }
    })
}

SoundLib.Playlist.prototype.afterRemoveTrack = function() {}

var Rest = (function() {
    var F = function() {

    }

    /**
     * Performs a HEAD request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream
     */
    F.prototype.head = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('HEAD', url)
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send()
    }

    /**
     * Performs a GET request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream
     */
     F.prototype.get = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send()
    }

    /**
     * Performs a POST request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream on callback
     */
     F.prototype.post = function(url, data, callback) {

        var xhr = new XMLHttpRequest()

        var params = '';
        for(var key in data) {
            if (data.hasOwnProperty(key)) {
                params += '&' + encodeURI(key + '=' + data[key])
            }
        }
        params = params.substring(1);

        xhr.open('POST', url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send(params);
    }

    /**
     * Performs a PATCH request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream on callback
     */
    F.prototype.patch = function(url, data, callback) {

        var xhr = new XMLHttpRequest()

        var params = '';
        for(var key in data) {
            if (data.hasOwnProperty(key)) {
                params += '&' + encodeURI(key + '=' + data[key])
            }
        }
        params = params.substring(1);

        xhr.open('PATCH', url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send(params);
    }

    /**
     * Performs a PUT request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream on callback
     */
    F.prototype.put = function(url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        };
        xhr.send(JSON.stringify(data));    
    }

    /**
     * Performs a DELETE request and return the result to a callback function
     * 
     * @param {type} url
     * @param {type} callback
     * @returns JSON stream on callback
     */
    F.prototype.delete = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('DELETE', url)
        xhr.onload = function() {
            if(typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : []
                    callback.call(this, data)
                } else {
                    callback.call(this, xhr.status)
                }
            }
        }
        xhr.send()
    }
    
    return new F()
})()

