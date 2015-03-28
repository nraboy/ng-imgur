(function(){

    angular.module("ngImgur", []).provider("$imgur", function () {

        this.accessToken = null;
        this.apiBase = "https://api.imgur.com/3";

        this.$get = ['$q', '$http', function ($q, $http) {

            if(this.accessToken === null)
                throw new Error('An access token is required to create $imgur');

            var Imgur = function(accessToken) {
                this.accessToken = accessToken;
                this.apiBase = "https://api.imgur.com/3";
            };

            Imgur.prototype = {

                getAccessToken: function() {
                    return this.accessToken;
                },

                /*
                 * Request standard user information. If you need the username for the account that is logged in, it is returned in the request for an access token.
                 */
                getAccount: function(username) {

                    var url = this.apiBase + "/account/" + username;

                    return this._makeRequest(url, "GET");
                },

                /*
                 * Return the images the user has favorited in the gallery.
                 */
                getAccountGalleryFavorites: function(username) {

                    var url = this.apiBase + "/account/" + username + "/gallery_favorites";

                    return this._makeRequest(url, "GET");
                },

                /*
                 * Returns the users favorited images, only accessible if you're logged in as the user.
                 */
                getAccountFavorites: function(username) {

                    var url = this.apiBase + "/account/" + username + "/favorites";

                    return this._makeRequest(url, "GET");
                },

                /*
                 * Return the images a user has submitted to the gallery
                 */
                getAccountSubmissions: function(username) {

                    var url = this.apiBase + "/account/" + username + "/submissions";

                    return this._makeRequest(url, "GET");
                },

                /*
                 * Returns the account settings, only accessible if you're logged in as the user.
                 */
                getAccountSettings: function(username) {

                    var url = this.apiBase + "/account/" + username + "/settings";

                    return this._makeRequest(url, "GET");
                },

                /*
                 * Updates the account settings for a given user, the user must be logged in.
                 */
                setAccountSettings: function(username, params) {

                    var url = this.apiBase + "/account/" + username + "/settings";

                    return this._makeRequest(url, "POST", params);
                },

                /*
                 * Return all of the images associated with the account. You can page through the images by setting the page, this defaults to 0.
                 */
                getAccountImages: function(username, page) {

                    if(page === undefined) {
                        page = 0;
                    }

                    var url = this.apiBase + "/account/" + username + "/images/" + page;

                    return this._makeRequest(url, "GET");
                },

                /*
                 * Upload a new image.
                 */
                imageUpload: function(params) {

                    var url = this.apiBase + "/image";

                    return this._makeRequest(url, "POST", params);
                },

                /*
                 * Returns the images in the gallery.
                 */
                getGallery: function(section, sort, page, dateRange, showViral) {

                    var galleryEndpoint = this.apiBase + "/gallery";
                    if(section !== undefined) { galleryEndpoint += "/" + section; }
                    if(sort !== undefined) { galleryEndpoint += "/" + sort; }
                    if(dateRange !== undefined) { galleryEndpoint += "/" + dateRange; }
                    if(showViral !== undefined) { galleryEndpoint += "?showViral=" + showViral; }

                    return this._makeRequest(galleryEndpoint, "GET");
                },

                /*
                 * Get list of all conversations for the logged in user.
                 */
                getConversationList: function() {

                    var url = this.apiBase + "/conversations";

                    return this._makeRequest(url, "GET");
                },

                /**
                 * Executes a request with the given url, method, and optional
                 * params and returns a $q promise for the result
                 * @param {string} url - the url to access
                 * @param {string} method - the http method to use
                 * @param {?object} params - any parameters to pass
                 * @returns {Promise<object>} a promise for the result
                 */
                _makeRequest: function(url, method, params) {

                    var settings = {
                        method: method,
                        url: url,
                        headers: {
                            "Authorization": "Bearer " + this.accessToken
                        }
                    };

                    if(params) {
                        settings.params = params;
                    }

                    var deferred = $q.defer();

                    $http(settings)
                        .success(function (result) {
                            deferred.resolve(result);
                        })
                        .error(function (error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }
            };

            return new Imgur(this.accessToken);
        }];
    });

})();
