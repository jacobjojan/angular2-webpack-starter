import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppState } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
var StressComponent = (function () {
    function StressComponent(appState, route, router) {
        this.appState = appState;
        this.route = route;
        this.router = router;
        // Set our default values
        this.localState = { value: '' };
        this.initialQuantity = 0;
    }
    StressComponent.prototype.ngOnInit = function () {
        var _this = this;
        // (+) converts string 'initialQuantity' to a number
        this.sub = this.route.queryParams.subscribe(function (params) { return _this.initialQuantity = +params['initialQuantity'] || 0; });
    };
    StressComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    StressComponent.prototype.submitState = function (value) {
        console.log('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    };
    return StressComponent;
}());
StressComponent = __decorate([
    Component({
        // The selector is what angular internally uses
        // for `document.querySelectorAll(selector)` in our index.html
        // where, in this case, selector is the string 'stress'
        selector: 'stress',
        // We need to tell Angular's Dependency Injection which providers are in
        // our app.
        providers: [],
        // Our list of styles in our component. We may add more to compose many
        // styles together
        styleUrls: ['./stress.component.css'],
        // Every Angular template is first compiled by the browser before Angular
        // runs it's compiler
        templateUrl: './stress.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [AppState,
        ActivatedRoute,
        Router])
], StressComponent);
export { StressComponent };
//# sourceMappingURL=stress.component.js.map