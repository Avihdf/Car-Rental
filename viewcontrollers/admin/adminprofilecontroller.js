const admin = require('../../models/user');

exports.adminprofile = async (req, res) => {
    try {
        const adminData = await admin.findById(req.params.id);
        if (!adminData) {
            return res.redirect('/admin/dashboard');
        }

        res.render('editadminprofile', { admin: adminData, msg: null });
    } catch (err) {
        res.redirect('/admin/dashboard');
    }
};

exports.updateprofile = async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const updateadmin = await admin.findByIdAndUpdate(req.params.id, {
            name,
            number: phone,
            email
        }, { new: true });

        const adminData = await admin.findById(req.params.id);
        return res.render('editadminprofile', { msg: 'Profile updated successfully', admin: adminData });
    } catch (err) {
        const adminData = await admin.findById(req.params.id);
        return res.render('editadminprofile', { msg: 'Profile not updated', admin: adminData });
    }
};
