const admin = require('../../models/user');
const Vehicle = require('../../models/allvehicle');
const booking=require('../../models/booking')

exports.showadmindashboard = async (req, res) => {
    try {
        const adminData = await admin.findById(req.adminId);
        if (!adminData) return res.redirect('/login');
        

        const totalUsers = await admin.countDocuments({ role: 'user' }); // only normal users
        const totalVehicles = await Vehicle.countDocuments();
        const totalbooking=await booking.countDocuments();
        const totalamount = await booking.find().populate('car_id');

        const totalpending= await booking.find({status:'Pending'}).countDocuments()
        const totalconform= await booking.find({status:'Confirmed'}).countDocuments()
        const totalcancel= await booking.find({status:'Cancelled'}).countDocuments()
        
        
        let totalAmount = 0;
        totalamount.forEach(b => {
            if (b.car_id && b.car_id.price) {
                totalAmount += b.car_id.price;
            }
        });

        res.render('admindashboard', {
            admin: adminData,
            totalUsers,
            totalVehicles,
            totalbooking,
            totalAmount,
            totalpending,
            totalconform,
            totalcancel

        });
    } catch (err) {
        res.redirect('/login');
    }
};

exports.navbar = async (req, res) => {
    try {
        const adminData = await admin.findById(req.adminId);
        if (!adminData) return res.redirect('/login');

        res.render('navbar', { admin: adminData });
    } catch (err) {
        res.redirect('/login');
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('admin');
        res.redirect('/login');
    } catch (err) {
        res.redirect('admin/dashboard');
    }
};
