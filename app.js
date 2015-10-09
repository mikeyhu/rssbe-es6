var express = require('express');
var logger = require('morgan');
var expressMongoDb = require('express-mongo-db');
var bodyParser = require('body-parser');
var debug = require('debug')('app');

var configuration = require('./configuration.js');
var storyRoutes = require('./routes/stories');
var errorRoutes = require('./routes/error');

debug(configuration);

var app = express();
app.use(expressMongoDb(configuration.mongoUri));
app.use(bodyParser.json());
app.use(logger(configuration.httpLogging));

app.use('/stories', storyRoutes);
app.use(errorRoutes);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  debug('Example app listening at http://%s:%s', host, port);
});
