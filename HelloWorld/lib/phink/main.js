var Phink = function() {}
Phink.DOM = Phink.DOM || {}
Phink.DOM.ready = function (f){/in/.test(document.readyState)?setTimeout('Phink.DOM.ready('+f+')',9):f()}

var loaded = [];

Phink.include = function (file) {
    loaded[file] = 'false';
    var myScript =  document.createElement("script");
    myScript.src = file;
    myScript.type = "text/javascript";
    myScript.addEventListener('load', function() {
        loaded[file] = 'true';
    })
    document.body.appendChild(myScript);
}

var mainNode = document.querySelectorAll("script[src='/phink/main.js']");
var sources = (mainNode.length > 0 && mainNode[0].dataset['sources'] !== undefined) ? mainNode[0].dataset['sources'].split(";") : [];
var init = (mainNode.length > 0 && mainNode[0].dataset['init'] !== undefined) ? mainNode[0].dataset['init'].split(";") : [];

Phink.DOM.ready(function () {
    for (var i = 0; i < sources.length; i++) {
        Phink.include(sources[i]);
    }

    for (var i = 0; i < init.length; i++) {
        //var f = function () { setTimeout(init[i], 10) };
        console.log(init[i] + ':' + (typeof f));
        
        var F  = function (f){
            if(/true/.test(loaded[f])) {
                console.log(f + ':' + (typeof f));
                setTimeout('F('+f+')',10) 
            } else {
                console.log(f + ':' + (typeof f));
                setTimeout(f, 10)
            };
        }

        F(init[i]);

    }
})

