var questsubmission = require('../models/questsubmission.js');

module.exports = {
  configure: function(app) {
    app.post("/questsubmission/submit", function(req, res) {
      questsubmission.post(req.body, res);
    });

    app.post("/questsubmission/",
      function(req, res) {
        questsubmission.get(req.body, res);
    });
  }
};
