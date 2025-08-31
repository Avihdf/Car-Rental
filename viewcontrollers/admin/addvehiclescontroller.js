const admin = require('../../models/user');
const vehicle = require('../../models/allvehicle');
const displayvehicle=require('../../models/displayvehicle')

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


        const date=new Date();
        const accessories = req.body.access || [];
        const imageFiles = req.files.map(file => file.filename);

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
            images: imageFiles
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
            images: imageFiles,
        });

        await addvehicle.save();

        return res.render('addvehicles', { admin: adminData, msg: 'Vehicle Added Successfully' });
    } catch (err) {
        return res.render('addvehicles', {
            admin: adminData,
            msg: 'Error Occurred: ' + err.message
        });
    }
};
