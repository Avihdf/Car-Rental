const vehicle = require('../../models/allvehicle');
const user = require('../../models/user');
const booking = require('../../models/booking')

exports.showcarbooking = async (req, res) => {
    try {
        let userData = null;
        const carid = req.params.id
        if (req.cookies.token) {
            const jwt = require('jsonwebtoken');
            const decoded = jwt.verify(req.cookies.token, 'your_jwt_secret_key');
            userData = await user.findById(decoded.id);
        }

        const cardetails = await vehicle.findById(carid)

        return res.render('carbooking', { car: cardetails, user: userData })
    } catch (err) {
        res.redirect('/cars')
    }
}

//const generate = () => Math.floor(1000000000 + Math.random() * 9000000000).toString()

async function generateBookingNumber() {
    const lastBooking = await booking.findOne().sort({ booking_number: -1 }).lean();

    let nextNumber = 1;
    if (lastBooking && lastBooking.booking_number) {
        nextNumber = parseInt(lastBooking.booking_number) + 1;
    }

    return nextNumber.toString().padStart(10, '0');  
}


exports.bookingdetail = async (req, res) => {
    try {
        const { user_id, car_id,location, pickupdate, returndate } = req.body
        const date=new Date();

        const car=await vehicle.findById(car_id)

        

        // if (car.available==="Unavailable") {
        //     return res.render('cars',{vehicle:[car],err:null,msg:'Car is Currently Unavailable'})
        // }

        // const lastBooking = await booking
        //     .findOne({ booking_number: { $regex: /^BOOK\d{10}$/ } })
        //     .sort({ booking_number: -1 });

        // let nextNumber = 1;

        // if (lastBooking) {
        //     const lastNum = parseInt(lastBooking.booking_number.slice(4), 10);
        //     nextNumber = lastNum + 1;
        // }

        // const booking_number = `${String(nextNumber).padStart(10, '0')}`;
        
        // // const booking_number = generate();

        const booking_number = await generateBookingNumber();

        const newbooking = await booking({
            booking_number,
            user_id,
            car_id,
            location,
            pickupdate,
            returndate,
            date,
        })

        await newbooking.save();

        return res.redirect('/bookings/'+user_id)

    } catch (err) {
        return res.redirect('/car'+car_id)
    }
}