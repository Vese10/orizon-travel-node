const express = require('express')
const { client } = require('./db')
const { ObjectId } = require('mongodb')

const router = express.Router()

// See all the users in the db:
router.get('/', async (req, res) => {
  const users = await client.db().collection('users').find({}).toArray()
  res.status(200).json(users)
})

// See a specific user:
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const user = await client.db().collection('users').findOne({_id: new ObjectId(id)})
  if(!user) {
    return res.status(404).json({error: "User not found"})
  }
  res.status(200).json(user)
})

// Add a new user:
router.post('/', async (req, res) => {
  const newUser = req.body
  const result = await client.db().collection('users').insertOne(newUser)
  res.status(201).json(result)
})

// Modify an existing user:
router.put('/:id', async (req, res) => {
  const id = req.params.id
  const updatedUser = req.body
  const result = await client.db().collection('users').replaceOne({_id: new ObjectId(id)}, updatedUser)
  if (result.modifiedCount === 0) {
    return res.status(404).json({error: 'User not found'})
  }
  res.status(200).json(updatedUser)
})

// Delete an existing user:
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const result = await client.db().collection('users').deleteOne({_id: new ObjectId(id)})
  if (result.deletedCount === 0) {
    return res.status(404).json({error: 'User not found'})
  }
  res.status(200).json({message: 'User deleted'})
})

module.exports = router