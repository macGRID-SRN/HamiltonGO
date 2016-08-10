var quest = require('../models/quest.js');

module.exports = {
  configure: function(app) {
    app.get("/quest/", function(req, res) {
      quest.get(res);
    });

    app.post("/quest/", function(req, res) {
      quest.create(req.body, res);
    });
  }
};
