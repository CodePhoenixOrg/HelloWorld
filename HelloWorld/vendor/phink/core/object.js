'use strict';

class NestJSObject {
    constructor(parent) {
        this.id = '';
        this.name = '';
        this.parent = (parent !== undefined) ? parent : null;
    }

    set Id(value) {
        this.id = value;

        return this;
    }
    get Id() {
        return this.id;
    }

    set Name(value) {
        this.name = value;

        return this;
    }
    get Name() {
        return this.name;
    }

    set Parent(parent) {
        this.parent = (parent !== undefined) ? parent : null;
    }
    get Parent() {
        return this.parent;
    }
}


module.exports = NestJSObject;