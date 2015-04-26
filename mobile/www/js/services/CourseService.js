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
            return function(courseID) {
                var ref = fbutil.ref(['courses', courseID || $stateParams.courseID, 'info'].join('/'));
                return $firebaseObject(ref);
            };
        }
    ])
    .factory('Attendance', ['$firebaseObject', '$firebaseArray', 'fbutil', '$stateParams',
        function($firebaseObject, $firebaseArray, fbutil, $stateParams) {
            var records;

            return {
                // return the control object stored in Firebase
                getControl: function(date) {
                    var ref =
                        fbutil.ref(['attendance', $stateParams.courseID, date, 'control']
                            .join('/'));
                    return $firebaseObject(ref);
                },
                // return the attendant list stored in Firebase
                getRecord: function(uid) {
                    var ref =
                        fbutil.ref(['student', uid, 'courseDetail', $stateParams.courseID, 'attendance']
                            .join('/'));
                    records = $firebaseArray(ref);
                    return records;
                },
                // add attendance record in Firebase
                addRecord: function(uid, name, record) {
                    var ref = records.$ref()
                    ref.child(record.date).set(record);

                    // remove from absentee
                    ref =
                        fbutil.ref(['attendance', $stateParams.courseID, record.date, 'absentee', uid]
                            .join('/'));
                    ref.remove();

                    // add to attendant
                    ref =
                        fbutil.ref(['attendance', $stateParams.courseID, record.date, 'attendant', uid]
                            .join('/'));
                    ref.set({
                        name: name,
                        date: new Date().toString()
                    })
                }
            };
        }
    ])
    .factory('Quiz', ['$firebaseObject', '$firebaseArray', '$firebaseUtils', 'fbutil', '$stateParams',
        function($firebaseObject, $firebaseArray, $firebaseUtils, fbutil, $stateParams) {
            var currentQuiz = null;
            var completedQuiz = null;

            return {
                // return the current quiz list stored in Firebase
                getCurrentQuiz: function() {
                    if (currentQuiz == null) {
                        var ref =
                            fbutil.ref(['quiz', $stateParams.courseID, 'current']
                                .join('/'));
                        currentQuiz = $firebaseArray(ref);
                    }

                    return currentQuiz;
                },
                // return the completed quiz list stored in Firebase
                getCompletedQuiz: function() {
                    if (completedQuiz == null) {
                        var ref =
                            fbutil.ref(['quiz', $stateParams.courseID, 'completed']
                                .join('/'));
                        completedQuiz = $firebaseArray(ref);
                    }

                    return completedQuiz;
                },
                // submit the quiz result
                submitQuiz: function(quiz) {
                    var ref =
                        fbutil.ref(['quiz', $stateParams.courseID, 'current',
                                quiz.$id, 'result', quiz.selection
                            ]
                            .join('/'));
                    ref.transaction(function(value) {
                        return value + 1;
                    })
                    console.log(currentQuiz)
                }
            };
        }
    ])
    .factory('Presentation', ['$firebaseObject', 'fbutil', '$stateParams',
        function($firebaseObject, fbutil, $stateParams) {
            // return the course object stored in Firebase
            return {
                pushRequest: function(request) {
                    var ref =
                        fbutil.ref(['presentation', $stateParams.courseID]
                            .join('/'));
                    requestRef = ref.push(request);
                    return $firebaseObject(requestRef);
                }
            }
        }
    ])