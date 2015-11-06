(function () {
  'use strict';

  angular.module('map')
    .service('geoLocationService', geoLocationService)
    .service('marksService', marksService);

  /**
   * Map Service
   */
  geoLocationService.$inject = ['$q'];
  function geoLocationService ($q) {
    return {
      getPosition: function () {
        var deferred = $q.defer();

        navigator.geolocation.getCurrentPosition(function (pos) {
          deferred.resolve(pos.coords);
        });

        return deferred.promise;
      }
    }
  }

  /**
   * Marks Service
   */
  marksService.$inject = ['$http', '$q'];
  function marksService ($http, $q) {
    return {
      getMarks: function (coordinates) {
        var deferred = $q.defer();

        $http({
          method: 'GET',
          url: '/api/marks/',
          params: {
            neLat: coordinates.neLat
            , neLng: coordinates.neLng
            , swLat: coordinates.swLat
            , swLng: coordinates.swLng
          }
        }).then(function (response) {
          deferred.resolve(response);
        });

        return deferred.promise;
      }
    }
  }
})();
