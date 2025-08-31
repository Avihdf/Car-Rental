const mongoose=require('mongoose')

const booking=new mongoose.Schema({

    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicle' },
    booking_number:{type:String},
    location:{type:String,require:true},
    pickupdate:{type:String},
    returndate:{type:String},
    status:{type:String,default:'Pending'},
    date: { type: Date, default: Date.now },

})

module.exports=mongoose.model('Booking',booking)