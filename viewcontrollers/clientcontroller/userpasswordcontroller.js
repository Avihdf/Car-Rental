const user=require('../../models/user')
const bcrypt=require('bcrypt')

exports.showuserupadtepassword=async(req,res)=>{
    try{
        const userid=req.params.id

        const userdetail=await user.findById(userid)

        return res.render('userpassword',{user:userdetail,err:null,msg:null})
    }catch(err){
        return res.redirect('/')
    }
}

exports.updatepassword=async(req,res)=>{
    try{
        const id=req.params.id
        const userdetail=await user.findById(id)
        const {oldpassword,newpassword,conformpassword}=req.body
        

        const match=await bcrypt.compare(oldpassword,userdetail.password)
        if(!match){
            return res.render('userpassword',{user:userdetail,err:'Old Password is incorrect',msg:null})
        }

        if(newpassword != conformpassword){
            return res.render('userpassword',{user:userdetail,err:'New Password does not match',msg:null})
        }

        const hash=await bcrypt.hash(newpassword,10)
        await user.findByIdAndUpdate(id,{password:hash})

        const updateuser=await user.findById(id)

        return res.render('userpassword',{user:updateuser,err:null,msg:'Password change Succesfully'})
        
    }catch(err){
        return res.render('userpassword',{user:userdetail,err:'Errro Occur'+err.message,msg:null})
    }
}