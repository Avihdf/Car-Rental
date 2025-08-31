const vehicle=require('../../models/allvehicle')
const user=require('../../models/user')

exports.showcars=async(req,res)=>{
    try {
            let userData = null;
    
            if (req.cookies.token) {
                const jwt = require('jsonwebtoken');
                const decoded = jwt.verify(req.cookies.token, 'your_jwt_secret_key');
                userData = await user.findById(decoded.id);
            }
            const vehicles=await vehicle.find();
            
            res.render('cars', { user: userData,vehicle:vehicles});
        } catch (err) {
            res.render('cars', { user: null });
        }
}