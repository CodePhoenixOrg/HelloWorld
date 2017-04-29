    var qstring = this.request.url;
    var qParts = qstring.split('/');
    this.className = qParts.shift();
	this.method = qParts.shift();
 
    this.classFileName = APP_ROOT + 'controller' + path.sep + this.className + '.js';
    console.log(this.classFileName);
    
    var data = [];
    console.log(method);

    var fqObject = require(this.classFileName);

    var result = '';
    if(typeof fqObject[this.method] === 'function') {
        result = fqObject[this.method]();
    } else {
        console.log(this.className + '.' + method + ' not found');
    }

    this.response.write(JSON.stringify(result));
    this.response.end();

