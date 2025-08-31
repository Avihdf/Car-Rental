const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

module.exports = (req, res, next) => {
    const token = req.cookies.admin;
  

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.role !== 'admin') {
            return res.redirect('/');
        }

        req.adminId = decoded.id;
        next();
    } catch (err) {
        res.clearCookie('admin');
        return res.redirect('/login');
    }
};
