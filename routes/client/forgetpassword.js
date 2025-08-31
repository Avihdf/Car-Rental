const express=require('express')
const router=express.Router();
const forgetpassword=require('../../viewcontrollers/clientcontroller/forgetpasswordcontroller')

router.get('/forget_password',forgetpassword.showforegtepasswordpage)

router.post('/forget_password',forgetpassword.sendforgetpassword)

router.post('/verifyotp/:id',forgetpassword.verifyotp)

router.post('/changepassword/:id',forgetpassword.changepassword)

module.exports=router