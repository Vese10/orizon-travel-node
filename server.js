const app = require('./app')
const { connectToMongoDB } = require('./db')

const PORT = 3000

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