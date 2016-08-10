var connection = require('../connection');
var stringHelpers = require('../util/stringhelpers')

function Challenge(){

this.get = function(res) {
    connection.acquire(function(err, con) {
	if(err){
	    console.log(err);
	    res.status(503);
	    res.send({message: 'failed'});
	}else{
	    con.query('SELECT * FROM Challenge', function(err, result) {
		  con.release();
		  res.send(result);
	    });
	}
    });
  };

  this.create = function(challenge, res) {
    connection.acquire(function(err, con) {
	if(err){
	    console.log(err);
	    res.status(503);
	    res.send({message: "Challenge creation failed"});

	}else{
	    con.query("INSERT INTO Challenge SET ?", challenge, function(err, result) {
        if(err){
            res.status(503);
		        res.send({message: 'failed'});

        }else{
          res.send({message: 'Challenge created successfully'});
        }
		    con.release();
	    });
	}
    });
  };

}


module.exports = new Challenge();
