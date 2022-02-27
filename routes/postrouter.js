const express = require('express');
const postModel = require('../models/Post')

const postrouter = express.Router();

//get all post
postrouter.get('/getall', async(req, res)=>{
    try{
        const posts =await postModel.find();
        res.status(200).send(posts);
    }catch(err){
        res.status(400).send("errors in getting records"+err);
    }
})
//get specific post by id 
postrouter.get('/getone/:id', async(req, res)=>{
    try{
        const post =await postModel.find({_id:req.params.id});
        res.status(200).send(post);
    }catch{
        res.status(400).send({Error:"Error in getting record by id"});
    }
})
//post request / insert
postrouter.post('/', async(req, res)=>{
    try{
        const post = new postModel({
            Title: req.body.Title,
            Content: req.body.Content,
            userid: req.body.userid
        })
       await post.save();
       res.status(200).send(post);
    }catch{
        res.status(400).send();
    }
})
//patch partial update
postrouter.patch('/:id', async(req, res)=>{
    try{
        const post =await postModel.findById({_id:req.params.id});
        if(req.body.Title){
            post.Title= req.body.Title
        }
        if(req.body.Content){
            post.Content= req.body.Content
        }
        post.save();
        res.status(200).send(post);
    }catch{
        res.status(400).send({Error:"Error in partial updating record"});
    }
})
//put reques update
postrouter.put('/:id', async(req, res)=>{
    try{
        const post = await postModel.findById({_id:req.params.id});
        post.Title = req.body.Title;
        post.Content = req.body.Content; 
        post.save();
        res.status(200).send(post);
    }catch{
        res.status(400).send({Error: "Error in full updating /PUT Request "});
    }
})
postrouter.delete('/:title', async(req, res)=>{
    try{
       // console.log(req.params.id);
        const post = await postModel.deleteOne({Title:req.params.title});
        post.status(200).send('deleted post successfully');
        
    }catch{
        res.status(400).send();
    }
})

module.exports = postrouter;