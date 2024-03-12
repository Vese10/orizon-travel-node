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

connectToMongoDB ()

const express = require('express')

const app = express()
const PORT = 3000

app.use(express.json())

// See all the products in the db:
app.get('/products', async (req, res) => {
  const products = await client.db().collection('products').find({}).toArray()
  res.status(200).json(products)
})


// See a product with a specific id:
app.get('/products/:id', async (req, res) => {
  const id = req.params.id
  const product = await client.db().collection('products').findOne({id})
  if(!product) {
    return res.status(404).json({error: "Product not found"})
  }
  res.status(200).json(product)
})

// Add a new product:
app.post('/products', async (req, res) => {
  const newProduct = req.body
  const result = await client.db().collection('products').insertOne(newProduct)
  res.status(201).json(result.ops[0])
})

// Change an existing product:
app.put('/products/:id', async (req, res) => {
  const id = req.params.id
  const updatedProduct = req.body
  const result = await client.db().collection('products').replaceOne({id}, updatedProduct)
  if (result.modifiedCount === 0) {
    return res.status(404).json({error: 'Offer not found'})
  }
  res.status(200).json(updatedProduct)
})

// Delete an existing product:
app.delete('/products/:id', async (req, res) => {
  const id = req.params.id
  const result = await client.db().collection('products').deleteOne({id})
  if (result.deletedCount === 0) {
    return res.status(404).json({error: 'Offer not found'})
  }
  res.status(200).json({message: 'Offer deleted'})
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})