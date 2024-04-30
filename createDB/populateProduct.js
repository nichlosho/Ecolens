import { MongoClient } from 'mongodb';
import { environment } from '../environments/environment.js';

// Database Name
const dbName = 'Ecolens';

async function populateProducts() {
  let client;

  try {
    // Connect to the MongoDB server using the connection URL from the environment
    client = await MongoClient.connect(environment.mongoDBConnection, { useUnifiedTopology: true });
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('Products');

    // Create an array of sample products
    const products = [
      {
        name: 'Aviator Sunglasses',
        description: 'Classic aviator sunglasses with gold frames and green lenses.',
        price: 129.99,
        quantity: 25,
        inventoryStatus: 'In Stock',
        category: 'Sunglasses',
        glassesInfo: {
          material: 'Metal',
          frameColor: 'Gold',
          lensColor: 'Green',
          prescriptionType: 'None',
        },
        image: 'aviator_sunglasses.jpg',
      },
      {
        name: 'Round Eyeglasses',
        description: 'Retro-style round eyeglasses with thin metal frames.',
        price: 79.99,
        quantity: 40,
        inventoryStatus: 'In Stock',
        category: 'Eyeglasses',
        glassesInfo: {
          material: 'Metal',
          frameColor: 'Silver',
          lensColor: 'Clear',
          prescriptionType: 'Single Vision',
        },
        image: 'round_eyeglasses.jpg',
      },
      {
        name: 'Cat Eye Sunglasses',
        description: 'Fashionable cat eye sunglasses with black frames and dark lenses.',
        price: 89.99,
        quantity: 30,
        inventoryStatus: 'In Stock',
        category: 'Sunglasses',
        glassesInfo: {
          material: 'Acetate',
          frameColor: 'Black',
          lensColor: 'Black',
          prescriptionType: 'None',
        },
        image: 'cat_eye_sunglasses.jpg',
      },
    ];

    // Insert the sample products into the collection
    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} products inserted successfully`);
  } catch (err) {
    console.error('Error populating products:', err);
  } finally {
    // Close the MongoDB connection
    if (client) {
      await client.close();
      console.log('MongoDB connection closed');
    }
  }
}

populateProducts();