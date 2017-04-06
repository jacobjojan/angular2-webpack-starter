import { Component } from '@angular/core';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */
console.log('`Detail` component loaded asynchronously');
var DetailComponent = (function () {
    function DetailComponent() {
    }
    DetailComponent.prototype.ngOnInit = function () {
        console.log('hello `Detail` component');
    };
    return DetailComponent;
}());
DetailComponent = __decorate([
    Component({
        selector: 'detail',
        template: "\n    <h1>Hello from Detail</h1>\n    <router-outlet></router-outlet>\n  "
    }),
    __metadata("design:paramtypes", [])
], DetailComponent);
export { DetailComponent };
//# sourceMappingURL=detail.component.js.map