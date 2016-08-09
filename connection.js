
var mysql = require('mysql');
var config = require('./config.json');

function Connection() {
  this.pool = null;

  this.init = function() {
      this.pool = mysql.createPool({
        connectionLimit: 10,
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        socketPath : config.socket
      });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();
