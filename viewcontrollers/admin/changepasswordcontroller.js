const admin = require('../../models/user')
const bcrypt=require('bcrypt')

exports.showchangepassword = async (req, res) => {
    try {
        const adminData = await admin.findById(req.adminId);
        if (!adminData) return res.redirect('/login');

        return res.render('passwordchange', { admin: adminData, msg: null, err: null })
    } catch (err) {

        return res.render('passwordchange', { admin: [], err: 'error Ocuur' + err.message, msg: null })
    }
}

exports.changeadminpassword=async(req,res)=>{
    try{
        const adminid=req.params.id
        const{currentpassword,newpassword,confirmpassword}=req.body
        
        const adminData = await admin.findById(req.adminId);

        const exist=await admin.findById(adminid)
        const match= await bcrypt.compare(currentpassword,exist.password)

        if(!match){
            return res.render('passwordchange',{admin: adminData,err:'Invaild Current Password',msg:null})
        }

        if(newpassword!=confirmpassword){
             return res.render('passwordchange',{admin: adminData,err:'New password and Confirm password not match',msg:null})
        }

        const hash=await bcrypt.hash(newpassword,10)

        await admin.findByIdAndUpdate(adminid,{password:hash})

        return res.render('passwordchange',{admin: adminData,err:null,msg:'Password change Successfully'})

    }catch(err){
        return res.render('passwordchange',{admin: [],err:'Error Occur '+err.message,msg:null})
    }
}