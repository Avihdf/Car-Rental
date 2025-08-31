const express=require('express')
const router = express.Router();
// const adminregistercontroller=require('../../viewcontrollers/admin/adminregistercontroller')
const logincontroller=require('../../viewcontrollers/admin/adminlogincontroller')
const admindashboard=require('../../viewcontrollers/admin/admindashboardcontroller')
const adminprofile=require('../../viewcontrollers/admin/adminprofilecontroller')
const adminMiddleware=require('../../middleware/adminjwtmiddleware')

// router.post('/register',adminregistercontroller.adminregister)

// router.get('/login',logincontroller.showadminlogin)
// router.post('/login',logincontroller.logindetail)

router.get('/nav', adminMiddleware,admindashboard.navbar)
router.get('/dashboard', adminMiddleware,admindashboard.showadmindashboard)
router.post('/logout', adminMiddleware,admindashboard.logout)

router.get('/profile/:id',adminMiddleware,adminprofile.adminprofile)
router.post('/profile/:id',adminMiddleware,adminprofile.updateprofile)



module.exports = router;