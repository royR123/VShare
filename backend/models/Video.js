const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const VideoSchema = new Schema({
    videoId:{
        type:String,
        unique:true,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    }, 
    title:{
        type:String,
        required : true
    },
    description:{
        type:String,
        required : true
    },
    videoUrl:{
        type:String,
        required : true
    },
    imgUrl:{
        type:String,
        required : true
    },
    views:{
        type:Number,
        default:0
    },
    tags:{
        type:[String],
        default:[]
    },
    likes:{
        type:[String],
        default:[]
    },
    dislikes:{
        type:[String],
        default:[]
    }
},{ timestamps : true }
);

module.exports = mongoose.model('Videos',VideoSchema);