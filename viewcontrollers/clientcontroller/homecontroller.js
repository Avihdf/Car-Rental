const user = require('../../models/user')
const vehiclemodel = require('../../models/allvehicle')
const review = require('../../models/review')

exports.showhome = async (req, res) => {
    try {
        let userData = null;

        if (req.cookies.token) {
            try {
                const jwt = require('jsonwebtoken');
                const decoded = jwt.verify(req.cookies.token, 'your_jwt_secret_key');
                userData = await user.findById(decoded.id);
            } catch (err) {
                res.clearCookie('token');
                return res.redirect('/login');
            }
        }


        const vehicles = await vehiclemodel.find({available:'Available'}).sort({ _id: -1 }).limit(6)
        const rev = await review.find().limit(3);


        res.render('mainpage', { user: userData, vehicle: vehicles, review: rev });


    } catch (err) {
        res.render('mainpage', { user: null, vehicle: [], review: [] });
    }
};

exports.shownav = async (req, res) => {
    const userData = await user.findById(req.userId);
    console.log(userData)
    if (!userData) return res.redirect('/');

    res.render('clientnavbar', { user: userData });
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.redirect('/login');
    } catch (err) {
        res.redirect('/admin/dashboard');
    }
};

exports.showreview = async (req, res) => {
    try {
        let userData = null;

        if (req.cookies.token) {
            const jwt = require('jsonwebtoken');
            const decoded = jwt.verify(req.cookies.token, 'your_jwt_secret_key');
            userData = await user.findById(decoded.id);
        }

        const rev = await review.find().limit(3).populate('user_id')



        return res.render('reviewmainpage', { user: userData, review: rev })
    } catch (err) {
        return res.render('reviewmainpage', { review: [] + err.message })
    }
}

exports.userreview = async (req, res) => {
    try {
        const userid = req.params.id

        const { reviews } = req.body

        const date = new Date();
        const userexist = await user.findById(userid)

        if (!userexist) {
            return res.redirect('/')
        }

        const newreview = await review({ user_id: userid, review: reviews, date })
        await newreview.save();
        return res.redirect('/');
    } catch (err) {
        console.log(err)

    }
}

exports.showpagenotfound=async(req,res)=>{
    return res.render('pagenotfound')
}