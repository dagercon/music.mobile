// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $rootScope) {

  $rootScope.urlBackend = "http://music.app/api/";

  $rootScope.requestHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
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

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
      }
    }
  })

/**
 * Vista de Generos
 */
  .state('tab.genders', {
    url: '/genders',
    cache: false,
    views: {
      'tab-genders': {
        templateUrl: 'templates/tab-genders.html',
        controller: 'GendersController'
      }
    }
  })
  .state('tab.genders-new', {
    url: '/genders/new',
    views: {
      'tab-genders': {
        templateUrl: 'templates/genders/create.html',
        controller: 'GendersController'
      }
    }
  })
  .state('tab.genders-update',{
    url: '/genders/:id',
    views: {
      'tab-genders': {
        templateUrl: 'templates/genders/update.html',
        controller: 'GendersController'
      }
    }
  })
/**
 * Vistas de Artistas
 */
.state('tab.artists', {
    url: '/artists',
    cache: false,
    views: {
      'tab-artists': {
        templateUrl: 'templates/tab-artists.html',
        controller: 'ArtistsController'
      }
    }
  })
  .state('tab.artists-new', {
    url: '/artists/new',
    views: {
      'tab-artists': {
        templateUrl: 'templates/artists/create.html',
        controller: 'ArtistsController'
      }
    }
  })
  .state('tab.artists-update',{
    url: '/artists/update',
    views: {
      'tab-artists': {
        templateUrl: 'templates/artists/update.html',
        controller: 'ArtistsController'
      }
    }
  })

/******************/
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
