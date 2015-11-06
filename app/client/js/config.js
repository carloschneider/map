'use strict';

angular.module('map')
  .constant('_', window._)
  .run(function ($rootScope) {
     $rootScope._ = window._;
  });
