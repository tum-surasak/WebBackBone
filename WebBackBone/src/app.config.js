var appConfig = function ($stateProvider, $urlRouterProvider, authenProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('panel', {
            url: '/panel',
            templateUrl: '/src/layouts/panel.view.html',
        })
        .state('home', {
            url: '/home',
            templateUrl: '/src/layouts/home.view.html'
        });
}

appConfig.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    'authenProvider'
];