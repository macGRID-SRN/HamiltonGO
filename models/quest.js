var connection = require('../connection');
var stringHelpers = require('../util/stringhelpers')

function Quest(){

this.get = function(res) {
    connection.acquire(function(err, con) {
	     if(err){
	        console.log(err);
	        res.status(503);
	        res.send({message: 'failed'});
	    }else{
	       con.query('SELECT * \
         FROM Quest \
         JOIN Challenge ON Challenge.id = Quest.challenge_id \
         JOIN Objective ON Objective.id = Quest.objective_id \
         WHERE expiration_date > now()', function(err, result) {
		      con.release();
          if(err){
            res.status(503);
            res.send({message: 'failed'});
          }else{
            res.send(result);
          }
	    });
	   }
    });
  };

  this.create = function(quest, res) {
    connection.acquire(function(err, con) {
	     if(err){
	        console.log(err);
	        res.status(503);
	        res.send({message: "Quest creation failed"});
	     }else{
	        con.query("INSERT INTO Quest SET ?", quest, function(err, result) {
		        con.release();
            if(err){
              res.status(503);
		          res.send({message: 'failed'});
            }else{
              res.send({message: 'Quest created successfully'});
            }
	        });
	   }
    });
  };

}

module.exports = new Quest();
