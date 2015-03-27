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
                    var deferred = $q.defer();
                    $http({
                        method: "GET",
                        url: this.apiBase + "/account/" + username,
                        headers: {
                            "Authorization": "Bearer " + this.accessToken
                        }
                    })
                    .success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },

                /*
                 * Return the images the user has favorited in the gallery.
                 */
                getAccountGalleryFavorites: function(username) {
                    var deferred = $q.defer();
                    $http({
                        method: "GET",
                        url: this.apiBase + "/account/" + username + "/gallery_favorites",
                        headers: {
                            "Authorization": "Bearer " + this.accessToken
                        }
                    })
                    .success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },

                /*
                 * Returns the users favorited images, only accessible if you're logged in as the user.
                 */
                getAccountFavorites: function(username) {
                    var deferred = $q.defer();
                    $http({
                        method: "GET",
                        url: this.apiBase + "/account/" + username + "/favorites",
                        headers: {
                            "Authorization": "Bearer " + this.accessToken
                        }
                    })
                    .success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },

                /*
                 * Return the images a user has submitted to the gallery
                 */
                getAccountSubmissions: function(username) {
                    var deferred = $q.defer();
                    $http({
                        method: "GET",
                        url: this.apiBase + "/account/" + username + "/submissions",
                        headers: {
                            "Authorization": "Bearer " + this.accessToken
                        }
                    })
                    .success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },

                /*
                 * Returns the account settings, only accessible if you're logged in as the user.
                 */
                getAccountSettings: function(username) {
                    var deferred = $q.defer();
                    $http({
                        method: "GET",
                        url: this.apiBase + "/account/" + username + "/settings",
                        headers: {
                            "Authorization": "Bearer " + this.accessToken
                        }
                    })
                    .success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },

                /*
                 * Updates the account settings for a given user, the user must be logged in.
                 */
                setAccountSettings: function(username, params) {
                    var deferred = $q.defer();
                    $http({
                        method: "POST",
                        url: this.apiBase + "/account/" + username + "/settings",
                        headers: {
                            "Authorization": "Bearer " + this.accessToken
                        },
                        params: params
                    })
                    .success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },

                /*
                 * Return all of the images associated with the account. You can page through the images by setting the page, this defaults to 0.
                 */
                getAccountImages: function(username, page) {
                    var deferred = $q.defer();
                    if(page === undefined) { page = 0; }
                    $http({
                        method: "GET",
                        url: this.apiBase + "/account/" + username + "/images/" + page,
                        headers: {
                            "Authorization": "Bearer " + this.accessToken
                        }
                    })
                    .success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },

                /*
                 * Upload a new image.
                 */
                imageUpload: function(params) {
                    var deferred = $q.defer();
                    $http({
                        method: "POST",
                        url: this.apiBase + "/image",
                        headers: {
                            "Authorization": "Bearer " + this.accessToken
                        },
                        params: params
                    })
                    .success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },

                /*
                 * Returns the images in the gallery.
                 */
                getGallery: function(section, sort, page, dateRange, showViral) {
                    var deferred = $q.defer();
                    var galleryEndpoint = this.apiBase + "/gallery";
                    if(section !== undefined) { galleryEndpoint += "/" + section; }
                    if(sort !== undefined) { galleryEndpoint += "/" + sort; }
                    if(dateRange !== undefined) { galleryEndpoint += "/" + dateRange; }
                    if(showViral !== undefined) { galleryEndpoint += "?showViral=" + showViral; }
                    $http({
                        method: "GET",
                        url: galleryEndpoint,
                        headers: {
                            "Authorization": "Bearer " + this.accessToken
                        }
                    })
                    .success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                },

                /*
                 * Get list of all conversations for the logged in user.
                 */
                getConversationList: function() {
                    var deferred = $q.defer();
                    $http({
                        method: "GET",
                        url: this.apiBase + "/conversations",
                        headers: {
                            "Authorization": "Bearer " + this.accessToken
                        }
                    })
                    .success(function(result) {
                        deferred.resolve(result);
                    })
                    .error(function(error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                }

            };

            return new Imgur(this.accessToken);
        }];
    });

})();
