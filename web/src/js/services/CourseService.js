/**
 * everedu.UserService Module
 *
 * Description
 * Service used for user management
 */
angular.module('everedu.CourseService', ['firebase', 'firebase.utils'])
    .factory('CourseInfo', ['$firebaseObject', 'fbutil', '$stateParams',
        function($firebaseObject, fbutil, $stateParams) {
            return function() {
                var ref = fbutil.ref(['courses', $stateParams.courseID].join('/'));
                return $firebaseObject(ref);
            };
        }
    ])
