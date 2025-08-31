const express=require('express')
const router=express.Router();
const aboutus=require('../../viewcontrollers/clientcontroller/aboutuscontroller')

router.get('/aboutus',aboutus.showaboutus)

module.exports=router;