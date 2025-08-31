const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const addvehicle = require('../../viewcontrollers/admin/addvehiclescontroller'); 
const adminMiddleware = require('../../middleware/adminjwtmiddleware');

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'vehicle_uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        public_id: (req, file) => {
            return `vehicle_${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        },
    },
});

// Multer configuration
const upload = multer({ 
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
        files: 5 // Maximum 5 files
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
    console.error('Multer Error:', error);
    
    if (error instanceof multer.MulterError) {
        let errorMessage = 'File upload error: ';
        if (error.code === 'LIMIT_FILE_SIZE') {
            errorMessage += 'File too large. Maximum size is 10MB.';
        } else if (error.code === 'LIMIT_FILE_COUNT') {
            errorMessage += 'Too many files. Maximum is 5 files.';
        } else {
            errorMessage += error.message;
        }
        
        return res.render('addvehicles', {
            admin: req.adminData || null,
            msg: errorMessage
        });
    }
    
    if (error.message === 'Only image files are allowed!') {
        return res.render('addvehicles', {
            admin: req.adminData || null,
            msg: error.message
        });
    }
    
    next(error);
};

// Routes
router.get('/addvehicle', adminMiddleware, addvehicle.showaddvehicles); 
router.post('/addvehicle', adminMiddleware, upload.array('images[]'), handleMulterError, addvehicle.addvehiclesdetails);

module.exports = router;
