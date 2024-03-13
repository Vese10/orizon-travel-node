const express = require('express')
const { client } = require('./db')

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await client.db().collection('users').find({}).toArray()
  res.status(200).json(users)
})

module.exports = router