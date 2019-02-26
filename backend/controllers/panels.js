var Panel = require('../models/panel');
var async = require('async');

module.exports.getAllPanels = function(req, res) {
  
};

exports.panelDetail = function(req, res, next) {
  if (req.query.title) {
    Panel.findOne({ 'title': req.query.id })
    .populate({
      path: 'pois',
      populate: {
        path: 'images',
        model: 'Image'
      }
    })
    .populate({
      path: 'panels'
    })
    .exec(function (err, panel) {
      if (err) return res.json({ err });
      res.json({"panel": panel});
    });  
  } else {
    Panel.find(function(err, panels) {
      if (err) {
          res.send(err);
      }
      res.json({panels: panels});
    });
  }
};

module.exports.addPanels = function(req,res) {  
    var panel = new Panel(req.body.panel);
    panel.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({panel: panel});
    });
};

module.exports.panelUpdate = function(req, res) {
  Panel.findByIdAndUpdate(
    req.params.id,
    req.body.panel
  )
  .populate({
    path: 'pois',
    populate: {
      path: 'images',
      model: 'Image'
    }
  })
  .exec(function (err, panel) {
    if (err) return res.status(500).send(err);
    return res.json({"panel": panel});
  });
}