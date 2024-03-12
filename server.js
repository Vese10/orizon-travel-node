const { MongoClient } = require('mongodb')

const MONGO_URI = 'mongodb://localhost:27017/OrizonTravelAgency';
const client = new MongoClient(MONGO_URI);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

module.exports = connectToMongoDB