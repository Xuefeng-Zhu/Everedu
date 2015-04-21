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