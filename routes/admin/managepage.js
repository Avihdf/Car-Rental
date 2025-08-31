const express=require('express')
const router = express.Router();
const displayvehicle=require('../../viewcontrollers/admin/displayvehiclecontroller')
const adminMiddleware=require('../../middleware/adminjwtmiddleware')


router.get('/displayvehicle',adminMiddleware,displayvehicle.showdisplayvehicle)

router.post('/status/:id',adminMiddleware,displayvehicle.displayonmainpage)

router.post('/deletedisplayvehicle/:id',adminMiddleware,displayvehicle.deletedisplayvehicle)


module.exports = router;