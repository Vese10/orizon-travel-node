const express = require('express')
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controller/orderController')

const router = express.Router()

// See all the orders with filters (date & products):
router.get('/', getOrders)

// See a specific order:
router.get('/:id', getOrderById)

// Add new order:
router.post('/', createOrder)

// Modify an existing order:
router.put('/:id', updateOrder)

// Delete an existing order:
router.delete('/:id', deleteOrder)

module.exports = router