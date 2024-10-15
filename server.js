// server.js

const express = require('express');
const httpContext = require('express-http-context');

const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');

const app = express();
app.use(httpContext.middleware);
app.use(express.json());

// Connect to MongoDB with autoIndex enabled
mongoose.connect('mongodb://localhost:27017/vehicle-rental-v2-test', {
    autoIndex: true // Ensures that indexes are created automatically
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Middleware to simulate user authentication
app.use((req, res, next) => {
    // Simulate a logged-in user
    req.user = { id: '670e3ed28d22a07c41153e9d' }; // Replace with actual user ID
    httpContext.set('req', req); // Set the request in httpContext
    next();
});

// Route to create a new vehicle
app.post('/vehicles', async (req, res) => {
    try {
        const vehicleData = {
            name: req.body.name,
            type: req.body.type,
            ratePerDay: req.body.ratePerDay,
            currentLocation: req.body.currentLocation,
            pickupLocations: req.body.pickupLocations,
            dropoffLocations: req.body.dropoffLocations
        };

        const newVehicle = new Vehicle(vehicleData);
        await newVehicle.save();

        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.patch('/vehicles/:id', async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const updateData = {
            // Update fields here, e.g., name, type, ratePerDay, etc.
            name: req.body.name,
            type: req.body.type,
            ratePerDay: req.body.ratePerDay,
        };

        const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, updateData, { new: true });
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/vehicles/:id', async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const updatedVehicle = await Vehicle.softDeleteById(vehicleId);
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/vehicles/:id', async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const updatedVehicle = await Vehicle.findById(vehicleId);
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/vehicles', async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findDeleted();
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
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
        // const vehicles = await Vehicle.aggregate([
        //     {
        //         $geoNear: {
        //             near: {
        //                 type: 'Point',
        //                 coordinates: userSource
        //             },
        //             distanceField: 'dist.calculated',
        //             maxDistance: maxDistance,
        //             query: { available: true, type: vehicleType || { $exists: true } },
        //             includeLocs: 'pickupLocations',
        //             spherical: true
        //         }
        //     }
        //     // Additional pipeline stages if needed
        // ]);

        const vehicles = await Vehicle.find({
            "pickupLocations.coordinates": {
                $near: {
                    $geometry: { type: "Point", coordinates: userSource },
                    $maxDistance: maxDistance
                }
            },
        });

        res.json({ count: vehicles.length, vehicles });
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
