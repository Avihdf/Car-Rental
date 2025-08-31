const admin = require('../../models/user');
const vehicle = require('../../models/allvehicle');

exports.showvehiclelist = async (req, res) => {
    const adminData = await admin.findById(req.adminId);
    if (!adminData) return res.redirect('/login');

    const vehiclelist = await vehicle.find();
    res.render('vehiclelist', { admin: adminData, vehicle: vehiclelist });
};

exports.deletevehicle=async(req,res)=>{
    await vehicle.findByIdAndDelete(req.params.id)
    return res.redirect('/admin/vehiclelist')


}
