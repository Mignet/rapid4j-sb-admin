'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:true,
      events:true
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    //TODO:只加载和注册当前用户的states
    //注册所有状态
    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
		//使用该标记确定需要登录检查的state。如果设置为false，则不需要校验。this property will apply to all children of 'dashboard'
        data: {
            requireLogin: true 
        },
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',//主应用，注入header和sidebar directive
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                //注册全局directives
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
    //主框体之主界面
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',//MainCtrl 主控制
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })
	//login页面
    .state('login',{
		data: {
           requireLogin: false 
        },
        templateUrl:'views/pages/login.html',
        url:'/login',
		controller: 'LoginCtrl',//LoginCtrl
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/login.js',
              'scripts/services/Base64.js'
              ]
            })
          }
        }
    })
      //chart 图表模块[chart.js]，包含了很多图表的directives，比如：直方图，饼图等
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',//Controller名：chartContoller.js
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',//要注入的模块名称
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',//要注入的模块名称
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
    //静态页面
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }])
//登录modal窗口服务
.controller('LoginModalCtrl', function ($scope) {

  $scope.cancel = $scope.$dismiss;

  $scope.submit = function (isValid) {
      // check to make sure the form is completely valid
      /*if (isValid) {
          alert('our form is amazing');
      }else{
          alert('data valid failed');
      }*/
	//模拟登录服务
	var user = {"email":$scope.email,"id":"XXXXX","name":"Kermit"};
	$scope.$close(user);
   /*  UsersApi.login(email, password).then(function (user) {
      $scope.$close(user);
    }); */
  };

})
.service('loginModal', function ($modal, $rootScope) {

  function assignCurrentUser (user) {
    $rootScope.currentUser = user;
    return user;
  }

  return function() {
    var instance = $modal.open({
      templateUrl: 'views/pages/loginModalTemplate.html',
      keyboard: false,
	  backdrop: 'static',
      controller: 'LoginModalCtrl',
      controllerAs: 'LoginModalCtrl'
    })

    return instance.result.then(assignCurrentUser);
  };

})
//监听=>状态切换事件
.run(function ($rootScope, $state, loginModal) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;

    if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
      event.preventDefault();

      loginModal()
        .then(function () {
          return $state.go(toState.name, toParams);
        })
        .catch(function () {
          return $state.go('login');
        });
    }
  });

})
.config(function ($httpProvider) {
	//控制http,拦截401返回
  $httpProvider.interceptors.push(function ($timeout, $q, $injector) {
    var loginModal, $http, $state;

    // this trick must be done so that we don't receive
    // `Uncaught Error: [$injector:cdep] Circular dependency found`
    $timeout(function () {
      loginModal = $injector.get('loginModal');
      $http = $injector.get('$http');
      $state = $injector.get('$state');
    });
	// $http = $injector.get('$http');
    // $state = $injector.get('$state');

    return {
      responseError: function (rejection) {
        if (rejection.status !== 401) {
          return rejection;
        }

        var deferred = $q.defer();

        loginModal()
          .then(function () {
            deferred.resolve( $http(rejection.config) );
          })
          .catch(function () {
            $state.go('login');
            deferred.reject(rejection);
          });

        return deferred.promise;
      }
    };
  });

});

    
