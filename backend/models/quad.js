var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var QuadSchema = new Schema({
    title: String,
    painting: String,
    pois: [{ type: ObjectId, ref: 'Poi' }]
});

// var Poi = mongoose.model('Poi', PoiSchema);
module.exports = mongoose.model('Quad', QuadSchema);