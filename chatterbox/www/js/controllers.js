angular.module('starter.controllers', ['starter.services', 'ionic'])
.factory('$cordovaCapture', ['$q', function ($q) {
    return {

      soundfx: null,
      media: null,
      file_audio: null,

      onSuccess: function () {
        console.log("Audio gravado com sucesso!");
      },

      onError: function () {
        console.log("Erro ao gravar o audio");
      },

      start: function () {
        var random = Math.floor(Math.random()*(10000-1000+1)+1000);
        this.file_audio = "myrecording"+String(random)+".wav";
        this.media = new Media(this.file_audio, this.onSuccess, this.onError);
        this.media.startRecord();
        return this.media;
      },

      stop: function () {
        if (this.media != null) {
          this.media.stopRecord();
          return this.file_audio;
        }
      },

      playFx: function (func) {
        var fx = new Media('/android_asset/www/recording.mp3', function () {
          console.log("certo!");
        }, function (err) {
          console.log("Errado", err);
        }, func);
        fx.play();
        this.soundfx = fx;
        return this.soundfx;
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

    $scope.audioItens = [];

    $scope.onHoldButtonRec = function () {
      $cordovaCapture.playFx(function (status) {
        console.log("Status fx", status);
        if (status == 4) {
          console.log("Tocando");
          $cordovaCapture.start();
        }
      });


    };

    $scope.onReleaseButtonRec = function () {
      var file = $cordovaCapture.stop();

      $scope.audioItens.push({
        name: 'blabla',
        file: file,
      });

      console.log($scope.audioItens);

    };

    $scope.playSound = function (file) {
          console.log("Tocando o audio!");
          var audio = new Media(file);
          audio.play();
    };

    $scope.play = function () {
      $cordovaCapture.media.play();
    };

    $scope.playFx = function () {
      $cordovaCapture.playFx();
    };
})

.controller('StartCtrl', function($scope, LoginService, $ionicPopup, $state) {
    console.log("Loaded");
    $scope.user = {
      name:"Mister User",
      teacher:"Kevin Smith"
    };

    $scope.goToAssessment = function (val) {
        if( val == "collective" )
        {
            $state.go('assessment-collective');
        }
        else
        {
            $state.go('assessment');
        }
    };
})

.controller('AssessmentCtrl', function($scope, $ionicLoading, $ionicPopup, $state) {
  console.log("Assessment Loaded");
  $scope.data = {};

  $scope.next = function(val) {
      $scope.type = val;
      $state.go('load-student-class', {'topic':val});
  };

  // $scope.show = function() {
  //   $ionicLoading.show({
  //     template: 'Loading...'
  //   }).then(function(){
  //     console.log("The loading indicator is now displayed");
  //   });
  //
  //   setTimeout(function () {
  //      $ionicLoading.hide().then(function(){
  //       console.log("The loading indicator is now hidden");
  //       $state.go('app.class');
  //     });
  //   }, 2000);
  // };
})

.controller('StudentCtrl', function($scope, $ionicLoading, $ionicPopup, $state) {

    $scope.goClass = function() {
        $state.go('class');
    }

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
