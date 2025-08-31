const bcrypt=require('bcrypt')
const nodemailer = require('nodemailer')
const user = require('../../models/user')

exports.showforegtepasswordpage = async (req, res) => {
    try {

        return res.render('forgetpassword', { err: null, msg: null })
    } catch (err) {
        return res.render('forgetpassword', { err: 'Error Occur' + err.message, msg: null })
    }
}



const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()

const sendotp = generateOTP();

exports.sendforgetpassword = async (req, res) => {

    try {
        const { email } = req.body
        // const otp = generateOTP();

        const exist = await user.findOne({ email: email })
        if (!exist) {
            return res.render('forgetpassword', {
                err: 'No user found with this email',
                msg: null,
            });
        }


        //OTP sending logic

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'avinash96255@gmail.com',
                pass: 'wesv pjaz tjok bkvt',
            }
        })

        const mailoptions = {
            from: 'avinash96255@gmail.com',
            to: email,
            subject: 'Your OTP for change Password',
            html: `<p>your OTP is ${sendotp}.</p>`
        }

        await transport.sendMail(mailoptions)

        return res.render('otpverification', {
            user: exist,
            err: null,
            msg: 'OTP send to ' + exist.email
        })

    } catch (err) {
        return res.render('forgetpassword', { err: 'Error Occur ' + err.message + 'try again', msg: null })
    }
}


exports.verifyotp = async (req, res) => {
    try {
        const userid = req.params.id
        const { otp } = req.body
       
        

        const userData = await user.findById(userid);
       
        

        if (otp != sendotp) {
            return res.render('otpverification', {
                user: userData,
                err: "Invalid OTP",
                msg: null,
            })
        }

        return res.render('changepasswordwithotp', {
            user: userData,
            err: null,
            msg: null,
        })

    } catch (err) {
        return res.render('forgetpassword', { err: 'Error Occur ' + err.message + 'try again', msg: null })
    }
}

exports.changepassword=async(req,res)=>{
    try{
        const userid=req.params.id
        const{newpassword,confirmpassword}=req.body

        
        const userData=await user.findById(userid)
       

        if(newpassword.trim() !== confirmpassword.trim()){
            return res.render('changepasswordwithotp',{err:'Both password are different',user:userData,msg:null})
        }

        const hash=await bcrypt.hash(newpassword,10)
        await user.findByIdAndUpdate(userid,{password:hash})

        return res.redirect('/login')

        return res.render('login',{user:userData,err:null,msg:'Password change Successfully'})
    }catch(err){
        return res.render('/login',{err:'Error Occur'+err.message+'try again',msg:null})
    }
}