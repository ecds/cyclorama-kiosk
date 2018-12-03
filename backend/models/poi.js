var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var GeoJsonPropertiesSchema = new Schema({
    type: String
});

var PointGeometrySchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

var PolygonGeometrySchema = new Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
    },
    coordinates: {
        type: [[[[Number]]]],
        required: true
    }
});

var PointSchema = new Schema({
    type: {
        type: String,
        enum: ['Feature'],
        required: true
    },
    geometry: PointGeometrySchema,
    properties: GeoJsonPropertiesSchema
})

var PolygonSchema = new Schema({
    type: {
        type: String,
        enum: ['Feature'],
        required: true
    },
    geometry: PolygonGeometrySchema
});

var PoiSchema = new Schema({
    quad: { type: Schema.Types.ObjectId, ref: 'Quad' },
    tour: { type: Schema.Types.ObjectId, ref: 'Tour' },
    name: String,
    type: String,
    description: String,
    position: Number,
    tourPosition: Number,
    bounds: [[Number]],
    images: [{ type: ObjectId, ref: 'Image' }],
    point: PointSchema,
    polygon: PolygonSchema
});

module.exports = mongoose.model('Poi', PoiSchema);