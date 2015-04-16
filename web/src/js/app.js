'use strict';

angular.module('everedu', ['ui.bootstrap', 'ui.router', 'ngCookies', 
	'everedu.MainCtrl', 'everedu.UserCtrl'])
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            // For unmatched routes
            $urlRouterProvider.otherwise('/login');

            // Application routes
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'templates/login.html',
                    controller: 'LoginCtrl'
                })
                .state('dashboard', {
                    abstract: true,
                    url: '/dashboard',
                    templateUrl: 'templates/dashboard.html',
                    controller: 'MainCtrl'
                })
                .state('dashboard.user', {
                    abstract: true,
                    url: '/user',
                    views: {
                        'sidebar': {
                            templateUrl: 'templates/courseList.html',
                            controller: 'UserCtrl'
                        }
                    }
                })
                .state('dashboard.user.profile', {
                    url: '/profile',
                    views: {
                        'content@dashboard': {
                            templateUrl: 'templates/profile.html',
                            controller: 'ProfileCtrl'
                        }
                    }
                })
        }
    ]);;