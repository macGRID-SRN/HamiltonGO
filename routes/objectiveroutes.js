var objective = require('../models/objective.js');

module.exports = {
  configure: function(app) {
    app.get("/objective/", function(req, res) {
      objective.get(res);
    });

    app.post("/objective/",
      function(req, res) {
        objective.create(req.body, res);
    });
  }
};
