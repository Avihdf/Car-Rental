const user=require('../../models/user')
exports.showaboutus = async (req, res) => {
    try {
        let userData = null;
       

        if (req.cookies.token) {
            const jwt = require('jsonwebtoken');
            const decoded = jwt.verify(req.cookies.token, 'your_jwt_secret_key');
            userData = await user.findById(decoded.id);
        }

        return res.render('aboutus', { user: userData });
    }
    catch (err) {
        console.log(err)
        res.render('aboutus', { user: [] })
    }
}