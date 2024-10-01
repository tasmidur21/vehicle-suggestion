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
        name: "Toyota Camry",
        type: "Car",
        ratePerDay: 50,
        currentLocation: {
            name: "Banani",
            type: "Point",
            coordinates: [90.3961, 23.7806]  // [longitude, latitude]
        },
        available: true,
        pickupLocations: [
            {
                name: "Banani",
                type: "Point",
                coordinates: [90.3961, 23.7806]
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
            coordinates: [90.3877, 23.7384]  // [longitude, latitude]
        },
        available: true,
        pickupLocations: [
            {
                name: "Banani Thana",
                type: "Point",
                coordinates: [90.3877, 23.7384]
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
    },
    {
        name: "Honda Civic",
        type: "Car",
        ratePerDay: 40,
        currentLocation: {
            name: "Gazipur Chowrasta",
            type: "Point",
            coordinates: [90.433333, 23.933333]
        },
        available: true,
        pickupLocations: [
            {
                name: "Gazipur Chowrasta",
                type: "Point",
                coordinates: [90.433333, 23.933333]
            }
        ],
        dropoffLocations: [
            {
                name: "Uttara Sector 3",
                type: "Point",
                coordinates: [90.3722, 23.8394]
            },
            {
                name: "Badda Link Road",
                type: "Point",
                coordinates: [90.4244, 23.8642]
            }
        ]
    },
    {
        name: "Toyota Corolla",
        type: "Car",
        ratePerDay: 55,
        currentLocation: {
            name: "Dhaka University Campus",
            type: "Point",
            coordinates: [90.393333, 23.733333]
        },
        available: false,
        pickupLocations: [
            {
                name: "Dhaka University Campus",
                type: "Point",
                coordinates: [90.393333, 23.733333]
            }
        ],
        dropoffLocations: [
            {
                name: "Farmgate",
                type: "Point",
                coordinates: [90.4042, 23.7444]
            },
            {
                name: "Motijheel Commercial Area",
                type: "Point",
                coordinates: [90.4244, 23.7244]
            }
        ]
    },
    {
        name: "Suzuki Swift",
        type: "Car",
        ratePerDay: 35,
        currentLocation: {
            name: "Gulshan 2 Circle",
            type: "Point",
            coordinates: [90.4123, 23.780573]
        },
        available: true,
        pickupLocations: [
            {
                name: "Gulshan 2 Circle",
                type: "Point",
                coordinates: [90.4123, 23.780573]
            }
        ],
        dropoffLocations: [
            {
                name: "Banani 11",
                type: "Point",
                coordinates: [90.4022, 23.7944]
            },
            {
                name: "Baridhara Diplomatic Zone",
                type: "Point",
                coordinates: [90.4222, 23.8144]
            }
        ]
    },
    {
        name: "Hyundai Elantra",
        type: "Car",
        ratePerDay: 45,
        currentLocation: {
            name: "Mirpur 10",
            type: "Point",
            coordinates: [90.3622, 23.8264]
        },
        available: true,
        pickupLocations: [
            {
                name: "Mirpur 10",
                type: "Point",
                coordinates: [90.3622, 23.8264]
            }
        ],
        dropoffLocations: [
            {
                name: "Dhanmondi 27",
                type: "Point",
                coordinates: [90.3744, 23.7484]
            },
            {
                name: "Lalmatia",
                type: "Point",
                coordinates: [90.3844, 23.7584]
            }
        ]
    },
    {
        name: "Ford Focus",
        type: "Car",
        ratePerDay: 50,
        currentLocation: {
            name: "Uttara Sector 7",
            type: "Point",
            coordinates: [90.3679, 23.8466]
        },
        available: false,
        pickupLocations: [
            {
                name: "Uttara Sector 7",
                type: "Point",
                coordinates: [90.3679, 23.8466]
            }
        ],
        dropoffLocations: [
            {
                name: "Gulshan 1 Circle",
                type: "Point",
                coordinates: [90.4123, 23.780573]
            },
            {
                name: "Banani 11",
                type: "Point",
                coordinates: [90.4022, 23.7944]
            }
        ]
    },

    {
        name: "Kia Rio",
        type: "Car",
        ratePerDay: 30,
        currentLocation: {
            name: "Bashundhara City Mall",
            type: "Point",
            coordinates: [90.4123, 23.7775]
        },
        available: true,
        pickupLocations: [
            {
                name: "Bashundhara City Mall",
                type: "Point",
                coordinates: [90.4123, 23.7775]
            }
        ],
        dropoffLocations: [
            {
                name: "Uttara Sector 3",
                type: "Point",
                coordinates: [90.3722, 23.8394]
            },
            {
                name: "Gulshan 2 Circle",
                type: "Point",
                coordinates: [90.4123, 23.780573]
            }
        ]
    },
    {
        name: "Nissan Sentra",
        type: "Car",
        ratePerDay: 42,
        currentLocation: {
            name: "Chittagong Port",
            type: "Point",
            coordinates: [91.833333, 22.316667]
        },
        available: true,
        pickupLocations: [
            {
                name: "Chittagong Port",
                type: "Point",
                coordinates: [91.833333, 22.316667]
            }
        ],
        dropoffLocations: [
            {
                name: "Khulshi",
                type: "Point",
                coordinates: [91.783333, 22.333333]
            },
            {
                name: "Pahartali",
                type: "Point",
                coordinates: [91.833333, 22.366667]
            }
        ]
    },
    {
        name: "Mazda3",
        type: "Car",
        ratePerDay: 48,
        currentLocation: {
            name: "Sylhet Osmani Airport",
            type: "Point",
            coordinates: [91.866667, 24.966667]
        },
        available: false,
        pickupLocations: [
            {
                name: "Sylhet Osmani Airport",
                type: "Point",
                coordinates: [91.866667, 24.966667]
            }
        ],
        dropoffLocations: [
            {
                name: "Sylhet City Center",
                type: "Point",
                coordinates: [91.883333, 24.933333]
            },
            {
                name: "Tamabil",
                type: "Point",
                coordinates: [91.933333, 25.016667]
            }
        ]
    },
    {
        name: "Volkswagen Golf",
        type: "Car",
        ratePerDay: 38,
        currentLocation: {
            name: "Rajshahi University",
            type: "Point",
            coordinates: [88.583333, 24.366667]
        },
        available: true,
        pickupLocations: [
            {
                name: "Rajshahi University",
                type: "Point",
                coordinates: [88.583333, 24.366667]
            }
        ],
        dropoffLocations: [
            {
                name: "Rajshahi City Center",
                type: "Point",
                coordinates: [88.633333, 24.383333]
            },
            {
                name: "Kazla",
                type: "Point",
                coordinates: [88.716667, 24.416667]
            }
        ]
    },
    {
        name: "Chevrolet Cruze",
        type: "Car",
        ratePerDay: 45,
        currentLocation: {
            name: "Barisal University",
            type: "Point",
            coordinates: [90.366667, 22.7]
        },
        available: true,
        pickupLocations: [
            {
                name: "Barisal University",
                type: "Point",
                coordinates: [90.366667, 22.7]
            }
        ],
        dropoffLocations: [
            {
                name: "Barisal City Center",
                type: "Point",
                coordinates: [90.416667, 22.733333]
            },
            {
                name: "Ujirpur",
                type: "Point",
                coordinates: [90.483333, 22.766667]
            }
        ]
    },

    {
        name: "Skoda Octavia",
        type: "Car",
        ratePerDay: 40,
        currentLocation: {
            name: "Khulna University",
            type: "Point",
            coordinates: [89.533333, 22.816667]
        },
        available: true,
        pickupLocations: [
            {
                name: "Khulna University",
                type: "Point",
                coordinates: [89.533333, 22.816667]
            }
        ],
        dropoffLocations: [
            {
                name: "Khulna City Center",
                type: "Point",
                coordinates: [89.583333, 22.833333]
            },
            {
                name: "Daulatpur",
                type: "Point",
                coordinates: [89.633333, 22.866667]
            }
        ]
    },
    {
        name: "Renault Clio",
        type: "Car",
        ratePerDay: 35,
        currentLocation: {
            name: "Mymensingh Medical College",
            type: "Point",
            coordinates: [90.416667, 24.733333]
        },
        available: false,
        pickupLocations: [
            {
                name: "Mymensingh Medical College",
                type: "Point",
                coordinates: [90.416667, 24.733333]
            }
        ],
        dropoffLocations: [
            {
                name: "Mymensingh City Center",
                type: "Point",
                coordinates: [90.466667, 24.766667]
            },
            {
                name: "Trishal",
                type: "Point",
                coordinates: [90.516667, 24.816667]
            }
        ]
    },
    {
        name: "Peugeot 308",
        type: "Car",
        ratePerDay: 42,
        currentLocation: {
            name: "Rangpur Medical College",
            type: "Point",
            coordinates: [89.283333, 25.733333]
        },
        available: true,
        pickupLocations: [
            {
                name: "Rangpur Medical College",
                type: "Point",
                coordinates: [89.283333, 25.733333]
            }
        ],
        dropoffLocations: [
            {
                name: "Rangpur City Center",
                type: "Point",
                coordinates: [89.333333, 25.766667]
            },
            {
                name: "Haragach",
                type: "Point",
                coordinates: [89.383333, 25.816667]
            }
        ]
    },
    {
        name: "Fiat Punto",
        type: "Car",
        ratePerDay: 38,
        currentLocation: {
            name: "Jessore University",
            type: "Point",
            coordinates: [89.216667, 23.166667]
        },
        available: true,
        pickupLocations: [
            {
                name: "Jessore University",
                type: "Point",
                coordinates: [89.216667, 23.166667]
            }
        ],
        dropoffLocations: [
            {
                name: "Jessore City Center",
                type: "Point",
                coordinates: [89.266667, 23.216667]
            },
            {
                name: "Chanchra",
                type: "Point",
                coordinates: [89.316667, 23.266667]
            }
        ]
    },
    {
        name: "Seat Leon",
        type: "Car",
        ratePerDay: 45,
        currentLocation: {
            name: "Tangail District",
            type: "Point",
            coordinates: [90.0, 24.3]
        },
        available: false,
        pickupLocations: [
            {
                name: "Tangail District",
                type: "Point",
                coordinates: [90.0, 24.3]
            }
        ],
        dropoffLocations: [
            {
                name: "Tangail City Center",
                type: "Point",
                coordinates: [90.066667, 24.366667]
            },
            {
                name: "Sakhipur",
                type: "Point",
                coordinates: [90.116667, 24.416667]
            }
        ]
    },
    {
        name: "Citroen C4",
        type: "Car",
        ratePerDay: 40,
        currentLocation: {
            name: "Comilla Medical College",
            type: "Point",
            coordinates: [91.2, 23.416667]
        },
        available: true,
        pickupLocations: [
            {
                name: "Comilla Medical College",
                type: "Point",
                coordinates: [91.2, 23.416667]
            }
        ],
        dropoffLocations: [
            {
                name: "Comilla City Center",
                type: "Point",
                coordinates: [91.233333, 23.466667]
            },
            {
                name: "Chandina",
                type: "Point",
                coordinates: [91.283333, 23.516667]
            }
        ]
    },
    {
        name: "Opel Astra",
        type: "Car",
        ratePerDay: 38,
        currentLocation: {
            name: "Noakhali Science and Technology University",
            type: "Point",
            coordinates: [91.116667, 22.85]
        },
        available: true,
        pickupLocations: [
            {
                name: "Noakhali Science and Technology University",
                type: "Point",
                coordinates: [91.116667, 22.85]
            }
        ],
        dropoffLocations: [
            {
                name: "Noakhali City Center",
                type: "Point",
                coordinates: [91.15, 22.883333]
            },
            {
                name: "Begumganj",
                type: "Point",
                coordinates: [91.2, 22.933333]
            }
        ]
    },
    {
        name: "Renault Megane",
        type: "Car",
        ratePerDay: 42,
        currentLocation: {
            name: "Rajbari District",
            type: "Point",
            coordinates: [89.616667, 23.75]
        },
        available: true,
        pickupLocations: [
            {
                name: "Rajbari District",
                type: "Point",
                coordinates: [89.616667, 23.75]
            }
        ],
        dropoffLocations: [
            {
                name: "Rajbari City Center",
                type: "Point",
                coordinates: [89.65, 23.783333]
            },
            {
                name: "Goalanda",
                type: "Point",
                coordinates: [89.7, 23.833333]
            }
        ]
    }
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