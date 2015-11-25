'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('LoginCtrl', function($scope,$rootScope,$http,$state,Base64) {
      /* if($rootScope.currentUser){
		  $state.go("dashboard.home");
	  }else{ */
		  $scope.submit = function (isValid) {
              /*if (isValid) {
                  alert('our form is amazing');
              }else{
                  alert('data valid failed');
              }*/
			//模拟登录服务
              $scope.username = $scope.email;
			var user = {"email":$scope.email,"id":"XXXXX","name":"Kermit"};
			$rootScope.currentUser = user;
            //如果登录成功,将basic放入http headers
            $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.username + ":" + $scope.password);
			$state.go("dashboard.home");
		  };
	  /* } */

  });
