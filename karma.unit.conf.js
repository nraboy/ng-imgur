module.exports = function(config) {
    config.set({

        basePath: './',

        frameworks: ['mocha', 'chai'],

        files: [
            'node_modules/chai-as-promised/lib/chai-as-promised',
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

        browsers: ['Chrome'],

        captureTimeout: 20000,

        singleRun: true,

        reportSlowerThan: 500,

        plugins: [
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-chai'
        ]
    });
};
