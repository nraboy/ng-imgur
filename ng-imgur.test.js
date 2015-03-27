describe('ng-imgur', function () {

    var FAKE_ACCESS_TOKEN = 'fake token';

    var $imgur;

    beforeEach(module('ngImgur', function ($imgurProvider) {
        $imgurProvider.accessToken = FAKE_ACCESS_TOKEN;
    }));

    beforeEach(inject(function ($injector) {
        $imgur = $injector.get('$imgur');
    }));

    it('should provide a singleton instance of $imgur', function () {
        $imgur.should.exist;
    });

});
