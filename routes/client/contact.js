const express=require('express');
const router=express.Router()
const contact=require('../../viewcontrollers/clientcontroller/contactcontroller')

router.get('/contact',contact.showcontact)

module.exports=router