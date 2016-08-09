var quest = require('./models/quest.js');

module.exports = {
  configure: function(app) {

    app.get('/quest/', function(req, res) {
      quest.get(res);
    });

    app.post('/quest/', function(req, res) {
      quest.create(req.body, res);
    });

    app.put('/quest/', function(req, res) {
      quest.update(req.body, res);
    });

    app.delete('/quest/:id/', function(req, res) {
      quest.delete(req.params.id, res);
    });
  }
};
