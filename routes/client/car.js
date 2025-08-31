const express=require('express')
const router=express.Router();
const car=require('../../viewcontrollers/clientcontroller/carscontroller')

router.get('/cars',car.showcars)

module.exports=router;