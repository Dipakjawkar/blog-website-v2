const express = require('express');
const { userSignup, userSignin, users, userSignout, verifyUser } = require('../controller/userController')
const { userMiddlwere } = require('../middleware/userMiddlewere')

const userRoutes = express.Router()

// This route for signup process of user
userRoutes.post('/signup', userSignup)

// This route for signin process of user
userRoutes.post('/signin', userSignin)

// This route for Get all users
userRoutes.get('/', users)

// logout route
userRoutes.get('/signout', userSignout)

userRoutes.get('/verify', userMiddlwere, verifyUser)



module.exports = userRoutes