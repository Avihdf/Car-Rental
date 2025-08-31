const express=require('express')
const router = express.Router();
const vehiclelist=require('../../viewcontrollers/admin/vehiclelistcontroller')
const adminMiddleware=require('../../middleware/adminjwtmiddleware')

router.get('/vehiclelist',adminMiddleware,vehiclelist.showvehiclelist)

router.post('/delete/:id',adminMiddleware,vehiclelist.deletevehicle)

module.exports = router;