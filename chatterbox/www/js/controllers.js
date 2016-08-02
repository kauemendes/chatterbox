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
        var fx = new Media('/android_asset/www/sounds/recording.mp3', function () {
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

.controller('ClassesCtrl', function($scope, Session, $cordovaCapture, $state) {
    console.log("Loaded");
    $scope.user = {
      name:"Mister User",
      teacher:"Mister Teacher"
    };

    $scope.topic = $state.params.topic;
    $scope.holding = false;
    $scope.audioItens = [];

    setTimeout(function () {
        $scope.audioItens.push({
            type: 'teacher',
            name: 'Mirian',
            file: '/android_asset/www/sounds/teacher.wav'
        });
        $scope.$apply();
    }, 2000);

    $scope.onHoldButtonRec = function () {
        $scope.holding = true;
        $cordovaCapture.playFx(function (status) {
          if (status == 4) {
            $cordovaCapture.start();
          }
        });
    };

    $scope.onReleaseButtonRec = function () {
        $scope.holding = false;
        var file = $cordovaCapture.stop();
        $scope.audioItens.push({
            name: 'Kaue Mendes',
            type: 'user',
            file: file
        });

        setTimeout(function (){
          var lista = angular.element(document.querySelector('#list-conversation'));
          lista[0].scrollTop = lista.prop("scrollHeight");
        }, 500);
    };

    $scope.playSound = function (file, index) {
      angular.element(document.querySelector('#blabla'+index))
        .removeClass('ion-play')
        .addClass('ion-load-d');
      var audio = new Media(file, function(){}, function () {},
      function (status) {
        console.log(status);
        if (status == 4) {
          angular.element(document.querySelector('#blabla'+index))
          .removeClass('ion-load-d')
          .addClass('ion-play');
        }
      });

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
    $scope.finded_teacher = true;
    $scope.topic          = $state.params.topic;

    $scope.user = {
      name:"Mister User",
    };

    $scope.teacher = {
        name:"Mister Teacher",
        rate: [],
        classes: 29,
    }

    $scope.teacher.rate.push({'name':'teste'});
    $scope.teacher.rate.push({'name':'teste'});
    $scope.teacher.rate.push({'name':'teste'});
    $scope.teacher.rate.push({'name':'teste'});

    $scope.goClass = function() {
        $state.go('class', {'topic':$scope.topic});
    }

    $scope.teacherClick = function(){
        if($scope.finded_teacher)
            $scope.finded_teacher = false;
        else
            $scope.finded_teacher = true;
    }

    console.log('$scope',$scope);
    setTimeout(function(){
        $scope.teacherClick();
        $scope.$apply();
    }.bind($scope), 3000);

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
