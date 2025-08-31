const express=require('express')
const router = express.Router();

const login=require('../../viewcontrollers/clientcontroller/logincontroller')
const register=require('../../viewcontrollers/clientcontroller/registercontroller')


router.get('/login',login.showlogin)
router.post('/login',login.logindetail)


router.get('/register',register.showregister)
router.post('/register',register.registeruser)


module.exports = router;