const admin = require('../../models/user')
const booking = require('../../models/booking')
const vehicle = require('../../models/allvehicle')

exports.showbooking = async (req, res) => {
    try {
        const adminData = await admin.findById(req.adminId);
        if (!adminData) return res.redirect('/login');

        const bookingdetails = await booking.find().sort({ _id: -1 }).populate('car_id').populate('user_id')

        const formattedBookings = bookingdetails.map(b => {
            const date = new Date(b.date);
            const dateformat = date.toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            return {
                ...b.toObject(),
                dateformat
            };
        });



        return res.render('adminbooking', { admin: adminData, booking: formattedBookings, err: null, msg: null })
    } catch (err) {
        console.log(err)
        return res.redirect('/admin/dashboard')
    }
}

exports.bookingstatus = async (req, res) => {
    try {
        const { booking_id, status } = req.body

        await booking.findByIdAndUpdate(booking_id, {
            status: status
        })
        return res.redirect('/admin/Bookings')

    } catch (err) {
        return res.redirect('/admin/Bookings')
    }
}

exports.cancelafterbooking=async(req,res)=>{
    try{
        const{booking_id,status}=req.body

        await booking.findByIdAndUpdate(booking_id, {
            status: status
        })
        return res.redirect('/admin/Bookings')

    }catch(err){

    }
}