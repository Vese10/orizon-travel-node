const { MongoClient } = require('mongodb')
const connectToMongoDB = require('./server')
const express = require('express')

const users = express()
const PORT = 3000

const MONGO_URI = 'mongodb://localhost:27017/OrizonTravelAgency';
const client = new MongoClient(MONGO_URI);

connectToMongoDB ()

users.use(express.json())

// See all the users in the db:
users.get('/users', async (req, res) => {
  const users = await client.db().collection('users').find({}).toArray()
  res.status(200).json(users)
})

users.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})