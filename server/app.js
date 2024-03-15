const express = require('express')
const products = require('./products')
const users = require('./users')
const orders = require('./orders')

const app = express()
const PORT = 3000

app.use(express.json())

// Routes:
app.use('/products', products)
app.use('/users', users)
app.use('/orders', orders)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})