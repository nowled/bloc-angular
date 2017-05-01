(function() {
    function config($stateProvider, $locationProvider) {}
    //Disable Hashbang Mode
    $locationProvider
        .html5Mode({
            enabled: true,
            requireBase: false
        });

    $stateProvider
        .state('landing', {
            url: '/',
            templateUrl: '/templates/landing.html'
        })
        .state('album', {
            url: '/album',
            templateUrl: '/templates/album.html'

        })
        .state('collection', {
            url: '/collection',
            templateUrl: '/templates/collection.html'
        });
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();
