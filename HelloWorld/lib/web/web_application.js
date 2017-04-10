
var TWebApplication = function(domain, name, isSSL) {
    TWebObject.call(this, domain, isSSL);
    
    this.id = 'app' + Date.now();
    if(name === undefined) {
        name = this.id;
    }
    
    this.name = name;
    //this.domain = domain;
    this.viewCollection = [];
    this.controllerCollection = [];
  
};

TWebApplication.prototype = new TWebObject();
TWebApplication.prototype.constructor = TWebApplication;

TWebApplication.create = function(domain, name, isSSL) {
    return new TWebApplication(domain, name, isSSL);
};

TWebApplication.prototype.includeView = function(name) {
    include('app/controllers/' + name + '/' + name + '.js');
    var newView = TView.create(this, name);
    this.addView(newView);
    
    return newView;
};

TWebApplication.prototype.createView = function(name) {
    var newView = TView.create(this, name);
    this.addView(newView);
    
    return newView;
};


TWebApplication.prototype.createController = function(view, name) {
    var newCtrl = TController.create(view, name);
    this.addController(newCtrl);
    
    return newCtrl;
};

TWebApplication.prototype.getViewByName = function(viewName) {
    var result = null;
    
    for(var name in this.viewCollection) {
        if(this.viewCollection[name] !== undefined) {
            result = this.viewCollection[name];
            break;
        }
    }
    
    return result;
}

TWebApplication.prototype.addView = function(view) {
    if(view === undefined) return null;

    if(!(view instanceof TView)) {
        throw new Error('This is not a view');
    } else {
        this.viewCollection[view.getName()] = view;
    }

};

TWebApplication.prototype.addController = function(controller) {
    if(controller === undefined) return null;

    if(!(controller instanceof TController)) {
        throw new Error('This is not a controller');
    } else {
        this.controllerCollection.push(controller);
    }

};