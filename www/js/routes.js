angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {


    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('tabsController.createDefaultPage', {
      url: '/events/new',
      views: {
        'tab1': {
          templateUrl: 'templates/createDefaultPage.html',
          controller: 'createDefaultPageCtrl'
        }

      }
    })

    .state('tabsController.listDefaultPage', {
      url: '/list',
      views: {
        'tab2': {
          templateUrl: 'templates/listDefaultPage.html',
          controller: 'listDefaultPageCtrl'
        }
      }
    })

    // .state('tabsController.listDefaultPage', {
    //   url: '/list/:gid',
    //   views: {
    //     'tab2': {
    //       templateUrl: 'templates/listDefaultPage.html',
    //       controller: 'listDefaultPageCtrl'
    //     }
    //   }
    // })

    .state('tabsController.meDefaultPage', {
      url: '/page4',
      views: {
        'tab3': {
          templateUrl: 'templates/meDefaultPage.html',
          controller: 'meDefaultPageCtrl'
        }
      }

  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('signup', {
    url: '/page5',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('login', {
    url: '/page6',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('forgetPassword', {
    url: '/page13',
    templateUrl: 'templates/forgetpassword.html',
    controller: 'forgetPasswordCtrl'
  })

  .state('tabsController.live', {
    url: '#/:foo',
    views: {
      'tab2': {
        templateUrl: 'templates/live.html',
        controller: 'liveCtrl'
}
      }
    })


.state('tabsController.editProfile', {
    url: '/page11',
    views: {
      'tab3': {
        templateUrl: 'templates/editProfile.html',
        controller: 'editProfileCtrl'
      }
    }
  })
.state('tabsController.resetPassword', {
    url: '/page12',
    views: {
      'tab3': {
        templateUrl: 'templates/resetPassword.html',
        controller: 'resetPasswordCtrl'
      }
    }
  })
//$urlRouterProvider.otherwise('/page1/page2')
$urlRouterProvider.otherwise('/page6')



});