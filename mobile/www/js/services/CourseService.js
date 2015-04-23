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
            return function(courseID) {
                var ref = fbutil.ref(['courses', courseID||$stateParams.courseID, 'info'].join('/'));
                return $firebaseObject(ref);
            };
        }
    ])
    .factory('Attendance', ['$firebaseObject', '$firebaseArray', 'fbutil', '$stateParams',
        function($firebaseObject, $firebaseArray, fbutil, $stateParams) {
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
                        fbutil.ref(['student', uid, $stateParams.courseID, 'attendance']
                            .join('/'));
                    return $firebaseArray(ref);
                },
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