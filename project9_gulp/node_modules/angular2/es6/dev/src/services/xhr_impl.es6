var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/di';
import { PromiseWrapper } from 'angular2/src/facade/async';
import { XHR } from './xhr';
export let XHRImpl = class extends XHR {
    get(url) {
        var completer = PromiseWrapper.completer();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'text';
        xhr.onload = function () {
            var status = xhr.status;
            if (200 <= status && status <= 300) {
                completer.resolve(xhr.responseText);
            }
            else {
                completer.reject(`Failed to load ${url}`, null);
            }
        };
        xhr.onerror = function () { completer.reject(`Failed to load ${url}`, null); };
        xhr.send();
        return completer.promise;
    }
};
XHRImpl = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], XHRImpl);
//# sourceMappingURL=xhr_impl.js.map