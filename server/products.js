const express = require ('express')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controller/productController')
const errorHandler = require('../view/errorHendler')

const router = express.Router()

// See all the products:
router.get('/', errorHandler(getProducts))

// See a product with a specific id:
router.get('/:id', errorHandler(getProductById))

// Add a new product:
router.post('/', errorHandler(createProduct))

// Change an existing product:
router.put('/:id', errorHandler(updateProduct))

// Delete an existing product:
router.delete('/:id', errorHandler(deleteProduct))

module.exports = router