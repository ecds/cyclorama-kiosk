var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var ImageSchema = new Schema({
    poi: { type: ObjectId, ref: 'Poi' },
    url: String,
    caption: String,
    position: Number
});

// var Poi = mongoose.model('Poi', PoiSchema);
module.exports = mongoose.model('Image', ImageSchema);