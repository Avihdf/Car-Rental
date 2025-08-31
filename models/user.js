const mongoose=require('mongoose')

const user=new mongoose.Schema({
    account_number: String,
    name:String,
    email:{type:String},
    number:{type:Number},
    dob:{type:String},
    gender:{type:String},
    license:{type:String},
    address:{type:String},
    role: { type: String, default: "user" },
    password: { type: String },
    date: { type: Date, default: Date.now } 
    
})

module.exports=mongoose.model('user',user)