const mongoose=require('mongoose');

const vehicle= new mongoose.Schema({
    name:String,
    brand:{type:String,require:true},
    vehiclenumber:{type:String,require:true},
    description:{type:String,require:true},
    mode:{type:String,require:true},
    fuel:{type:String,require:true},
    available: { type: String, default: "Available" },
    year:{type:Number},
    price:{type:Number},
    date: { type: Date, default: Date.now },
    location:{type:String,require:true},
    seating:{type:Number},
    accessories: [String],
    images: [String]
})

module.exports=mongoose.model('vehicle',vehicle)