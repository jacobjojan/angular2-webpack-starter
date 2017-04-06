import { inject, TestBed } from '@angular/core/testing';
// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { AppState } from './app.service';
describe('App', function () {
    // provide our implementations or mocks to the dependency injector
    beforeEach(function () { return TestBed.configureTestingModule({
        providers: [
            AppState,
            AppComponent
        ]
    }); });
    it('should have a url', inject([AppComponent], function (app) {
        expect(app.url).toEqual('https://twitter.com/AngularClass');
    }));
});
//# sourceMappingURL=app.component.spec.js.map