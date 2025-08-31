const admin = require('../../models/user');
const vehicle = require('../../models/allvehicle');
const displayvehicle = require('../../models/displayvehicle')

exports.showaddvehicles = async (req, res) => {
    const adminData = await admin.findById(req.adminId);
    if (!adminData) return res.redirect('/login');

    res.render('addvehicles', { admin: adminData, msg: null });
};

exports.addvehiclesdetails = async (req, res) => {
    let adminData = null;
    try {
        adminData = await admin.findById(req.adminId);
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
        // console.log('Form Data:', req.body);
        // console.log('Uploaded Files:', req.files);



        const date = new Date();
        const accessories = req.body.access || [];

        // Cloudinary URLs instead of local file names
        const imageUrls = req.files.map(file => file.path);

        const exist = await vehicle.findOne({ vehiclenumber });
        if (exist) {
            return res.render('addvehicles', {
                admin: adminData,
                msg: 'Vehicle Already Exists'
            });
        }



        const displayvehicles = new displayvehicle({
            name,
            brand,
            vehiclenumber,
            description,
            fuel,
            mode,
            year,
            price,
            seating,
            accessories,
            images: imageUrls
        });
        await displayvehicles.save();

        const addvehicle = new vehicle({
            name,
            brand,
            vehiclenumber,
            description,
            mode,
            fuel,
            year,
            price,
            seating,
            location,
            date,
            accessories,
            images: imageUrls,
        });
        await addvehicle.save();

        return res.render('addvehicles', { admin: adminData, msg: 'Vehicle Added Successfully' });
    } catch (err) {
        console.error(err)
        return res.render('addvehicles', {
            admin: adminData,
            msg: 'Error Occurred: ' + err.message
        });
    }
};

