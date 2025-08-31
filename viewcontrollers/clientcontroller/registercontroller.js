const user = require('../../models/user')
const bcrypt = require('bcrypt')

exports.showregister = (req, res) => {
  const success = req.query.success;
  res.render('register', {
    err: null,
    msg: success ? 'User registered successfully!' : null
  });
};

const generate = () => Math.floor(1000000000 + Math.random() * 9000000000).toString()

exports.registeruser = async (req, res) => {
    try {
        const account_number = generate();
        const now = new Date();
        const { name, email, number, dob, gender, license, address, role, password, confirmpassword } = req.body;

        const emailExists = await user.findOne({ email });
        // const idExists = await user.findOne({ User_id: id });
        const licenseExists=await user.findOne({license})

        if (emailExists) {
            return res.render('register', { err: 'Email already registered', msg: null });
        }

        if (licenseExists) {
            return res.render('register', { err: 'License Already Register', msg: null });
        }

        if (password !== confirmpassword) {
            return res.render('register', { err: "Password don't match", msg: null })
        }
        const hash = await bcrypt.hash(password, 10);

        const newuser = await user({ account_number, name, email, role, number, dob, gender, license, address, role, password: hash, date: now })
        await newuser.save();
        return res.render('login', { msg: 'User register Succesfully', err: null })
        // return res.redirect('/login?success=true');

    } catch (err) {
        return res.render('register', { err: 'error occur' + err.message, msg: null })
    }
}