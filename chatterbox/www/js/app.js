// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('assessment', {
    url: '/assessment',
    templateUrl: 'templates/assessment.html',
    controller: 'AssessmentCtrl'
  })

  .state('assessment-collective', {
    url: '/assessment-collective',
    templateUrl: 'templates/assessment-collective.html',
    controller: 'AssessmentCtrl'
  })

  .state('load-student-class', {
    url: '/load-student-class/:topic',
    templateUrl: 'templates/loading-student-class.html',
    controller: 'StudentCtrl'
  })
  .state('class', {
    url: "/class/:topic",
    templateUrl: "templates/class-main.html",
    controller: 'ClassesCtrl'
  })
  .state('evaluate-teacher', {
    url: "/evaluate-teacher/:topic",
    templateUrl: "templates/evaluate-teacher.html",
    controller: 'EvaluateCtrl'
  })
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent' : {
          templateUrl: 'templates/menu.html',
      }
    }
  })
  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent' : {
          templateUrl: 'templates/browse.html',
      }
    }
  })
  .state('app.start', {
    url: "/start/:origin",
    views: {
        'menuContent': {
            templateUrl: "templates/start.html",
            controller: 'StartCtrl'
        }
    }
  })
  .state('app.session', {
      url: "/sessions/:sessionId",
      views: {
          'menuContent': {
            templateUrl: "templates/session.html",
            controller: 'SessionCtrl'
        }
      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
