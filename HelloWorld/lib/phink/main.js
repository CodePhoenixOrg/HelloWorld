var Phink = function() {}
Phink.DOM = Phink.DOM || {}
Phink.DOM.ready = function (f){/in/.test(document.readyState)?setTimeout('Phink.DOM.ready('+f+')',9):f()}

Phink.include = function (file, callback) {
    var tag =  document.createElement("script");
    tag.src = file;
    tag.type = "text/javascript";

    tag.addEventListener('load', function(e) {
        if(typeof callback === 'function') {
            callback.call(null, e);    
        }
    })
    document.body.appendChild(tag);
}

var mainNode = document.querySelectorAll("script[src='/phink/main.js']");
var sources = (mainNode.length > 0 && mainNode[0].dataset['sources'] !== undefined) ? mainNode[0].dataset['sources'].split(";") : [];
var init = (mainNode.length > 0 && mainNode[0].dataset['init'] !== undefined) ? mainNode[0].dataset['init'] : null;

Phink.DOM.ready(function () {
    for (var i = 0; i < sources.length; i++) {
        Phink.include(sources[i], function(e) {
            if(typeof window[init] === 'function') {
                window[init]();
            }
        });
    }
});

