const admin = require('../../models/user');
const vehicle = require('../../models/allvehicle');
const displayvehicle = require('../../models/displayvehicle');

exports.showaddvehicles = async (req, res) => {
    try {
        const adminData = await admin.findById(req.adminId);
        if (!adminData) {
            return res.redirect('/admin/login');
        }
        res.render('addvehicles', { admin: adminData, msg: null });
    } catch (error) {
        console.error('Show Add Vehicles Error:', error);
        res.status(500).render('addvehicles', { 
            admin: null, 
            msg: 'Error loading page: ' + error.message 
        });
    }
};

// // Add this at the top of your controller file for debugging
// console.log('Cloudinary Config Check:');
// console.log('CLOUD_NAME:', process.env.CLOUD_NAME ? 'Set' : 'Missing');
// console.log('CLOUD_API_KEY:', process.env.CLOUD_API_KEY ? 'Set' : 'Missing');
// console.log('CLOUD_API_SECRET:', process.env.CLOUD_API_SECRET ? 'Set' : 'Missing');


exports.addvehiclesdetails = async (req, res) => {
    let adminData = null;
    
    try {
        // First, get admin data
        adminData = await admin.findById(req.adminId);
        if (!adminData) {
            return res.status(401).render('addvehicles', { 
                admin: null, 
                msg: 'Admin not found. Please login again.' 
            });
        }

        // console.log('Admin ID:', req.adminId);
        // console.log('Request Body:', req.body);
        // console.log('Uploaded Files:', req.files);

        const {
            name,
            brand,
            vehiclenumber,
            description,
            fuel,
            mode,
            year,
            price,
            seating,
            location
        } = req.body;

        // Validate required fields
        if (!name || !brand || !vehiclenumber || !fuel || !year || !price) {
            return res.render('addvehicles', {
                admin: adminData,
                msg: 'Please fill all required fields'
            });
        }

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.render('addvehicles', {
                admin: adminData,
                msg: 'At least one image is required'
            });
        }

        const date = new Date();
        const accessories = Array.isArray(req.body.access) ? req.body.access : [];

        // Get Cloudinary URLs from uploaded files
        const imageUrls = req.files.map(file => file.path);
        // console.log('Image URLs:', imageUrls);

        // Check if vehicle already exists
        const existingVehicle = await vehicle.findOne({ vehiclenumber });
        if (existingVehicle) {
            return res.render('addvehicles', {
                admin: adminData,
                msg: 'Vehicle with this number already exists'
            });
        }

        // Create display vehicle entry
        const newDisplayVehicle = new displayvehicle({
            name,
            brand,
            vehiclenumber,
            description,
            fuel,
            mode,
            year: parseInt(year),
            price: parseFloat(price),
            seating: parseInt(seating) || 4,
            accessories,
            images: imageUrls
        });

        const savedDisplayVehicle = await newDisplayVehicle.save();
        // console.log('Display Vehicle Saved:', savedDisplayVehicle._id);

        // Create main vehicle entry
        const newVehicle = new vehicle({
            name,
            brand,
            vehiclenumber,
            description,
            mode,
            fuel,
            year: parseInt(year),
            price: parseFloat(price),
            seating: parseInt(seating) || 4,
            location,
            date,
            accessories,
            images: imageUrls,
            available: 'Available'
        });

        const savedVehicle = await newVehicle.save();
        // console.log('Vehicle Saved:', savedVehicle._id);

        // Success response
        return res.render('addvehicles', { 
            admin: adminData, 
            msg: 'Vehicle Added Successfully' 
        });

    } catch (error) {
        console.error('Add Vehicle Details Error:', error);
        
        // Handle specific error types
        let errorMessage = 'An error occurred while adding the vehicle';
        
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            errorMessage = 'Validation Error: ' + validationErrors.join(', ');
        } else if (error.code === 11000) {
            errorMessage = 'Duplicate entry: Vehicle with this information already exists';
        } else if (error.message) {
            errorMessage = 'Error: ' + error.message;
        }

        return res.render('addvehicles', {
            admin: adminData || null,
            msg: errorMessage
        });
    }
};
