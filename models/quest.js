var connection = require('./connection');


function Quest(){
this.get = function(res) {
    connection.acquire(function(err, con) {
	if(err){
	    console.log(err);
	    res.status(503);
	    res.send({message: 'failed'});
	}else{
	    con.query('select * from UserStories', function(err, result) {
		con.release();
		res.send(result);
	    });
	}
    });
  };

  this.create = function(todo, res) {
    connection.acquire(function(err, con) {
	if(err){
	    console.log(err);
	    res.status(503);
	    res.send({message: "Quest creation failed"});

	}else{
	    con.query('insert into UserStories set ?', todo, function(err, result) {
		con.release();
		res.send({status: 0, message: 'Quest created successfully'});
	    });
	}
    });
  };

  this.update = function(todo, res) {
    connection.acquire(function(err, con) {
	if(err){
	    console.log(err);
	    res.status(503);
	    res.send({message : "failed"});
	}else{
	    con.query('update UserStories set ? where id = ?', [todo, todo.id], function(err, result) {
		con.release();

		res.send({status: 0, message: 'Quest updated successfully'});
	    });
	}
    });
  };

  this.delete = function(id, res) {
    connection.acquire(function(err, con) {
	if(err){
	    console.log(err);
	    res.status(503);
	    res.send({message : "failed"});
	}else{
	    con.query('delete from UserStories where id = ?', [id], function(err, result) {
		con.release();
		res.send({status: 0, message: 'Deleted successfully'});
	    });
	}
    });
  };
}

module.exports = new Quest();
