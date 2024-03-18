const { client } = require ('../server/db')
const { ObjectId } = require('mongodb')

async function getUsers(req, res) {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5

  const totalUsers = await client.db().collection('users').countDocuments()
  const totalPages = Math.ceil(totalUsers / limit)
  const offset = (page - 1) * limit

  const users = await client.db().collection('users').find({}).skip(offset).limit(limit).toArray()

  res.status(200).json({totalUsers: totalUsers, totalPages: totalPages, currentPage: page, users: users})
}

async function getUsersById(req, res) {
  const id = req.params.id
  const user = await client.db().collection('users').findOne({_id: ObjectId.createFromHexString(id)})
  if(!user) {
    return res.status(404).json({error: "User not found"})
  }
  res.status(200).json(user)
}

async function createUser(req, res) {
  const newUser = req.body
  const result = await client.db().collection('users').insertOne(newUser)
  res.status(201).json(result)
}

async function updateUser(req, res) {
  const id = req.params.id
  const updatedUser = req.body
  const result = await client.db().collection('users').replaceOne({_id: ObjectId.createFromHexString(id)}, updatedUser)
  if (result.modifiedCount === 0) {
    return res.status(404).json({error: "User not found"})
  }
  res.status(200).json(updatedUser)
}

async function deleteUser(req, res) {
  const id = req.params.id
  const result = await client.db().collection('users').deleteOne({_id: ObjectId.createFromHexString(id)})
  if (result.deletedCount === 0) {
    return res.status(404).json({error: "User not found"})
  }
  res.status(200).json({message: "User deleted"})
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser
}