'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$position,$http) {
      //主界面主体逻辑
      $scope.myclk = function(){
          $http.get('http://192.168.1.160:8002/activiti-rest/service/runtime/process-instances/23158').then(
              function (data){
                  console.log(data)
              }
          );
      }
  });
