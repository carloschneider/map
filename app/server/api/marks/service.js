(function () {
  'use strict';

  var Model = require('./model');
  var _ = require('lodash');

  function create (req, res, cb) {
    var data = req.body
      , _model = new Model(data);

    _model.save(function (err, data) {
      if (err) {
        console.log('Error: ', err);
        res.json(err);

      } else {
        cb(req, res, data);
      }
    });
  }

  function get (req, res, cb) {
    if (_.isEmpty(req.query.neLat) ||
        _.isEmpty(req.query.neLng) ||
        _.isEmpty(req.query.swLat) ||
        _.isEmpty(req.query.swLng)) {
      res
        .status(500)
        .json({
          'message': 'You need pass coordinates'
        });
    }

    var query = {
      'coordinates': {
        $geoWithin: {
          $box: [
            [req.query.neLat, req.query.neLng],
            [req.query.swLat, req.query.swLng]
          ]
        }
      }
    };

    Model.find(query, 'coordinates', function (err, data) {
      if (err) {
        console.log('Error: ', err);
        res.json(err);

      } else {
        cb(req, res, data);
      }
    });
  }

  var Service = {
    create: create
  , get: get
  }

  module.exports = Service;
})();
