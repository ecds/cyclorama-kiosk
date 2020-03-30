var Error = require('../models/error');

module.exports.addError = function(req,res) {  
  var error = new Error(req.body.error);
  error.save(function(err) {
      if (err) {
          res.send(err);
      }
      res.json({error: error});
  });
};