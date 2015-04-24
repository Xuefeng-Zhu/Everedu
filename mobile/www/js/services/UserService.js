/**
 * everedu.UserService Module
 *
 * Description
 * Service used for user management
 */
angular.module('everedu.UserService', ['firebase', 'firebase.utils', 'everedu.CourseService'])
    .factory('Profile', ['$firebaseObject', 'fbutil',
        function($firebaseObject, fbutil) {
            return function(uid) {
                var ref = fbutil.ref(['student', uid, 'profile'].join('/'));
                return $firebaseObject(ref);
            };
        }
    ])
    .factory('CourseList', ['$firebaseArray', 'fbutil', 'CourseInfo',
        function($firebaseArray, fbutil, CourseInfo) {
            var courseList = [];
            var courses = [];

            return {
                getCourses: function(uid) {
                    var ref = fbutil.ref(['student', uid, 'courses'].join('/'));
                    courseList = $firebaseArray(ref);
                    courseList.$loaded(
                        function(res) {
                            angular.forEach(res, function(value, key) {
                                courses.push(CourseInfo(value.$value));
                            })
                        });
                    return courses;
                },
                addCourse: function(course, uid, name) {
                    var ref = fbutil.ref(['courses', course.courseID, 'students', uid].join('/'));
                    ref.set(name);

                    courseList.$add(course.courseID);
                    courses.push(course);
                },
                deleteCourse: function(index, uid) {
                    var ref = fbutil.ref(['courses', index, 'students', uid].join('/'));
                    ref.remove();

                    courseList.$remove(index);
                    courses.splice(index, 1);
                }
            }
        }
    ])