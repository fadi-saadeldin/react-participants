const mongoose=require('mongoose');
const Schema =mongoose.Schema;

//Create Schema
const  ParticipantSchema=new Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
phone:{
    type:String,
    required:true,
},
date: {
    type: Date,
    default: Date.now
},
});

module.exports=Participant=mongoose.model('participants',ParticipantSchema);