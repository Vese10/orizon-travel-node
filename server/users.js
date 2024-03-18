const express = require('express')
const { getUsers, getUsersById, createUser, updateUser, deleteUser } = require('../controller/userController')
const errorHandler = require('../view/errorHendler')

const router = express.Router()

// See all the users:
router.get('/', errorHandler(getUsers))

// See a specific user:
router.get('/:id', errorHandler(getUsersById))

// Add a new user:
router.post('/', errorHandler(createUser))

// Modify an existing user:
router.put('/:id', errorHandler(updateUser))

// Delete an existing user:
router.delete('/:id', errorHandler(deleteUser))

module.exports = router