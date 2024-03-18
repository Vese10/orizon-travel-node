const express = require('express')
const { connectToMongoDB } = require('./db')
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

async function startServer() {
  try {
    await connectToMongoDB()
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Errore starting server:', error)
  }
}

startServer()