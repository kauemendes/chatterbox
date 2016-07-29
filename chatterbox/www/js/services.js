angular.module('starter.services', ['ngResource'])

.factory('Session', function ($resource, $http) {
    return $resource('http://localhost:5000/sessions/:sessionId');
})

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if ((name == 'user' && pw == 'secret') || (name == '' && pw == '')) {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});
