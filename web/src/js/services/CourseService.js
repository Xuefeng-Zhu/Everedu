/**
 * everedu.CourseService Module
 *
 * Description
 * Service used for course management
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

            // add students in the course student list into the absentee list
            function initAbsenteeHelper() {
                var ref = absentee.$ref();
                angular.forEach(students, function(value, key) {
                    ref.child(value.$id).set({
                        name: value.$value,
                        date: new Date().toString()
                    });
                });
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
                // initlize the absentee list when the attendance control get initialized
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
                },
                // set students in absentee list missing class
                setAbsentee: function() {
                    angular.forEach(absentee, function(value, key) {
                        var date = new Date(value.date).toDateString();
                        var ref =
                            fbutil.ref(['student', value.$id, 'courseDetail', $stateParams.courseID,
                                'attendance', date
                            ].join('/'));
                        ref.set({
                            date: date,
                            status: 'miss'
                        });
                    });
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
                // add the quiz into corresponding list
                addQuiz: function(quiz) {
                    var state = quiz.completed ? 'completed' : 'current';
                    var ref =
                        fbutil.ref(['quiz', $stateParams.courseID, state]
                            .join('/'));
                    ref.child(quiz.$id).set($firebaseUtils.toJSON(quiz));
                    return $firebaseObject(ref.child(quiz.$id));
                },
                // remove the quiz from its list
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
    .factory('Presentation', ['$firebaseArray', 'fbutil', '$stateParams',
        function($firebaseArray, fbutil, $stateParams) {
            // return the course object stored in Firebase
            return {
                getRequests: function(request) {
                    var ref =
                        fbutil.ref(['presentation', $stateParams.courseID]
                            .join('/'));
                    return $firebaseArray(ref);
                }
            }
        }
    ])
    .factory('Chat', ['$firebaseArray', 'fbutil', '$stateParams',
        function($firebaseArray, fbutil, $stateParams) {
            // return the latest chat array stored in Firebase
            return function(limit) {
                var ref = fbutil.ref(['chat', $stateParams.courseID].join('/'));
                return $firebaseArray(ref.limitToLast(limit));
            };
        }
    ])