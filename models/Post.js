const mongoose = require('mongoose');

const post = mongoose.Schema({
    Title:{
        type:String,
        required: true
    },
    Content:{
        type:String,
        required: "Required"
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    PostDate:{
        type:Date,
        required:true,
        default: Date.now
    }
}, {collection:'Posts', versionKey:false})

module.exports = mongoose.model("Posts", post)