(function () {
  'use strict';

  var mongoose = require('mongoose')
    , modelName = 'Mark'
    , collectionName = 'marks';

  var schema = mongoose.Schema({
    coordinates: {
        type: Array,
        index: '2dsphere'
    },
    created: {
      type: Date,
      default: Date.now
    }
  });

  var userModel = mongoose.model(modelName, schema, collectionName);

  module.exports = userModel;
})();
