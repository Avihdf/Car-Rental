const express=require('express')
const router = express.Router();
const jwtmiddleware=require('../../middleware/jwtmiddleware')
const home=require('../../viewcontrollers/clientcontroller/homecontroller')

router.get('/',home.showhome)
router.get('/navbar',home.shownav)
router.get('/logout',home.logout)

router.get('/review',home.showreview)
router.post('/review/:id',home.userreview)

module.exports = router;