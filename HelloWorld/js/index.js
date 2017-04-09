/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var getCollection = function() {
    coll.fetch(function(data) {
        var result = '<ol>'
        data = data.collection

        for(var i = 0; i < data.length; i++) {
            var duration = data[i].duration

            var minutes = Math.floor(duration / 60)
            var seconds = duration - (minutes * 60)
            duration = minutes + ':' + ('00' + seconds).toString().slice(-2)

            result += '<li><a href="javascript:pl.addTrack(' + data[i].id + ')" ><img src="/css/images/add.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')'  + '</li>'
        }
        result += '</ol>'
        
        var div = document.getElementById('collection')
        if(div !== undefined) {
            div.innerHTML = result
        }
    })
    
}

var getUserFavorites = function() {
    pl.getFavorites(function(data) {
        var result = '<ol>'
        data = data.playlist
        if(data[0].artist === null && data[0].title === null) {
            result = 'La playlist est vide'
        } else {
            for(var i = 0; i < data.length; i++) {
                var duration = data[i].duration
                
                var minutes = Math.floor(duration / 60)
                var seconds = duration - (minutes * 60)
                duration = minutes + ':' + ('00' + seconds).toString().slice(-2)
            
                result += '<li><a href="javascript:pl.removeTrack(' + data[i].id + ')" ><img src="/css/images/delete.png" /></a>&nbsp;' + data[i].artist + ' - ' + data[i].title + ' (' + duration + ')'  + '</li>'
            }
            result += '</ol>'
        }
        
        var div = document.getElementById('playlist')
        if(div !== undefined) {
            div.innerHTML = result
        }
    })
    
}

var currentUser = 1
var usr = new SoundLib.User(currentUser)
var pl = new SoundLib.Playlist(currentUser)
var coll = new SoundLib.Collection()
pl.afterAddTrack = getUserFavorites
pl.afterRemoveTrack = getUserFavorites

SoundLib.DOM.ready(function() {
    
    usr.getInfo()
//    getCollection()
    getUserFavorites()
})