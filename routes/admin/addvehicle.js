const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const addvehicle = require('../../viewcontrollers/admin/addvehiclescontroller'); 
const adminMiddleware = require('../../middleware/adminjwtmiddleware');


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads/');
//     },
//     filename: function (req, file, cb) {
//         const name = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, name + path.extname(file.originalname));
//     }
// });

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'vehicle_uploads', // Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage });


router.get('/addvehicle', adminMiddleware, addvehicle.showaddvehicles); 
router.post('/addvehicle', adminMiddleware, upload.array('images[]'), addvehicle.addvehiclesdetails);

module.exports = router;
