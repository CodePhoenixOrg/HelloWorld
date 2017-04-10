/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global TRest */

//
var TView = function(application, name) {
    
    TWebObject.call(this);
    
    this.id = 'view' + Date.now();
    this.domain = (application !== undefined) ? application.getDomain() : '';
    this.token = '';
    this.name = name;
    
    this.parent = application;
    
    TRegistry.item(this.domain).view = this;
    
};

TView.prototype = new TWebObject();
TView.prototype.constructor = TView;

TView.create = function(parent, name) {
    return new TView(parent, name);
};

TView.prototype.requestSimpleView = function (view, callback) {
    this.requestView(view, 'getViewHtml', null, callback);
}

TView.prototype.requestView = function (view, action, args, callback) {
    
    var the = this;
    var token = TRegistry.getToken();
    var urls = this.getPath(view, this.domain);
    
    var postData = {"action" : action, "token" : token};
    if(args != null) {
        for(var key in args) {
            postData[key] = args[key];
        }
    }

    var xhr = new XMLHttpRequest()

    var params = '';
    for(var key in postData) {
        if (postData.hasOwnProperty(key)) {
            params += '&' + encodeURI(key + '=' + postData[key]);
        }
    }
    params = params.substring(1);

    xhr.open('POST', urls);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Accept", "application/json, text/javascript, request/view, */*; q=0.01");
    xhr.onload = function() {
        if(typeof callback === 'function') {
            if (xhr.status === 200) {
                var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : [];

    //            var url = TWebObject.parseUrl(pageName);
    //            TRegistry.item(the.name).origin = xhr.getResponseHeader('origin');
                TRegistry.setOrigin(xhr.getResponseHeader('origin'));
                TRegistry.setToken(data.token);

                if(data.scripts !== undefined) {
                    var l = data.scripts.length;
                    for(var i = 0; i < l; i++) {
                        the.getScript(data.scripts[i]);
                    }
                }

                data.view = base64_decode(data.view);
                if(typeof callback === 'function') {
                    callback.call(this, data);
                } else {
                    $(document.body).html(data.view);

                }
            } else {
                callback.call(this, xhr.status);
                
            }
        }
    }
    xhr.send(params);

};

TView.prototype.requestPart = function (pageName, action, attach, postData, callback) {

    var the = this;
    var token = TRegistry.getToken();
    var urls = this.getPath(pageName, this.domain);

    postData = postData || {};
    
    postData.action = action;
    postData.token = token;

    var the = this;
    var xhr = new XMLHttpRequest()

    var params = '';
    for(var key in postData) {
        if (postData.hasOwnProperty(key)) {
            params += '&' + encodeURI(key + '=' + postData[key]);
        }
    }
    params = params.substring(1);

    xhr.open('POST', urls);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Accept", "application/json, text/javascript, request/partialview, */*; q=0.01");
    xhr.onload = function() {
        try {
            if(typeof callback === 'function') {
                var data = [];
                data.status = xhr.status;

                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : [];
                    TRegistry.setToken(data.token);
                    TRegistry.setOrigin(xhr.getResponseHeader('origin'));

                    if(data.scripts !== undefined) {
                        var l = data.scripts.length;
                        for(var i = 0; i < l; i++) {
                            the.getScript(data.scripts[i]);
                        }
                    }

                    var html = base64_decode(data.view);
                    $(attach).html(html);

                    if(typeof callback === 'function') {
                        callback.call(this, data);
                    }
                } else {
                    callback.call(this, xhr.status);

                }
            }
        }
        catch(e) {
            debugLog(e);
        }    
    }
    xhr.send(params);
    
};

TView.prototype.parseResponse = function(response, callback) {
    if(response === '') {
        throw new Error('Response is empty !');
    }
    var the = this;
    
    response = base64_decode(response);
    
    var data = JSON.parse(response);
    if(data['view'] === undefined) {
        throw new Error('Not a view !');
    }

    if(data.scripts !== undefined) {
        var l = data.scripts.length;
        for(var i = 0; i < l; i++) {
            the.getScript(data.scripts[i]);
        }
    }

    if(typeof callback === 'function') {
        callback.call(this, data);
    }            

};

TView.prototype.attachWindow = function (pageName, anchor) {
    this.requestSimpleView(pageName, function(data) {
        if(anchor !== undefined) {
            $(anchor).html(data.view);
        } else {
            $(document.body).html(data.view);
        }
    });
};

TView.prototype.attachView = function (pageName, anchor) {
    var the = this;
    var myToken = TRegistry.getToken();
    
    this.getJSON(pageName, {"action" : 'getViewHtml', "token" : myToken}, function(data) {
        try {
            TRegistry.setToken(data.token);

            if(data.scripts !== undefined) {
                var l = data.scripts.length;
                for(var i = 0; i < l; i++) {
                    the.getScript(data.scripts[i]);
                }
            }

            var html = base64_decode(data.view);
            $(anchor).html(html);                
        }
        catch(e) {
            debugLog(e);
        }
    });
};
    
TView.prototype.attachIframe = function(id, src, anchor) {
    var iframe = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.id = id;
    iframe.setAttribute("src", src);
    document.getElementById(anchor).appendChild(iframe);

};