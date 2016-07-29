angular.module('starter.controllers', ['starter.services', 'ionic'])
.controller('AppCtrl', function($scope, Session) {
    console.log("Loaded");
    $scope.user = {
      name:"Kauê Mendes"
    };
})

.controller('StartCtrl', function($scope, LoginService, $ionicPopup, $state) {
    console.log("Loaded");
    $scope.user = {
      name:"Kauê Mendes"
    };

    $scope.goToAssessment = function () {
      $state.go('assessment');
    };
})

.controller('Assessment', function($scope, $ionicLoading, $ionicPopup, $state) {
  console.log("Assessment Loaded");
  $scope.data = {};

  $scope.next = function() {
    $state.go('assessment-interest');
  };


  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    }).then(function(){
      console.log("The loading indicator is now displayed");
    });

    setInterval(function () {
       $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
        $state.go('app.class');
      });
    }, 2000);
  };
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('app.start');
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
