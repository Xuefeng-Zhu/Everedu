/**
 * The bootstrap script used to config the whole application
 */

'use strict';

angular.module('everedu', ['ui.bootstrap', 'ui.router', 'ngCookies', 'googlechart',
    'everedu.MainCtrl', 'everedu.UserCtrl', 'everedu.CourseCtrl'
])
    // from https://github.com/firebase/angularfire-seed/blob/master/app/app.js
    .run(['$rootScope', 'Auth',
        function($rootScope, Auth) {
            // track status of authentication
            Auth.$onAuth(function(user) {
                console.log(user)
                $rootScope.user = !!user;
            });
        }
    ])
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
                .state('dashboard.course', {
                    abstract: true,
                    url: '/course/:courseID',
                    views: {
                        'sidebar': {
                            templateUrl: 'templates/courseMenu.html'
                        }
                    }
                })
                .state('dashboard.course.info', {
                    url: '/info',
                    views: {
                        'content@dashboard': {
                            templateUrl: 'templates/course/info.html',
                            controller: 'InfoCtrl'
                        }
                    }
                })
                .state('dashboard.course.attendance', {
                    url: '/attendance',
                    views: {
                        'content@dashboard': {
                            templateUrl: 'templates/course/attendance.html',
                            controller: 'AttendanceCtrl'
                        }
                    }
                })
                .state('dashboard.course.quiz', {
                    url: '/quiz',
                    views: {
                        'content@dashboard': {
                            templateUrl: 'templates/course/quiz.html',
                            controller: 'QuizCtrl'
                        }
                    }
                })
        }
    ]);;