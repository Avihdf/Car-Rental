const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.cookies.admin;

    // console.log('Admin Token Check:', token ? 'Present' : 'Missing');
  

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'admin') {
            return res.redirect('/');
        }

        req.adminId = decoded.id;

        // console.log('Admin ID set in middleware:', req.adminId);
        next();
    } catch (err) {
        console.error('Admin Middleware Error:', error);
        return res.redirect('/login');
    }
};


