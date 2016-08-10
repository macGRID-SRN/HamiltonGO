
var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection.js');
var objectiveroutes = require('./routes/objectiveroutes.js');
var challengeroutes = require('./routes/challengeroutes.js');
var questroutes = require('./routes/questroutes.js');

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
questroutes.configure(app);
challengeroutes.configure(app);
objectiveroutes.configure(app);

var server = app.listen(8000, function() {
  console.log('Server listening on port ' + server.address().port);
});
