'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
	.directive('headerNotification',function(){
		return {
            templateUrl:'scripts/directives/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller:function($scope,$state,$rootScope){

                //没有登录
                //$state.go("login");
				$scope.user = $rootScope.currentUser;
            }
    	}
	});


