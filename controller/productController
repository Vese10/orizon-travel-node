const { client } = require ('../server/db')
const { ObjectId } = require('mongodb')

async function getProducts(req, res) {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5

  const totalProducts = await client.db().collection('products').countDocuments()
  const totalPages = Math.ceil(totalProducts / limit)
  const offset = (page - 1) * limit

  const products = await client.db().collection('products').find({}).skip(offset).limit(limit).toArray()

  res.status(200).json({totalProducts: totalProducts, totalPages: totalPages, currentPage: page, products: products})
}

async function getProductById(req, res) {
  const id = req.params.id
  const product = await client.db().collection('products').findOne({_id: ObjectId.createFromHexString(id)})
  if(!product) {
    return res.status(404).json({error: "Product not found"})
  }
  res.status(200).json(product)
}

async function createProduct(req, res) {
  const newProduct = req.body
  const result = await client.db().collection('products').insertOne(newProduct)
  res.status(201).json(result)
}

async function updateProduct(req, res) {
  const id = req.params.id
  const updatedProduct = req.body
  const result = await client.db().collection('products').replaceOne({_id: ObjectId.createFromHexString(id)}, updatedProduct)
  if (result.modifiedCount === 0) {
    return res.status(404).json({error: "Offer not found"})
  }
  res.status(200).json(updatedProduct)
}

async function deleteProduct(req, res) {
  const id = req.params.id
  const result = await client.db().collection('products').deleteOne({_id: ObjectId.createFromHexString(id)})
  if (result.deletedCount === 0) {
    return res.status(404).json({error: "Offer not found"})
  }
  res.status(200).json({message: "Offer deleted"})
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
