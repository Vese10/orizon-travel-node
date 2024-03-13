const express = require ('express')
const { client } = require ('./db')

const router = express.Router()

// See all the products in the db:
router.get('/', async (req, res) => {
  const products = await client.db().collection('products').find({}).toArray()
  res.status(200).json(products)
})

// See a product with a specific id:
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const product = await client.db().collection('products').findOne({id})
  if(!product) {
    return res.status(404).json({error: "Product not found"})
  }
  res.status(200).json(product)
})

// Add a new product:
router.post('/', async (req, res) => {
  const newProduct = req.body
  const result = await client.db().collection('products').insertOne(newProduct)
  res.status(201).json(result.ops[0])
})

// Change an existing product:
router.put('/:id', async (req, res) => {
  const id = req.params.id
  const updatedProduct = req.body
  const result = await client.db().collection('products').replaceOne({id}, updatedProduct)
  if (result.modifiedCount === 0) {
    return res.status(404).json({error: 'Offer not found'})
  }
  res.status(200).json(updatedProduct)
})

// Delete an existing product:
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const result = await client.db().collection('products').deleteOne({id})
  if (result.deletedCount === 0) {
    return res.status(404).json({error: 'Offer not found'})
  }
  res.status(200).json({message: 'Offer deleted'})
})

module.exports = router