const express = require('express')
const { client } = require('./db')
const { ObjectId } = require('mongodb')

const router = express.Router()

// See all the orders with filters (date & products):
router.get('/', async (req, res) => {
  try {
    const { date, product } = req.query
    let query = {};

    if (date) {
      query.created_at = {$gte: new Date(date)}
    }

    if (product) {
      query.products = new ObjectId(product)
    }

    const orders = await client.db().collection('orders').find(query).toArray()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
})

// See a specific order:
router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const order = await client.db().collection('orders').findOne({ _id: new ObjectId(id)})
    if (!order) {
      return res.status(404).json({error: "Order not found"})
    }
    res.status(200).json(order)
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
})

// Add new order:
router.post('/', async (req, res) => {
  const { products, users } = req.body

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({error: "Products array is required and should not be empty"})
  }
  if (!users || !Array.isArray(users) || users.length === 0) {
    return res.status(400).json({error: "Users array is required and should not be empty"})
  }

  const newOrder = {
    products: products.map(productId => ObjectId.createFromHexString(productId)),
    users: users.map(userId => ObjectId.createFromHexString(userId)),
    created_at: new Date()
  }

  try {
    const result = await client.db().collection('orders').insertOne(newOrder)
    res.status(201).json({message: "Order created successfully", orderId: result.insertedId})
  } catch (error) {
    res.status(500).json({error: "Internel server error"})
  }
})

// Modify an existing order:
router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { products, users } = req.body

  if(!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({error: "Products array is required and should not be empty"})
  }
  if(!users || !Array.isArray(users) || users.length === 0) {
    return res.status(400).json({error: "Users array is required and should not be empty"})
  }

  const updatedOrder = {
    products: products.map(productId => ObjectId.createFromHexString(productId)),
    users: users.map(userId => ObjectId.createFromHexString(userId)),
    updated_at: new Date()
  }

  try {
    const result = await client.db().collection('orders').updateOne({_id: new ObjectId(id)}, {$set: updatedOrder})
    if (result.modifiedCount === 0) {
      return res.status(404).json({error: "Order not found"})
    }
    res.status(200).json({message: "Order updated successfully"})
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
})

// Delete an existing order:
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const result = await client.db().collection('orders').deleteOne({_id: new ObjectId(id)})
    if (result.deletedCount === 0) {
      return res.status(404).json({error: "Order not found"})
    }
    res.status(200).json({message: "Order deleted successfully"})
  } catch (error) {
    res.status(500).json({error: "Internal server error"})
  }
})

module.exports = router