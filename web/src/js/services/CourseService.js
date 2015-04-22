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
                var ref = fbutil.ref(['courses', $stateParams.courseID, 'info'].join('/'));
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
                getAttendant: function() {
                    var ref =
                        fbutil.ref(['attendance', $stateParams.courseID, 'attendant']
                            .join('/'));
                    return $firebaseArray(ref);
                },
                // return the absentee list stored in Firebase
                getAbsentee: function() {
                    var ref =
                        fbutil.ref(['attendance', $stateParams.courseID, 'absentee']
                            .join('/'));
                    return $firebaseArray(ref);
                }
            };
        }
    ])