var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var QuadSchema = new Schema({
    title: String,
    pois: [{ type: ObjectId, ref: 'Poi' }]
});

module.exports = mongoose.model('Quad', QuadSchema);