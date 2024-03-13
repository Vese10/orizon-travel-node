const express = require('express')
const products = require('./products')
const users = require('./users')

const app = express()
const PORT = 3000

app.use(express.json())

// Routes:
app.use('/products', products)
app.use('/users', users)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})