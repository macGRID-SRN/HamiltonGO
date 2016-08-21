var user = require('../models/user.js');

module.exports = {
  configure: function(app) {
    app.post("/users/", function(req, res) {
      user.create(req.body, res);
    });
  }
};
