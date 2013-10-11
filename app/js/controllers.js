'use strict';

/* Controllers */

function AppController($scope, DataSource) {
  DataSource.get().then(function(data){
    $scope.dataSet = data;
    $scope.keys = [];
    for(var key in $scope.dataSet[0]) {
      if (key != 'Country Name' && key != 'Country Code') {
        $scope.keys.push(key);
      }
    }
  });
};

function ChartCtrl($scope, DataSource){
  DataSource.get().then(function(data){ 
    $scope.charts = ['Line Chart', 'Scatter Chart'];
    $scope.chart = $scope.charts[0];
    $scope.dataSet = data;
    $scope.keys = [];
    for(var key in $scope.dataSet[0]) {
      if (key != 'Country Name' && key != 'Country Code') {
        $scope.keys.push(key);
      }
    };
    $scope.countries = [];
    for(var i=0; i<$scope.dataSet.length;i++) {
      $scope.countries.push({
          'index':i,
          'country':$scope.dataSet[i]['Country Name']
      });
    };
    $scope.selection = {
      ids: {"0": true},
      objects: [$scope.countries[0]]
    };
    updateLineChart($scope.selection);
    updateScatterChart($scope.selection);
   });

  // Manage country changes:
  $scope.$watch(function() {
        if (angular.isDefined($scope.selection)) {
          return $scope.selection.ids;
    }}, function(value) {
        if($scope.selection) {
          $scope.selection.objects = [];
          angular.forEach($scope.selection.ids, function(v, k) {
              v && $scope.selection.objects.push(getCountryById(k));            
          });
          updateLineChart($scope.selection);
          updateScatterChart($scope.selection);
        }        
    }, true);
    
  function getCountryById(id) {
    for (var i = 0; i < $scope.countries.length; i++) {
      if ($scope.countries[i].index == id) {
        return $scope.countries[i];
      }
    }
  };

  /*$scope.$watch('country', function(country) {
    if (angular.isDefined(country) && angular.isDefined($scope.countries)) {
      for(var i=0;i<$scope.countries.length;i++){
        if($scope.countries[i]['country'] == country['country']) {
          $scope.countryIndex = i;
          break;
        };
      };
      updateLineChart($scope.countryIndex);  
      updateScatterChart($scope.countryIndex);  
    } 
  });*/

  function updateLineChart(selection) {
    $scope.lineChartData = [];
    for (var i = 0; i < selection.objects.length; i++) {
      $scope.lineChartData.push({
        key: selection.objects[i]['country'],
        values: []
      });

      for (var j=0; j < $scope.keys.length; j++) {
        var key = $scope.keys[j];
        var index = selection.objects[i]['index'];
        $scope.lineChartData[i].values.push([
          parseInt(key),
          parseFloat($scope.dataSet[index][key])
        ]);
      };
    }

    //configuration examples
    $scope.xAxisTickFormat = function(){
      return function(d){
        return d;  //uncomment for date format
      }
    };

    $scope.toolTipContentFunction = function(){
      return function(key, x, y, e, graph) {
        return '<p>' + key + '</p>' +
            '<p>' +  y + ' at ' + x + '</p>'
        }
    }
  };

  function updateScatterChart(selection) {
    $scope.scatterChartData = [];
    for (var i = 0; i < selection.objects.length; i++) {
      $scope.scatterChartData.push({
        key: selection.objects[i]['country'],
        values: []
      });
 
      for (var j=0; j < $scope.keys.length; j++) {
        var key = $scope.keys[j];
        var index = selection.objects[i]['index'];
        $scope.scatterChartData[i].values.push({
          x: key,
          y: parseFloat($scope.dataSet[index][key]),
          shape: 'circle'
        });
      };
    } 

    $scope.tooltipXContentFunction = function(){
      return function(key, x, y) {
        return '<strong>YO!' + x + '</strong>'
      }
    };
  };
};
