const express = require('express')
const mongoose = require('mongoose')
var bodyparser = require('body-parser');
const routes = require('./routes/router')
const postRouter = require('./routes/postrouter')
const contentRouter = require('./routes/ContentRouter')

const url ="mongodb+srv://pakdictionary:pakdictionary123@cluster0.mwtxc.mongodb.net/PakDictionary?retryWrites=true&w=majority";
const port = process.env.PORT || 3000;
mongoose.connect(url, {useNewUrlParser:true}, (err)=>{
    /* if(mongoose.connection.readyState){
        console.log("connection to mongodb atlas server succeded");
    }else{
        console.log("connection to mongodb not exist");
    } */
    if(!err)  console.log("connection to mongodb atlas server succeded");
    const app = express();
    //parse requests so its available in our route handler
    app.use(express.json());
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}))
    //register/install routes
    app.use('/users', routes);
    app.use('/posts', postRouter);
    app.use('/contents', contentRouter);
    // app.use(routes, postRouter);

    app.listen(port, (err)=>{
        if(!err)
        console.log("listening request on port 3000");
    })
    
})
/* mongoose.connection.on('connected', (connected)=>{
    console.log('mongo db connected');
})
mongoose.connection.on('error', (err)=>{
    console.log('mongodb connection error');
})
mongoose.connection.on('disconnected', (disconnected)=>{
    console.log('mongo db disconnected');
}) */
/* mongoose.connection.on('open', (err)=>{
    if(!err){
    console.log('connection to mongodb server successful')
    console.log(mongoose.connection.readyState);
}
}) */