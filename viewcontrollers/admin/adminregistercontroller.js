// const admin = require('../../models/user')
// const bcrypt = require('bcrypt')

// exports.adminregister = async (req, res) => {
//     try {
//         const { name, number, email, password } = req.body
       

//         // const existadmin = await admin.find({ email, number })
//         // if (existadmin) {
//         //     return res.status(400).json({ msg: 'User already exists' });
//         // }
        
//         const hash = await bcrypt.hash(password, 10)

//         const newadmin = await new admin({ name, number, email, password: hash });
//         await newadmin.save();
//         res.status(201).json({ msg: "Admin Register Successfull" })

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }