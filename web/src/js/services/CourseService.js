/**
 * everedu.UserService Module
 *
 * Description
 * Service used for user management
 */
angular.module('everedu.CourseService', ['firebase', 'firebase.utils'])
    .factory('CourseInfo', ['$firebaseObject', 'fbutil', '$stateParams',
        function($firebaseObject, fbutil, $stateParams) {
            // return the course object stored in Firebase
            return function() {
                var ref =
                    fbutil.ref(['courses', $stateParams.courseID, 'info']
                        .join('/'));
                return $firebaseObject(ref);
            };
        }
    ])
    .factory('Attendance', ['$firebaseObject', '$firebaseArray', 'fbutil', '$stateParams',
        function($firebaseObject, $firebaseArray, fbutil, $stateParams) {
            var absentee = null;
            var students = null;

            function initAbsenteeHelper() {
                var ref = absentee.$ref();
                angular.forEach(students, function(value, key) {
                    ref.child(value.$id).set({
                        name: value.$value,
                        date: new Date().toString()
                    });
                })
            }

            return {
                // return the control object stored in Firebase
                getControl: function(date) {
                    var ref =
                        fbutil.ref(['attendance', $stateParams.courseID, date, 'control']
                            .join('/'));
                    return $firebaseObject(ref);
                },
                // return the attendant list stored in Firebase
                getAttendant: function(date) {
                    var ref =
                        fbutil.ref(['attendance', $stateParams.courseID, date, 'attendant']
                            .join('/'));
                    return $firebaseArray(ref);
                },
                // return the absentee list stored in Firebase
                getAbsentee: function(date) {
                    var ref =
                        fbutil.ref(['attendance', $stateParams.courseID, date, 'absentee']
                            .join('/'));
                    absentee = $firebaseArray(ref);
                    return absentee;
                },
                initAbsentee: function() {
                    if (students) {
                        initAbsenteeHelper();
                    } else {
                        var ref =
                            fbutil.ref(['courses', $stateParams.courseID, 'students']
                                .join('/'));
                        students = $firebaseArray(ref);
                        students.$loaded(initAbsenteeHelper);
                    }
                }
            };
        }
    ])
    .factory('Quiz', ['$firebaseObject', '$firebaseArray', '$firebaseUtils', 'fbutil', '$stateParams',
        function($firebaseObject, $firebaseArray, $firebaseUtils, fbutil, $stateParams) {
            return {
                // return the current quiz list stored in Firebase
                getCurrentQuiz: function() {
                    var ref =
                        fbutil.ref(['quiz', $stateParams.courseID, 'current']
                            .join('/'));
                    return $firebaseArray(ref);
                },
                // return the completed quiz list stored in Firebase
                getCompletedQuiz: function() {
                    var ref =
                        fbutil.ref(['quiz', $stateParams.courseID, 'completed']
                            .join('/'));
                    return $firebaseArray(ref);
                },
                addQuiz: function(quiz) {
                    var state = quiz.completed ? 'completed' : 'current';
                    var ref =
                        fbutil.ref(['quiz', $stateParams.courseID, state]
                            .join('/'));
                    ref.child(quiz.$id).set($firebaseUtils.toJSON(quiz));
                    return $firebaseObject(ref.child(quiz.$id));
                },
                removeQuiz: function(quiz) {
                    var state = quiz.completed ? 'completed' : 'current';
                    var ref =
                        fbutil.ref(['quiz', $stateParams.courseID, state]
                            .join('/'));
                    ref.child(quiz.$id).remove();
                }
            };
        }
    ])