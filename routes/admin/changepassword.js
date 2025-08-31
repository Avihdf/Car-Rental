const express=require('express')
const router=express.Router();

const changepassword=require('../../viewcontrollers/admin/changepasswordcontroller')
const adminMiddleware=require('../../middleware/adminjwtmiddleware')

router.get('/changepassword',adminMiddleware,changepassword.showchangepassword)

router.post('/changepassword/:id',adminMiddleware,changepassword.changeadminpassword)

module.exports=router