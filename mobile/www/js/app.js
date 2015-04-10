angular.module('everedu', ['ionic', 'everedu.MainCtrl', 'everedu.CoursesCtrl', 
    'everedu.AttendanceCtrl', 'everedu.QuizCtrl'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('courses', {
      url: '/courses',
      templateUrl: 'templates/courses.html',
      controller: 'CoursesCtrl'
    })
    .state('app', {
        url: '/app/:courseID',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    .state('app.info', {
        url: '/info',
        views: {
            'menuContent': {
                templateUrl: 'templates/details/info.html',
            }
        }
    })
    .state('app.attendance', {
        url: '/attendance',
        views: {
            'menuContent': {
                templateUrl: 'templates/details/attendance.html',
                controller: 'AttendanceCtrl'
            }
        }
    })
    .state('app.quiz', {
        url: '/quiz',
        views: {
            'menuContent': {
                templateUrl: 'templates/details/quiz.html',
                controller: 'QuizCtrl'
            }
        }
    })
    .state('app.quizList', {
        url: '/quizList/:status',
        views: {
            'menuContent': {
                templateUrl: 'templates/details/quizList.html',
                controller: 'QuizListCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
});