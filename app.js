const express = require('express')
const { MongoClient } = require('mongodb')

const app = express()
const PORT = 3000
const MONGO_URI = 'mongodb://localhost:27017/OrizonTravelAgency';

const client = new MongoClient(MONGO_URI);

app.use(express.json())

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
}

connectToMongoDB();