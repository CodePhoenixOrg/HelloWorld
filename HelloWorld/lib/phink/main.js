var Phink = function() {}
Phink.DOM = Phink.DOM || {}
Phink.DOM.ready = function (f){/in/.test(document.readyState)?setTimeout('Phink.DOM.ready('+f+')',9):f()}

Phink.include = function (file, callback) {
    var myScript =  document.createElement("script");
    myScript.src = file;
    myScript.type = "text/javascript";

    myScript.addEventListener('load', function(e) {
        if(typeof callback === 'function') {
            callback.call(null, e);    
        }
    })
    document.body.appendChild(myScript);
}

var mainNode = document.querySelectorAll("script[src='/phink/main.js']");
var sources = (mainNode.length > 0 && mainNode[0].dataset['sources'] !== undefined) ? mainNode[0].dataset['sources'].split(";") : [];
var init = (mainNode.length > 0 && mainNode[0].dataset['init'] !== undefined) ? mainNode[0].dataset['init'].split(";") : [];

Phink.DOM.ready(function () {
    for (var i = 0; i < sources.length; i++) {
        Phink.include(sources[i], function(e) {
            for (var i = 0; i < init.length; i++) {
                if(typeof window[init[i]] === 'function') {
                    window[init[i]]();
                    init.pop(init[i]);                  
                }
            }
        });
    }
    
});

