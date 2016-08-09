
var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');
var cors = require('cors');

var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());
//app.use(allowCrossDomain);

connection.init();
routes.configure(app);

var server = app.listen(8000, function() {
  console.log('Server listening on port ' + server.address().port);
});
