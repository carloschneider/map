'use strict';

var express = require('express')
  , path = require('path')
  , morgan = require('morgan')
  , compression = require('compression')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , cookieParser = require('cookie-parser')
  , load = require('express-load');

var app = express();

app.set('views', path.join(__dirname, './../client'));

app.use(morgan('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './../client')));

app.get('/', function (req, res) {
  res.render('index');
});

load(path.join(__dirname, './config/database'))
  .into(app);

var api = {};
api.marks = require('./api/marks/api');

app.use('/api/marks', api.marks);

app.use('/js', express.static(__dirname + './../client/js'));
app.use('/css', express.static(__dirname + './../client/css'));
app.use('/img', express.static(__dirname + './../client/img'));
app.use('/vendor', express.static(__dirname + './../client/vendor'));

exports = module.exports = app;
