const express=require('express')
const router = express.Router();
const client=require('../../viewcontrollers/admin/clientlistcontroller')
const adminMiddelware=require('../../middleware/adminjwtmiddleware')

router.get('/clients',adminMiddelware,client.showclientlist)
router.post('/Delete/:id',adminMiddelware,client.deleteclient)

module.exports=router