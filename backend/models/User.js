const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    userId:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{ 
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    img:{
        type:String
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscriberedUsers:{
        type:[String],
        default:[]
    }
},{ timestamps : true }
);

module.exports = mongoose.model('Users',UserSchema);