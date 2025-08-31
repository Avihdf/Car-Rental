const express=require('express')
const router=express.Router();
const booking=require('../../viewcontrollers/clientcontroller/carbookingcontroller')

router.get('/car/:id',booking.showcarbooking)

router.post('/booking',booking.bookingdetail)

module.exports=router;