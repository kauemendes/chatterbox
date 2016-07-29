angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, Session) {
    console.log("Loaded");
})

<<<<<<< HEAD
.controller('StartCtrl', function($scope, Session) {
    console.log("Loaded");
    $scope.user = {
      name:"Kauê Mendes"
    };
=======
.controller('Assessment', function($scope, LoginService, $ionicPopup, $state) {
    console.log("Assessment Loaded");
    $scope.data = {};

    $scope.next = function() {
      $state.go('assessment-interest');
    };

>>>>>>> 4044b44346eccfed0af629c693a54e8b1d05edd1
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
<<<<<<< HEAD
            $state.go('app.start');
=======
            $state.go('assessment');
>>>>>>> 4044b44346eccfed0af629c693a54e8b1d05edd1
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
