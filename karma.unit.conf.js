module.exports = function(config) {
    config.set({

        basePath: './',

        frameworks: ['mocha', 'chai'],

        files: [
            'node_modules/chai-as-promised/lib/chai-as-promised.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'ng-imgur.js',
            'ng-imgur.test.js'
        ],

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],

        captureTimeout: 20000,

        singleRun: false,

        reportSlowerThan: 500,

        plugins: [
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-chai'
        ]
    });
};
