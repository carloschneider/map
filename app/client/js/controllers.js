(function () {
  'use strict';

  angular.module('map')
    .controller('mapController', mapController);

  /**
   * Map Controller
   */
  mapController.$inject = ['$scope', 'marksService'];
  function mapController ($scope, marksService) {
    $scope._clearMarks = function () {
      for (var i in $scope.marks) {
        $scope.marks[i].setMap(null);
      }

      $scope.marks = [];
    };

    $scope.mapCreated = function (map) {
      $scope.map = map;

      $scope.bindBounds();
    };

    $scope.bindBounds = function () {
      google.maps.event.addListener($scope.map, 'idle', function () {
        var bounds = this.getBounds()
          , ne = bounds.getNorthEast()
          , sw = bounds.getSouthWest()
          , coordinates = {
            neLat: ne.lat()
            , neLng: ne.lng()
            , swLat: sw.lat()
            , swLng: sw.lng()
          };

        $scope.getMarks(coordinates);
      });
    };

    $scope.marks = [];
    $scope.oldMarks = [];
    $scope.getMarks = function (coordinates) {
      marksService.getMarks(coordinates).then(function (response) {
        $scope._clearMarks();

        _.forEach(response.data, function (data) {
          var latLng = new google.maps.LatLng(data.coordinates[0], data.coordinates[1]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: $scope.map
          });
          marker._id = data._id;

          $scope.marks.push(marker);
        });
      });
    };
  }
})();
