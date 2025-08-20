const { required } = require('joi');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PredictionSchema=new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    model:{
        type:String,
        required:true,
    },
    prediction:{
        type:String,
        required:true,
    },
    confidence:{
        type:Number,
        required:true,
    },
    timeStamp:{
        type:Date,default:Date.now,
    }
})

module.exports=mongoose.model('prediction',PredictionSchema);