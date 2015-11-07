'use strict';

var mongoose = require('mongoose');

var configDatabase = {
  'host': process.env.DATABASE_HOST
  , 'db': process.env.DATABASE_DB
  , 'user': process.env.DATABASE_USER
  , 'pass': process.env.DATABASE_PASS
  , 'port': process.env.DATABASE_PORT
};

mongoose.connect('mongodb://'+ configDatabase.user +':'+ configDatabase.pass +'@'+ configDatabase.host +':'+ configDatabase.port +'/'+ configDatabase.db);
var db = mongoose.connection;

db.on('error', function (err) {
  console.log(err);
});

db.on('connected', function() {
  console.log('MongoDB connected');
});

db.on('disconnected', function() {
  console.log('MongoDB disconnected');
});

module.exports = db;
