/**
 * everedu.UserService Module
 *
 * Description
 * Service used for user management
 */
angular.module('everedu.UserService', ['firebase', 'firebase.utils'])
    .factory('Profile', ['$firebaseObject', 'fbutil',
        function($firebaseObject, fbutil) {
            return function(uid) {
                var ref = fbutil.ref(['instructor', uid, 'profile'].join('/'));
                return $firebaseObject(ref);
            };
        }
    ])
    .factory('CourseList', ['$firebaseArray', 'fbutil',
        function($firebaseArray, fbutil) {

            var CourseList = $firebaseArray.$extend({
                addCourse: function(course) {
                    this.$add(course.courseID);

                    var ref =
                        fbutil.ref(['courses', course.courseID, 'description'].join('/'));
                    ref.set(course)
                }
            });


            return function(uid) {
                var ref = fbutil.ref(['instructor', uid, 'courses'].join('/'));
                return new CourseList(ref);
            };
        }
    ])