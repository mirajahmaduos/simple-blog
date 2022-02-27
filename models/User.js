const mongoose = require('mongoose');

const users = mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
}, {collection:'Users', versionKey:false});

module.exports = mongoose.model("Users", users);