const mongoose = require('mongoose')

const content = mongoose.Schema({
    ContentType:{  //i.e video, audio, image
        type:String,
         required: true
    },
    ContentTitle:{
        type:String,
         required:true
    },
    PostedDate:{
        type:Date,
        default: Date.now()
    }
}, {versionKey: false, collection:"Contents"})

module.exports = mongoose.model("Contents", content);
