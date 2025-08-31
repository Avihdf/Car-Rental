const user=require('../../models/user')

exports.showcontact=async(req,res)=>{
    try{
         let userData = null;
               
        
                if (req.cookies.token) {
                    const jwt = require('jsonwebtoken');
                    const decoded = jwt.verify(req.cookies.token, 'your_jwt_secret_key');
                    userData = await user.findById(decoded.id);
                }
        
                return res.render('contact', { user: userData });

    }catch(err){
        res.render('contact',{user:[]})
    }
}
