const user = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';


exports.showlogin = (req, res) => {
    res.render('login',{msg:null})
}

exports.logindetail = async (req, res) => {
    try {
        const { email, password } = req.body
        
        
        const existuser = await user.findOne({
            $or: [{ email }]
        });
    
        if (!existuser) {
            return res.render('login', { msg: 'Email or User ID is not register' })
        }

        const match = await bcrypt.compare(password, existuser.password)
        if (!match) {
            return res.render('login', { msg: 'Invaild Password' })
        }

        const token = jwt.sign(
            { id: existuser._id, role: existuser.role },
            JWT_SECRET,
            { expiresIn: '48h' }
        );
       

        if (existuser.role==='admin') {
             res.cookie('admin', token, { httpOnly: true });
              return res.redirect('/admin/dashboard');
        }
       
       
        res.cookie('token', token, { httpOnly:true });
        
    


        // if (existuser.role === 'admin') {
        //     return res.redirect('/admin/dashboard');
        // }

        return res.redirect('/')

    }
    catch (err) {
        console.log(err)
        return res.render('login', { msg: 'Error Occur try again!' + err.message })

    }
}