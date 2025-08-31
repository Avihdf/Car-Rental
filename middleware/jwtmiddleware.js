const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};
