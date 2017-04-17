/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Phink = function() {}

Phink.DOM = Phink.DOM || {}

Phink.DOM.ready = function (f){/in/.test(document.readyState)?setTimeout('Phink.DOM.ready('+f+')',9):f()}

Phink.include = function (file) {
    var myScript =  document.createElement("script")
    myScript.src = file
    myScript.type = "text/javascript"
    document.body.appendChild(myScript)
}
