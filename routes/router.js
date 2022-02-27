const express = require('express');
const router = express.Router();
const userModel = require('../models/User')

// GET Request All
router.get('/getall', async(req, res)=>{
    const users = await userModel.find().populate({
        path:"Post",
        model:'Posts'
    });
    try{
   
    res.status(200)
    res.send(users);
  }catch (err){
    res.status(400).send(err)
  }
})
// GET Request One
router.get('/getone/:id', async(req, res)=>{
    try{
        const user =await userModel.findById({_id:req.params.id})
        res.status(200)
        res.send(user)
    }catch{
        res.status(400)
        res.send("the record does not exist")
    }
})
//Patch Request / partial update 
router.patch('/:id', async(req, res)=>{
    try{
        const id=req.params.id;
        const user =await userModel.findById({_id:id});
        if(req.body.FullName){
            user.FullName = req.body.FullName;
        }
        if(req.body.username){
            user.username = req.body.username;
        }
        if(req.body.email){
            user.email = req.body.email;
        }
        user.save();
        res.status(200);
        res.send(user);
    }catch{
        res.status(400);
        res.send({Err:"cannot partially updated record"});
    }
})
//Put update Request update 
router.put('/:id', async(req, res)=>{
    try{
        const id =req.params.id;
        const user =await userModel.findById({_id:req.params.id}, (err)=>{
            if(!err){
                user.FullName = req.body.FullName;
                user.username = req.body.username;
                user.email =req.body.email;
                user.save();
                res.status(200).send(user);
            }
        });
        
    }catch(err){
        res.status(400).send("cannot updated Record");
    }
})
// Post Request 
router.post('/', async(req, res)=>{
    try{
        const post = new userModel({
            FullName:req.body.FullName,
            username: req.body.username,
            email: req.body.email
        })
        await post.save();
        res.status(200).send(post);
    }catch{
        res.status(400).send("error occured in insertion");
    }
})
// Delete Request
router.delete('/:id', async(req, res)=>{
    try{
        const id = req.params.id;
        const user =await userModel.deleteOne({_id:req.params.id});
        res.status(200).send("deleted user successfully");
    }catch(err){
        res.status(400).send("error: "+err);
    }
})

module.exports = router;