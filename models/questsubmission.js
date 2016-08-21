var connection = require('../connection');
var stringHelpers = require('../util/stringhelpers')

function QuestSubmission() {

  this.post = function (quest_submission, res){
    connection.acquire(function(err, con) {
	     if(err){
	        console.log(err);
	        res.status(503);
	        res.send({message: "Quest submission failed"});

	    }else{
	       con.query("INSERT INTO QuestSubmission SET ?", quest_submission,
            function(err, result) {
		          con.release();
              if(err){
                res.status(503);
		            res.send({message: 'failed'});
              }else{
                res.send({message: 'Quest submitted successfully'});
              }
	      });
	     }
    });
  }

  this.get = function(user, res){
    connection.acquire(function(err, con) {
      if(err){
        console.log(err);
        res.status(503);
        res.send({message: 'failed'});
      }else{
        con.query('SELECT * FROM User \
        Where unique_identifier=\'{0}\' LIMIT 1'.format(user.unique_identifier),
        function(err, result){
          if(err){
            con.release();
            res.status(503);
            res.send({message: 'failed'});
          }else{
            var query = 'SELECT * \
            FROM QuestSubmission \
            JOIN Quest ON Quest.id = QuestSubmission.quest_id \
            WHERE user_id = {0}'.format(result[0].id);
            con.query(query,
            function(err, result) {
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
      }
    });
  };

}

module.exports = new QuestSubmission();
