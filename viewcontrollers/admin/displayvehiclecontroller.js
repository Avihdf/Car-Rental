const admin = require('../../models/user');
const vehicle=require('../../models/allvehicle');


exports.showdisplayvehicle=async(req,res)=>{
    try{
        const adminData = await admin.findById(req.adminId);
        if (!adminData) return res.redirect('/login');
        const displayvehicle=await vehicle.find();
       
        res.render('displayvehicle', {admin: adminData,vehicle:displayvehicle });
    }catch(err){
        res.redirect('/admin/dashboard')
    }
}

exports.displayonmainpage=async(req,res)=>{
    try{
        const {vehicle_id,available}=req.body
        
        await vehicle.findByIdAndUpdate(vehicle_id,{available})

        return res.redirect('/admin/displayvehicle')
    
    }catch(err){
        console.log(err)
        return res.redirect('/admin/displayvehicle')
    }
}

exports.deletedisplayvehicle=async(req,res)=>{
    try{
    await vehicle.findByIdAndDelete(req.params.id)
    res.redirect('/admin/displayvehicle')
    }catch(err){
        res.redirect('/admin/displayvehicle')
    }
}