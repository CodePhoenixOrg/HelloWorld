'use strict';
var NestJS = NestJS || {}

NestJS.Object = function (parent) {
    this.id = '';
    this.name = '';
    this.parent = (parent !== undefined) ? parent : null;
};

NestJS.Object.prototype = {
    setId: function (value) {
        this.id = value;

        return this;
    },
    getId: function () {
        return this.id;
    },
    setName: function (value) {
        this.name = value;

        return this;
    },
    getName: function () {
        return this.name;
    },
    setParent: function (parent) {
        this.parent = (parent !== undefined) ? parent : null;
    },
    getParent: function () {
        return this.parent;
    }
};


module.exports = NestJS.Object;