var Phink = function() {}
Phink.DOM = Phink.DOM || {}
Phink.DOM.ready = function (f){/in/.test(document.readyState)?setTimeout('Phink.DOM.ready('+f+')',9):f()}

var loaded = [];

Phink.include = function (file, callback) {
    loaded[file] = 'nop';
    var myScript =  document.createElement("script");
    myScript.src = file;
    myScript.type = "text/javascript";

    myScript.addEventListener('load', function(e) {
        var Fh = null;
        var F = function (f) {
            clearTimeout(Fh);
            if(e.eventPhase !== 2) {
                Fh = setTimeout('F('+f+')',9);
            } else {
                clearTimeout(Fh);
                f();
            }
        };
    
        F(function() {
            if(typeof callback === 'function') {
                clearTimeout(Fh);
                callback.call(null, e);    
            }
        })
        
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
                var func = init[i] + "()";
                var handle = setTimeout(func, 1);
            }
        });
    }
})

