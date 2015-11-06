'use strict';

var express = require('express')
  , router = express.Router()
  , Controller = require('./controller');

router.post('/', function (req, res) {
  Controller.create(req, res);
});

router.get('/', function (req, res) {
  Controller.get(req, res);
});

module.exports = router;
