
var express               = require('express');
var bodyparser            = require('body-parser');
var connection            = require('./connection.js');
var objectiveroutes       = require('./routes/objectiveroutes.js');
var challengeroutes       = require('./routes/challengeroutes.js');
var questsubmissionroutes = require('./routes/questsubmissionroutes.js');
var questroutes           = require('./routes/questroutes.js');
var userroutes            = require('./routes/userroutes.js');
var cors                  = require('cors');
var config                = require('./config.json');

var app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());

connection.init();
questroutes.configure(app);
challengeroutes.configure(app);
objectiveroutes.configure(app);
userroutes.configure(app);
questsubmissionroutes.configure(app);

var server = app.listen(8000, function() {
  console.log('Server listening on port ' + server.address().port);
});
