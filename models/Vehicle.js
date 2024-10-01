// models/Vehicle.js

const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
    },
    coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
    }
}, { _id: false }); // Disable automatic _id generation for subdocuments

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String, // e.g., Car, Bike, Van
        required: true
    },
    ratePerDay: {
        type: Number,
        required: true
    },
    currentLocation: {
        type: locationSchema,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    pickupLocations: {
        type: [locationSchema],
        required: true
    },
    dropoffLocations: {
        type: [locationSchema],
        required: true
    }
}, { timestamps: true });

// Geospatial indexes
vehicleSchema.index({ "currentLocation.coordinates": '2dsphere' });
vehicleSchema.index({ "pickupLocations.coordinates": '2dsphere' });
vehicleSchema.index({ "dropoffLocations.coordinates": '2dsphere' });

const Vehicle = mongoose.model('Vehicle', vehicleSchema); // Ensure correct collection name

module.exports = Vehicle;
