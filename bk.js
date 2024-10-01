// seedData.js

const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');

// Sample vehicle data with location names
const vehicles = [
    {
        name: "Toyota Camry",
        type: "Car",
        ratePerDay: 50,
        currentLocation: {
            name: "Gulshan Diplomatic Zone",
            type: "Point",
            coordinates: [90.417339, 23.780573]  // [longitude, latitude]
        },
        available: true,
        pickupLocations: [
            {
                name: "Gulshan Diplomatic Zone",
                type: "Point",
                coordinates: [90.417339, 23.780573]
            },
            {
                name: "Dhanmondi Lake",
                type: "Point",
                coordinates: [90.3770, 23.7465]
            }
        ],
        dropoffLocations: [
            {
                name: "Bashundhara City Mall",
                type: "Point",
                coordinates: [90.4123, 23.7775]
            },
            {
                name: "Uttara Sector 7",
                type: "Point",
                coordinates: [90.3679, 23.8466]
            }
        ]
    },
    {
        name: "Honda Civic",
        type: "Car",
        ratePerDay: 45,
        currentLocation: {
            name: "Banani Thana",
            type: "Point",
            coordinates: [90.4041, 23.7834]  // [longitude, latitude]
        },
        available: true,
        pickupLocations: [
            {
                name: "Banani Thana",
                type: "Point",
                coordinates: [90.4041, 23.7834]
            },
            {
                name: "Mirpur 10",
                type: "Point",
                coordinates: [90.4125, 23.8103]
            }
        ],
        dropoffLocations: [
            {
                name: "Motijheel Commercial Area",
                type: "Point",
                coordinates: [90.3954, 23.7350]
            },
            {
                name: "Shahbag Square",
                type: "Point",
                coordinates: [90.3958, 23.7372]
            }
        ]
    },
    {
        name: "Yamaha R15",
        type: "Bike",
        ratePerDay: 20,
        currentLocation: {
            name: "Dhaka Airport (Hazrat Shahjalal)",
            type: "Point",
            coordinates: [90.3978, 23.8431]  // [longitude, latitude]
        },
        available: true,
        pickupLocations: [
            {
                name: "Dhaka Airport",
                type: "Point",
                coordinates: [90.3978, 23.8431]
            },
            {
                name: "Kamalapur Railway Station",
                type: "Point",
                coordinates: [90.4023, 23.7433]
            }
        ],
        dropoffLocations: [
            {
                name: "Gulshan Diplomatic Zone",
                type: "Point",
                coordinates: [90.417339, 23.780573]
            },
            {
                name: "Uttara Sector 7",
                type: "Point",
                coordinates: [90.3679, 23.8466]
            }
        ]
    },
    {
        name: "Suzuki Ertiga",
        type: "Van",
        ratePerDay: 70,
        currentLocation: {
            name: "Dhanmondi Lake",
            type: "Point",
            coordinates: [90.3770, 23.7465]  // [longitude, latitude]
        },
        available: true,
        pickupLocations: [
            {
                name: "Dhanmondi Lake",
                type: "Point",
                coordinates: [90.3770, 23.7465]
            },
            {
                name: "Motijheel Commercial Area",
                type: "Point",
                coordinates: [90.3954, 23.7350]
            }
        ],
        dropoffLocations: [
            {
                name: "Bashundhara City Mall",
                type: "Point",
                coordinates: [90.4123, 23.7775]
            },
            {
                name: "Shahbag Square",
                type: "Point",
                coordinates: [90.3958, 23.7372]
            }
        ]
    },
    {
        name: "Honda Activa",
        type: "Bike",
        ratePerDay: 15,
        currentLocation: {
            name: "Mirpur 10",
            type: "Point",
            coordinates: [90.4125, 23.8103]  // [longitude, latitude]
        },
        available: true,
        pickupLocations: [
            {
                name: "Mirpur 10",
                type: "Point",
                coordinates: [90.4125, 23.8103]
            },
            {
                name: "Kamalapur Railway Station",
                type: "Point",
                coordinates: [90.4023, 23.7433]
            }
        ],
        dropoffLocations: [
            {
                name: "Gulshan Diplomatic Zone",
                type: "Point",
                coordinates: [90.417339, 23.780573]
            },
            {
                name: "Shahbag Square",
                type: "Point",
                coordinates: [90.3958, 23.7372]
            }
        ]
    }
    // Add more vehicles as needed
];

// MongoDB connection URI
const MONGODB_URI = 'mongodb://localhost:27017/vehicle-rental-v2'; // Replace with your MongoDB URI

// Function to seed the database
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            autoIndex: true // Ensures that indexes are created automatically
        });
        console.log('MongoDB connected for seeding.');

        // Clear existing vehicles
        await Vehicle.deleteMany({});
        console.log('Existing vehicles cleared.');

        // Insert sample vehicles
        await Vehicle.insertMany(vehicles);
        console.log('Sample vehicles inserted successfully.');

        // Close the connection
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    } catch (error) {
        console.error('Error seeding the database:', error);
        mongoose.connection.close();
    }
};

// Run the seed function
seedDatabase();
// The seed.js file is used to seed the database with sample vehicle data. The vehicles array contains sample vehicle data with location names, coordinates, and other details. The seedDatabase function connects to the MongoDB database, clears existing vehicles, inserts the sample vehicles, and then closes the connection. This script can be run to populate the database with initial data.