const mongoose=require('mongoose')

const admin=new mongoose.Schema({
    name:{type:String},
    number:{type:Number,unique:true},
    email:{type:String,unique:true},
    password:{type:String}
})

module.exports=mongoose.model('Admin',admin)