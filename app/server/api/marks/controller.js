(function () {
  'use strict';

  var Service = require('./service');

  /**
   * Callback
   */
  var cb = function (req, res, data) {
    console.log('Success: ', data);
    res.json(data);
  };

  /**
   * Methods
   */
  function create (req, res) {
    Service.create(req, res, cb);
  }

  function get (req, res) {
    Service.get(req, res, cb);
  }

  var Controller = {
    create: create
  , get: get
  };

  module.exports = Controller;
})();
