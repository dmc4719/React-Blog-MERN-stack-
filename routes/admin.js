const express = require('express'),
      router = express.Router(),  
      {Login, Register, getAdmins} = require('./../controllers/adminController')

 
router.post('/login',Login)
router.post('/register',Register)
router.get('/admins',getAdmins)

module.exports = router