angular.module('starter.controllers', ['starter.services', 'ionic'])
.factory('$cordovaCapture', ['$q', function ($q) {
    return {
      media: new Media("myrecording.wav", this.onSuccess, this.onError),

      onSuccess: function () {
        console.log("Audio gravado com sucesso!");
      },

      onError: function () {
        console.log("Erro ao gravar o audio");
      },

      start: function () {
        this.media.startRecord();
        return this.media;
      },

      stop: function () {
        this.media.stopRecord();
        return this.media;
      }
    };
}])
.controller('AppCtrl', function($scope, Session) {
    console.log("Loaded");
    $scope.user = {
      name:"Mister User"
    };
})

.controller('ClassesCtrl', function($scope, Session, $cordovaCapture) {
    console.log("Loaded");
    $scope.user = {
      name:"Mister User",
      teacher:"Kevin Smith"
    };

    $scope.onHoldButtonRec = function () {
      $cordovaCapture.start();
    };

    $scope.onReleaseButtonRec = function () {
      $cordovaCapture.stop();
    };

    $scope.play = function () {
      $cordovaCapture.media.play();
    };
})

.controller('StartCtrl', function($scope, LoginService, $ionicPopup, $state) {
    console.log("Loaded");
    $scope.user = {
      name:"Mister User",
      teacher:"Kevin Smith"
    };

    $scope.goToAssessment = function () {
      $state.go('assessment');
    };
})

.controller('AssessmentCtrl', function($scope, $ionicLoading, $ionicPopup, $state) {
  console.log("Assessment Loaded");
  $scope.data = {};

  $scope.next = function() {
    $state.go('load-student-class');
  };


  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    }).then(function(){
      console.log("The loading indicator is now displayed");
    });

    setTimeout(function () {
       $ionicLoading.hide().then(function(){
        console.log("The loading indicator is now hidden");
        $state.go('app.class');
      });
    }, 2000);
  };
})

.controller('StudentCtrl', function($scope, $ionicLoading, $ionicPopup, $state) {
  console.log("Student LOADING");

})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        $state.go('app.start');
    }
})

.controller('SessionsCtrl', function($scope, Session) {
    $scope.sessions = Session.query();
})

.controller('SessionCtrl', function($scope, $stateParams, Session) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});
});
