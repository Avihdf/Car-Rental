const user = require('../../models/user')

exports.showclientlist = async (req, res) => {
    try {
        const adminData = await user.findById(req.adminId);
        if (!adminData) return res.redirect('/login');

        const users = await user.find({ role: 'user' });

        res.render('clientlist', {
            admin: adminData,
            user:users
        });
    } catch (err) {
        
        res.redirect('/admin/dashboard');
    }
}

exports.deleteclient=async(req,res)=>{
    try{
        const userid=req.params.id
        await user.findByIdAndDelete(userid)
        return res.redirect('/admin/clients')
    }catch(err){
        res.redirect('/admin/clients');
    }
}