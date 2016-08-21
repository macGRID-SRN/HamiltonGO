
var mysql = require('mysql');
var config = require('./config.json');

function Connection() {
  this.pool = null;

  this.init = function() {
      this.pool = mysql.createPool({
        connectionLimit: 10,
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        socketPath : config.database.socket
      });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();
