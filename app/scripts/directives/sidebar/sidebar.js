'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('sbAdminApp')
  .directive('sidebar',['$location','$rootScope',function($rootScope) {
    return {
      templateUrl:'scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope,$rootScope){
        //var menus = $rootScope.navMenus;
        $scope.menus = [
            {url:"dashboard.home",icon:"fa fa-dashboard fa-fw",name:"Dashboard"},
            {url:"dashboard.chart",icon:"fa fa-bar-chart-o fa-fw",name:"Charts"},
            {url:"dashboard.table",icon:"fa fa-table fa-fw",name:"Tables"},
            {url:"dashboard.form",icon:"fa fa-edit fa-fw",name:"Forms"}
        ]
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        
        $scope.check = function(x){
          
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };
        
        $scope.multiCheck = function(y){
          
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
      }
    }
  }]);
