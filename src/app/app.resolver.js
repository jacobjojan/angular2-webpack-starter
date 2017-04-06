import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
var DataResolver = (function () {
    function DataResolver() {
    }
    DataResolver.prototype.resolve = function (route, state) {
        return Observable.of({ res: 'I am data' });
    };
    return DataResolver;
}());
DataResolver = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DataResolver);
export { DataResolver };
// an array of services to resolve routes with data
export var APP_RESOLVER_PROVIDERS = [
    DataResolver
];
//# sourceMappingURL=app.resolver.js.map