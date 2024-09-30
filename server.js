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

// Example $geoNear Query
app.post('/suggest-vehicles', async (req, res) => {
    const { source, destination, vehicleType, maxDistance = 5000 } = req.body;

    if (!source || !destination) {
        return res.status(400).json({ message: 'Source and destination are required.' });
    }

    const userSource = [source.longitude, source.latitude];
    const userDestination = [destination.longitude, destination.latitude];

    try {
        // Using aggregate with $geoNear
        const vehicles = await Vehicle.aggregate([
            {
                $geoNear: {
                    near: {
                        type: 'Point',
                        coordinates: userSource
                    },
                    distanceField: 'dist.calculated',
                    maxDistance: maxDistance,
                    query: { available: true, type: vehicleType || { $exists: true } },
                    includeLocs: 'pickupLocations',
                    spherical: true
                }
            }
            // Additional pipeline stages if needed
        ]);

        res.json({ vehicles });
    } catch (err) {
        console.error('Error suggesting vehicles:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


// Example $geoWithin Query using source and destination polygons

// Start the server
const PORT = process.env.PORT || 3017;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/**
 * Geo Location query:
 *
 * https://medium.com/@oshanm1/how-to-find-nearby-locations-within-a-radius-using-mongodb-bbb5f57005f1
 * https://www.mongodb.com/community/forums/t/mongoose-geojson-query-within-two-radius/277526
 * https://mongoosejs.com/docs/geojson.html
 * https://artsy.github.io/blog/2023/02/10/mongo-geospatial-queries/
 * https://www.mongodb.com/docs/manual/reference/operator/aggregation/geoNear/#pipe._S_geoNear
 * https://www.mongodb.com/docs/manual/reference/operator/query-geospatial/
 */
