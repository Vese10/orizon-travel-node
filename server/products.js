const express = require ('express')
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controller/productController')

const router = express.Router()

// See all the products:
router.get('/', getProducts)

// See a product with a specific id:
router.get('/:id', getProductById)

// Add a new product:
router.post('/', createProduct)

// Change an existing product:
router.put('/:id', updateProduct)

// Delete an existing product:
router.delete('/:id', deleteProduct)

module.exports = router