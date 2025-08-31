const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const addvehicle = require('../../viewcontrollers/admin/addvehiclescontroller'); 
const adminMiddleware = require('../../middleware/adminjwtmiddleware');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, name + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


router.get('/addvehicle', adminMiddleware, addvehicle.showaddvehicles); 
router.post('/addvehicle', upload.array('images[]'), adminMiddleware, addvehicle.addvehiclesdetails); 

module.exports = router;
