// models/Vehicle.js

const mongoose = require('mongoose');

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
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    available: {
        type: Boolean,
        default: true
    },
    pickupLocations: [{
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }],
    dropoffLocations: [{
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }]
}, { timestamps: true });

// Geospatial indexes
vehicleSchema.index({ currentLocation: '2dsphere' });
vehicleSchema.index({ pickupLocations: '2dsphere' });
vehicleSchema.index({ dropoffLocations: '2dsphere' });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
