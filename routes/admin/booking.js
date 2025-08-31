const express=require('express')
const router=express.Router();
const booking=require('../../viewcontrollers/admin/bookingscontroller')
const adminMiddleware=require('../../middleware/adminjwtmiddleware')

router.get('/Bookings',adminMiddleware,booking.showbooking)

router.post('/bookingstatus',adminMiddleware,booking.bookingstatus)

router.post('/cancelbooking/:id',adminMiddleware,booking.cancelafterbooking)


module.exports=router