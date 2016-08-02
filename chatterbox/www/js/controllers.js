angular.module('ionic-ratings', ['ionic'])
.directive('ionicRatings', function(){
    return {
      restrict: 'AE',
      replace: true,
      template: '<div class="text-center ionic_ratings">' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(1)" ng-show="rating < 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(1)" ng-show="rating > 0" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(2)" ng-show="rating < 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(2)" ng-show="rating > 1" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(3)" ng-show="rating < 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(3)" ng-show="rating > 2" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(4)" ng-show="rating < 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(4)" ng-show="rating > 3" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOff}} ionic_rating_icon_off" ng-style="iconOffColor" ng-click="ratingsClicked(5)" ng-show="rating < 5" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '<span class="icon {{iconOn}} ionic_rating_icon_on" ng-style="iconOnColor" ng-click="ratingsUnClicked(5)" ng-show="rating > 4" ng-class="{\'read_only\':(readOnly)}"></span>' +
        '</div>',
      scope: {
        ratingsObj: '=ratingsobj'
      },
      link: function(scope, element, attrs) {

        //Setting the default values, if they are not passed
        scope.iconOn = scope.ratingsObj.iconOn || 'ion-ios-star';
        scope.iconOff = scope.ratingsObj.iconOff || 'ion-ios-star-outline';
        scope.iconOnColor = scope.ratingsObj.iconOnColor || 'rgb(200, 200, 100)';
        scope.iconOffColor = scope.ratingsObj.iconOffColor || 'rgb(200, 100, 100)';
        scope.rating = scope.ratingsObj.rating || 0;
        scope.minRating = scope.ratingsObj.minRating || 0;
        scope.readOnly = scope.ratingsObj.readOnly || false;

        //Setting the color for the icon, when it is active
        scope.iconOnColor = {
          color: scope.iconOnColor
        };

        //Setting the color for the icon, when it is not active
        scope.iconOffColor = {
          color: scope.iconOffColor
        };

        //Setting the rating
        scope.rating = (scope.rating > scope.minRating) ? scope.rating : scope.minRating;

        //Setting the previously selected rating
        scope.prevRating = 0;

        //Called when he user clicks on the rating
        scope.ratingsClicked = function(val) {
          if (scope.minRating !== 0 && val < scope.minRating) {
            scope.rating = scope.minRating;
          } else {
            scope.rating = val;
          }
          scope.prevRating = val;
          scope.ratingsObj.callback(scope.rating);
        };

        //Called when he user un clicks on the rating
        scope.ratingsUnClicked = function(val) {
          if (scope.minRating !== 0 && val < scope.minRating) {
            scope.rating = scope.minRating;
          } else {
            scope.rating = val;
          }
          if (scope.prevRating == val) {
            if (scope.minRating !== 0) {
              scope.rating = scope.minRating;
            } else {
              scope.rating = 0;
            }
          }
          scope.prevRating = val;
          scope.ratingsObj.callback(scope.rating);
        };
      }
    }
});


angular.module('starter.controllers', ['starter.services', 'ionic', 'ionic-ratings'])
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

.controller('ClassesCtrl', function($scope, Session, $cordovaCapture, $state, $ionicPopover, $ionicPopup) {
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
    }, 1000);

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

    $scope.getout = function () {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm',
        template: 'Are you sure you want to quit?',
        buttons: [
          {
            text: '<b>Yes</b>',
            type: 'button-positive',
            onTap: function(e) {
              $state.go('evaluate-teacher', { 'topic': $scope.topic });
              $scope.popover.hide();
            }
          },
          {
            text: '<b>No</b>',
            onTap: function(e) {
              $scope.popover.hide();
            }
          }
        ]
      });

    };

    var template = 'templates/popover.html';

    $ionicPopover.fromTemplateUrl(template, {
        scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
      console.log("popover");
      $scope.popover.show($event);
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function() {
      // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
      // Execute action
    });


})
.controller('EvaluateCtrl', function($scope, $state, $ionicLoading, $ionicPopup) {
    console.log('EvaluateCtrl');
    $scope.rating = 1;
    $scope.topic = $state.params.topic;

    $scope.changeClass = function (e) {
      var $this = angular.element(e.toElement);
      if ($this.hasClass('button-stable')) {
        $this.removeClass('button-stable')
        .addClass('button-dark');
      } else {
        $this.removeClass('button-dark')
        .addClass('button-stable');
      }
    };

    $scope.ratingsObject = {
        iconOn: 'ion-ios-star',
        iconOff: 'ion-ios-star-outline',
        iconOnColor: 'rgb(251, 156, 18)',
        iconOffColor: 'rgb(255, 148, 0)',
        rating: 0,
        minRating: 1,
        readOnly:false,
        callback: function(rating) {
            $scope.ratingsCallback(rating);
            $scope.rating = rating;
        }
    };

    $scope.sending = function(){
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
        setTimeout(function(){
            $state.go('app.start');
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'You were rated by Mirian',
              template: 'Accuracy 95%'
            });

        }, 2000);
    }


    $scope.ratingsCallback = function(rating) {
    };
})

.controller('StartCtrl', function($scope, LoginService, $ionicPopup, $ionicLoading, $state) {
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

    $ionicLoading.hide();
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
