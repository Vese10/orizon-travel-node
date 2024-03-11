const express = require('express')
const app = express();
const {travelPack} = require('./products/products')

app.get("/products", (req, res) => {
  res.status(200).json({travelPack})
})

app.get("/products/:id", (req, res) => {
  const { id } = req.params
  const product = travelPack.find(
    (product) => product.id === id
  )
  res.status(200).json(product)
})

app.listen(3000)