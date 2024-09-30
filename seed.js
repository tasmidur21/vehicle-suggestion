const mongoose = require('mongoose');
const Vehicle = require('./models/Vehicle');

// Sample vehicle data
const vehicles = [
    {
        name: "Toyota Camry",
        type: "Car",
        ratePerDay: 50,
        currentLocation: {
            type: "Point",
            coordinates: [90.417339, 23.780573]  // Gulshan Diplomatic Zone
        },
        available: true,
        pickupLocations: [
            { type: "Point", coordinates: [90.417339, 23.780573] }, // Gulshan Diplomatic Zone
            { type: "Point", coordinates: [90.3770, 23.7465] }      // Dhanmondi Lake
        ],
        dropoffLocations: [
            { type: "Point", coordinates: [90.4123, 23.7775] },     // Bashundhara City Mall
            { type: "Point", coordinates: [90.3679, 23.8466] }      // Uttara Sector 7
        ]
    },
    {
        name: "Honda Civic",
        type: "Car",
        ratePerDay: 45,
        currentLocation: {
            type: "Point",
            coordinates: [90.4041, 23.7834]  // Banani Thana
        },
        available: true,
        pickupLocations: [
            { type: "Point", coordinates: [90.4041, 23.7834] }, // Banani Thana
            { type: "Point", coordinates: [90.4125, 23.8103] }  // Mirpur 10
        ],
        dropoffLocations: [
            { type: "Point", coordinates: [90.3954, 23.7350] }, // Motijheel Commercial Area
            { type: "Point", coordinates: [90.3958, 23.7372] }  // Shahbag Square
        ]
    },
    {
        name: "Yamaha R15",
        type: "Bike",
        ratePerDay: 20,
        currentLocation: {
            type: "Point",
            coordinates: [90.3978, 23.8431]  // Dhaka Airport (Hazrat Shahjalal)
        },
        available: true,
        pickupLocations: [
            { type: "Point", coordinates: [90.3978, 23.8431] }, // Dhaka Airport
            { type: "Point", coordinates: [90.4023, 23.7433] }  // Kamalapur Railway Station
        ],
        dropoffLocations: [
            { type: "Point", coordinates: [90.417339, 23.780573] }, // Gulshan Diplomatic Zone
            { type: "Point", coordinates: [90.3679, 23.8466] }      // Uttara Sector 7
        ]
    },
    {
        name: "Suzuki Ertiga",
        type: "Van",
        ratePerDay: 70,
        currentLocation: {
            type: "Point",
            coordinates: [90.3770, 23.7465]  // Dhanmondi Lake
        },
        available: true,
        pickupLocations: [
            { type: "Point", coordinates: [90.3770, 23.7465] }, // Dhanmondi Lake
            { type: "Point", coordinates: [90.3954, 23.7350] }  // Motijheel Commercial Area
        ],
        dropoffLocations: [
            { type: "Point", coordinates: [90.4123, 23.7775] }, // Bashundhara City Mall
            { type: "Point", coordinates: [90.3958, 23.7372] }  // Shahbag Square
        ]
    },
    {
        name: "Honda Activa",
        type: "Bike",
        ratePerDay: 15,
        currentLocation: {
            type: "Point",
            coordinates: [90.4125, 23.8103]  // Mirpur 10
        },
        available: true,
        pickupLocations: [
            { type: "Point", coordinates: [90.4125, 23.8103] }, // Mirpur 10
            { type: "Point", coordinates: [90.4023, 23.7433] }  // Kamalapur Railway Station
        ],
        dropoffLocations: [
            { type: "Point", coordinates: [90.417339, 23.780573] }, // Gulshan Diplomatic Zone
            { type: "Point", coordinates: [90.3958, 23.7372] }      // Shahbag Square
        ]
    }
];

// MongoDB connection URI
const MONGODB_URI = 'mongodb://localhost:27017/vehicle-rental'; // Replace with your MongoDB URI

// Function to seed the database
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI,{
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
