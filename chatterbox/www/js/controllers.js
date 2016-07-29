angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, Session) {
    console.log("Loaded");
})

.controller('Assessment', function($scope, LoginService, $ionicPopup, $state) {
    console.log("Assessment Loaded");
    $scope.data = {};

    $scope.next = function() {
      $state.go('assessment-interest');
    };

})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('assessment');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('SessionsCtrl', function($scope, Session) {
    $scope.sessions = Session.query();
})

.controller('SessionCtrl', function($scope, $stateParams, Session) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});
});
