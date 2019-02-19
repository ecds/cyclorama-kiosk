var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var PanelSchema = new Schema({
    title: String,
    direction: String,
    pois: [{ type: ObjectId, ref: 'Poi' }],
    kiosks: [{ type: ObjectId, ref: 'Kiosk' }],
    height: Number,
    width: Number,
    opacity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Panel', PanelSchema);