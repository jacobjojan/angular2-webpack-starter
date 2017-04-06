import { ActivatedRoute } from '@angular/router';
import { inject, TestBed } from '@angular/core/testing';
// Load the implementations that should be tested
import { AboutComponent } from './about.component';
describe('About', function () {
    // provide our implementations or mocks to the dependency injector
    beforeEach(function () { return TestBed.configureTestingModule({
        providers: [
            // provide a better mock
            {
                provide: ActivatedRoute,
                useValue: {
                    data: {
                        subscribe: function (fn) { return fn({
                            yourData: 'yolo'
                        }); }
                    }
                }
            },
            AboutComponent
        ]
    }); });
    it('should log ngOnInit', inject([AboutComponent], function (about) {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        about.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=about.component.spec.js.map