var connection = require('../connection');
var stringHelpers = require('../util/stringhelpers')

function User(){
  this.create = function(user, res) {
    connection.acquire(function(err, con) {
  if(err){
      console.log(err);
      res.status(503);
      res.send({message: "User creation failed"});

  }else{
      con.query("INSERT INTO User SET ?", user, function(err, result) {
        if(err){
            res.status(503);
            res.send({message: 'failed'});
        }else{
          res.send({message: 'User created successfully'});
        }
        con.release();
      });
  }
    });
  };

}

module.exports = new User();
