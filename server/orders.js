const express = require('express')
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controller/orderController')
const errorHandler = require('../view/errorHendler')

const router = express.Router()

// See all the orders with filters (date & products):
router.get('/', errorHandler(getOrders))

// See a specific order:
router.get('/:id', errorHandler(getOrderById))

// Add new order:
router.post('/', errorHandler(createOrder))

// Modify an existing order:
router.put('/:id', errorHandler(updateOrder))

// Delete an existing order:
router.delete('/:id', errorHandler(deleteOrder))

module.exports = router