import { browser, by, element } from 'protractor';
describe('App', function () {
    beforeEach(function () {
        browser.get('/');
    });
    it('should have a title', function () {
        var subject = browser.getTitle();
        var result = 'Angular2 Webpack Starter by @gdi2290 from @AngularClass';
        expect(subject).toEqual(result);
    });
    it('should have header', function () {
        var subject = element(by.css('h1')).isPresent();
        var result = true;
        expect(subject).toEqual(result);
    });
    it('should have <home>', function () {
        var subject = element(by.css('app home')).isPresent();
        var result = true;
        expect(subject).toEqual(result);
    });
    it('should have buttons', function () {
        var subject = element(by.css('button')).getText();
        var result = 'Submit Value';
        expect(subject).toEqual(result);
    });
});
//# sourceMappingURL=app.e2e.js.map