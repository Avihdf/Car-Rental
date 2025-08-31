const mongoose=require('mongoose')
const review= new mongoose.Schema({

    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    review:{type: String},
    date: { type: Date, default: Date.now },
})

module.exports=mongoose.model('Review',review)
