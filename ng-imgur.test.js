describe('ng-imgur', function () {

    chai.use(chaiAsPromised);

    var FAKE_ACCESS_TOKEN = 'fake token';

    var $imgur, $httpBackend;

    beforeEach(module('ngImgur', function ($imgurProvider) {
        $imgurProvider.accessToken = FAKE_ACCESS_TOKEN;
    }));

    beforeEach(inject(function ($injector) {
        $imgur = $injector.get('$imgur');

        // For now, just testing request expectations
        // TODO: acquire mock data from Imgur API to test return values
        $httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should provide a singleton instance of $imgur', function () {
        $imgur.should.exist;
    });

    describe('_makeRequest()', function () {

        it('should make a request to the url with the provided method and params, using the accessToken in an Authorization header', function () {

            var fakeUrlRoot = 'htt://www.imgur.com';
            var fakeUrl = fakeUrlRoot + '?testparam=true';
            var expectedHeaders = {
                "Authorization": "Bearer " + $imgur.getAccessToken(),
                "Accept": "application/json, text/plain, */*"
            };

            $httpBackend
                .expectGET(fakeUrl, expectedHeaders)
                .respond({});

            $imgur._makeRequest(fakeUrlRoot, 'GET', { testparam: true });
            $httpBackend.flush();
        });

        it('should return a promise for the result of the request', function () {

            var fakeUrl = 'http://www.imgur.com';

            var fakeResponse = {
                result: true
            };

            $httpBackend
                .expectGET(fakeUrl)
                .respond(fakeResponse);

            $imgur
                ._makeRequest(fakeUrl, 'GET')
                .should
                .eventually
                .become(fakeResponse);

            $httpBackend.flush();
        });

        it('should reject the returned promise if the request fails', function () {

            var fakeUrl = 'http://www.imgur.com';

            $httpBackend
                .expectGET(fakeUrl)
                .respond(500, {});

            $imgur
                ._makeRequest(fakeUrl, 'GET')
                .should
                .be
                .rejected;

            $httpBackend.flush();
        });
    });
});
