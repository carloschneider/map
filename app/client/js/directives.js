(function () {
  'use strict';

  angular.module('map')
    .directive('map', mapDirective);

  /**
   * Map Directive
   */
  mapDirective.$inject = ['geoLocationService', 'cfpLoadingBar'];
  function mapDirective (geoLocationService, cfpLoadingBar) {
    var directive = {
      link: link,
      scope: {
        onCreate: '&',
        bounds: '=boundsPosition'
      },
      restrict: 'E'
    };

    return directive;

    function link ($scope, element) {
      cfpLoadingBar.start();

      geoLocationService.getPosition().then(function (position) {
        google.maps.event.addDomListener(window, 'load', createMap(position));
      });

      function createMap (position) {
        var latLng = new google.maps.LatLng(position.latitude, position.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false
        };

        var gMap = new google.maps.Map(element[0], mapOptions);
        new google.maps.Marker({
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          position: latLng,
          map: gMap
        });

        google.maps.event.addListenerOnce(gMap, 'idle', function(){
          cfpLoadingBar.start();
        });

        $scope.onCreate({
          map: gMap
        });
      }
    }
  }
})();
