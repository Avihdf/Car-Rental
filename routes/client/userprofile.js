const express = require('express')
const router = express.Router();
const userprofile = require('../../viewcontrollers/clientcontroller/userprofilecontroller')
const userpassword=require('../../viewcontrollers/clientcontroller/userpasswordcontroller')
const booking=require('../../viewcontrollers/clientcontroller/mybookings')
const jwtMiddleware = require('../../middleware/jwtmiddleware')

router.get('/userprofile/:id', jwtMiddleware, userprofile.showuserprofile)

router.post('/userprofile/:id',jwtMiddleware,userprofile.updateuser)

router.get('/updatepassword/:id',jwtMiddleware,userpassword.showuserupadtepassword)

router.post('/updatepassword/:id',jwtMiddleware,userpassword.updatepassword)

router.get('/bookings/:id',jwtMiddleware,booking.showmybooking)

module.exports = router;