const user=require('../../models/user')
const vehicle=require('../../models/allvehicle')
const booking=require('../../models/booking')

exports.showmybooking=async(req,res)=>{
    try{
        const userid=req.params.id

        const userdetail=await user.findById(userid)
        const bookingdetail=await booking.find({user_id:userid}).sort({_id:-1}).populate('car_id')

        const formattedBookings = bookingdetail.map(b => {
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
        // const cardetail=await vehicle.findById(bookingdetail[0].car_id)

        return res.render('mybooking',{user:userdetail,booking:formattedBookings,msg:null,err:null})
    }catch (err){
        console.log(err)
        return res.render('mybooking',{user:null,booking:[],msg:null,err:'Error occur'+err.message})
    }
}