var connection = require('../connection');
var stringHelpers = require('../util/stringhelpers')

function Objective(){

  this.get = function(res) {
      connection.acquire(function(err, con) {
	    if(err){
	       console.log(err);
	        res.status(503);
	        res.send({message: 'failed'});
	    }else{
	       con.query('SELECT * FROM Objective', function(err, result) {
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

  this.create = function(objective, res) {
    connection.acquire(function(err, con) {
	     if(err){
	        console.log(err);
	        res.status(503);
	        res.send({message: "Objective creation failed"});

	    }else{
	       con.query("INSERT INTO Objective SET ?", objective, function(err, result) {
           if(err){
             res.status(503);
		         res.send({message: 'failed'});
           }else{
             res.send({message: 'Objective created successfully'});
           }
		         con.release();
	      });
	     }
    });
  };

}


module.exports = new Objective();
