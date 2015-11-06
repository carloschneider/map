'use strict';

var mongoose = require('mongoose')
  , debug = require('debug')('map');

// var configDatabase = {
//   'host': 'host'
//   , 'db': 'db'
//   , 'user': 'user'
//   , 'pass': 'pass'
// };

mongoose.connect('mongodb://'+ configDatabase.host +'/'+ configDatabase.db);

var db = mongoose.connection;

console.log(db);

db.on('error', function (err) {
  debug(err);
});

db.on('connected', function() {
  console.log('MongoDB connected');
});

db.on('disconnected', function() {
  console.log('MongoDB disconnected');
});

module.exports = db;
