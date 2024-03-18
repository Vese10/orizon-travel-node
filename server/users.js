const express = require('express')
const { getUsers, getUsersById, createUser, updateUser, deleteUser } = require('../controller/userController')

const router = express.Router()

// See all the users:
router.get('/', getUsers)

// See a specific user:
router.get('/:id', getUsersById)

// Add a new user:
router.post('/', createUser)

// Modify an existing user:
router.put('/:id', updateUser)

// Delete an existing user:
router.delete('/:id', deleteUser)

module.exports = router