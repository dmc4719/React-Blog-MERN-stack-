const express = require('express'),
      router = express.Router(),  
      {Login, Register, getUsers} = require('./../controllers/authController')

 
router.post('/login',Login)
router.post('/register',Register)
router.get('/users',getUsers)

module.exports = router