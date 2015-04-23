/**
 * everedu.UserService Module
 *
 * Description
 * Service used for user management
 */
angular.module('everedu.UserService', ['firebase', 'firebase.utils', 'everedu.CourseService'])
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
                addCourse: function(course) {
                    courseList.$add(course.courseID);
                    courses.push(course);
                },
                deleteCourse: function(index) {
                    courseList.$remove(index);
                    courses.splice(index, 1);
                }
            }
        }
    ])