// server.js

const express = require('express');
const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');
const app = express();

app.use(express.json());

// Connect to MongoDB with autoIndex enabled
mongoose.connect('mongodb://localhost:27017/vehicle-rental', {
    autoIndex: true // Ensures that indexes are created automatically
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

/**
 * Utility Function to Calculate Distance (Haversine Formula)
 * @param {Array} coord1 [longitude, latitude]
 * @param {Array} coord2 [longitude, latitude]
 * @returns {Number} distance in meters
 */
function getDistance(coord1, coord2) {
    const toRad = (value) => (value * Math.PI) / 180;

    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;

    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
}

/**
 * POST /suggest-vehicles-2
 * Body:
 * {
 *   "source": { "longitude": Number, "latitude": Number },
 *   "destination": { "longitude": Number, "latitude": Number },
 *   "vehicleType": String (optional),
 *   "maxDistance": Number (optional, in meters)
 * }
 */
app.post('/suggest-vehicles-2', async (req, res) => {
    const { source, destination, vehicleType, maxDistance = 5000 } = req.body;

    if (!source || !destination) {
        return res.status(400).json({ message: 'Source and destination are required.' });
    }

    const userSource = [source.longitude, source.latitude];
    const userDestination = [destination.longitude, destination.latitude];

    try {
        // Using aggregate with $geoNear
        const pipeline = [
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: userSource
                    },
                    distanceField: 'distance',
                    maxDistance: maxDistance,
                    query: { available: true, ...(vehicleType && { type: vehicleType }) },
                    spherical: true,
                    key: 'pickupLocations' // Specify the indexed field
                }
            },
            // Additional stages if needed
        ];

        const vehicles = await Vehicle.aggregate(pipeline).exec();

        // Map vehicles with total distance
        const vehiclesWithDistance = vehicles.map(vehicle => {
            // Find the closest pickup location
            const pickup = vehicle.pickupLocations.reduce((prev, curr) => {
                const distance = getDistance(userSource, curr.coordinates);
                return distance < prev.distance ? { location: curr.coordinates, distance } : prev;
            }, { distance: Infinity, location: [] });

            // Find the closest dropoff location
            const dropoff = vehicle.dropoffLocations.reduce((prev, curr) => {
                const distance = getDistance(userDestination, curr.coordinates);
                return distance < prev.distance ? { location: curr.coordinates, distance } : prev;
            }, { distance: Infinity, location: [] });

            // Total distance from current to pickup, pickup to dropoff
            const distanceFromCurrentToPickup = getDistance(vehicle.currentLocation.coordinates, pickup.location);
            const distancePickupToDropoff = getDistance(pickup.location, dropoff.location);
            const totalDistance = distanceFromCurrentToPickup + distancePickupToDropoff;

            return {
                vehicle,
                totalDistance
            };
        });

        // Filter vehicles where total distance is within maxDistance
        const suitableVehicles = vehiclesWithDistance.filter(v => v.totalDistance <= maxDistance);

        // Sort by total distance
        suitableVehicles.sort((a, b) => a.totalDistance - b.totalDistance);

        // Extract vehicles from the sorted list
        const sortedVehicles = suitableVehicles.map(v => v.vehicle);

        res.json({ vehicles: sortedVehicles });
    } catch (err) {
        console.error('Error suggesting vehicles:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
