// the code is from https://github.com/firebase/angularfire-seed
angular.module('firebase.auth', ['firebase', 'firebase.utils'])
  .factory('Auth', ['$firebaseAuth', 'fbutil', function($firebaseAuth, fbutil) {
    return $firebaseAuth(fbutil.ref());
  }]);
