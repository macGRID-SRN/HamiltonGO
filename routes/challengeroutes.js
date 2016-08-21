var challenge = require('../models/challenge.js');

module.exports = {
  configure: function(app) {
    app.get("/challenge/", function(req, res) {
      challenge.get(res);
    });

    app.post("/challenge/",
      function(req, res) {
      challenge.create(req.body, res);
    });
  }
};
