const { client } = require('../server/db')
const { ObjectId } = require('mongodb')

async function getOrders(req, res) {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5
  const { date, product } = req.query

  let query = {};
  
    if (date) {
      query.created_at = {$gte: new Date(date)}
    }

    if (product) {
      query.products = ObjectId.createFromHexString(product)
    }

    try {
      const count = await client.db().collection('orders').countDocuments(query)
      const totalPages = Math.ceil(count / limit)
      const offset = (page - 1) * limit
  
      const orders = await client.db().collection('orders').find(query).skip(offset).limit(limit).toArray()
  
      res.status(200).json({totalOrders: count, totalPages: totalPages, currentPage: page, orders: orders})
    } catch (error) {
      res.status(500).json({ error: "Internal server error" })
    }
  }

  async function getOrderById(req, res) {
    const id = req.params.id
    try {
      const order = await client.db().collection('orders').findOne({ _id: ObjectId.createFromHexString(id)})
      if (!order) {
        return res.status(404).json({error: "Order not found"})
      }
      res.status(200).json(order)
    } catch (error) {
      res.status(500).json({error: "Internal server error"})
    }
  }

  async function createOrder(req, res) {
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
  }

  async function updateOrder(req, res) {
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
      const result = await client.db().collection('orders').updateOne({_id: ObjectId.createFromHexString(id)}, {$set: updatedOrder})
      if (result.modifiedCount === 0) {
        return res.status(404).json({error: "Order not found"})
      }
      res.status(200).json({message: "Order updated successfully"})
    } catch (error) {
      res.status(500).json({error: "Internal server error"})
    }
  }

  async function deleteOrder(req, res) {
    const id = req.params.id
    try {
      const result = await client.db().collection('orders').deleteOne({_id: ObjectId.createFromHexString(id)})
      if (result.deletedCount === 0) {
        return res.status(404).json({error: "Order not found"})
      }
      res.status(200).json({message: "Order deleted successfully"})
    } catch (error) {
      res.status(500).json({error: "Internal server error"})
    }
  }

  module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
  }