// const admin = require('../../models/admin')
// const bcrypt=require('bcrypt')
// const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'your_jwt_secret_key';

// exports.showadminlogin = (req, res) => {
//     res.render('adminlogin',{err:null})
// }

// exports.logindetail = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const exist = await admin.findOne({ email });
        
//         if (!exist) {
//             return res.render('adminlogin', { err: 'Invalid Admin Details' });
//         }

//         const match = await bcrypt.compare(password, exist.password);
//         if (!match) {
//             return res.render('adminlogin', { err: 'Invalid Password Details' });
//         }

//         const token = jwt.sign({ id: exist._id }, JWT_SECRET, { expiresIn: '1h' });
//         res.cookie('admin', token, { httpOnly: true });

//         return res.redirect('/admin/dashboard');
//     } catch (err) {
//         return res.render('adminlogin', { err: 'Error occurred: ' + err.message }); 
//     }
// };

