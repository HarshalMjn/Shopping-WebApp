const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    contactNumber: {
        type:Number,
        require:true,
    },
    order : [
       {
        type:Number,
       } 
    ]
    
    
});

module.exports = mongoose.model("user", userSchema);