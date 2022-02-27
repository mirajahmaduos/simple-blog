const contentModel = require('../models/Content')

exports.createContent = async function(req, res) {
    var content = new contentModel({
        ContentTitle: req.body.ContentTitle,
        ContentType: req.body.ContentType
    })
    await content.save();
    res.status(200).send(content);
}
exports.getContent = async (req, res) => {
    try{
        var content =await contentModel.find();
    res.status(200).send({success:true, message:"Content Found", data: content});
    }catch(err){
        res.status(400).send({success:true, message:"Content Not Found", data:err});
    }
}
exports.getContentByid = async (req, res) => {
    try{
        const content =await contentModel.findById({_id:req.params.id});
        res.status(200).send(content);
    }catch(err){
        res.status(400).send({err:"not get record"});
    }
}
exports.deleteContent = async (req, res) => {
    const content = await contentModel.findByIdAndDelete(req.params.id);
    res.status(200).send("content deleted!!!");
}

exports.deleteBunch = async (req, res) => {
    try{
        const contents = await contentModel.deleteMany({ContentType:req.params.type});
        res.status(200).send("multiple record deleted");
    }catch(err){
        res.status(400).send("error in deleting bunch of record", err);
    }
}
exports.partialUpdate = async (req, res) => {
    try{
        const content =await contentModel.findById({_id:req.params.id}); //find record on it
        const updateproperty = req.body; //get data from body/form
        if(updateproperty.ContentType){  //if there is only ContentType to udpate
            content.ContentType = req.body.ContentType;  //update the property/field in model
        }
        if(updateproperty.ContentTitle){ //if their is only ContentTitle to update
            content.ContentTitle = req.body.ContentTitle;
        }
        content.save();
        res.status(200).send(content);
    }catch(err){
        res.status(200).send(err);
    }
}
exports.fullUpdate = async (req, res)=>{
    try{
        // const body = req.body; 
        const content = await contentModel.findByIdAndUpdate({_id:req.params.id},{ContentType:req.body.ContentType,ContentTitle:req.body.ContentTitle}); 
        // content.ContentType = req.body.ContentType;
        // content.ContentTitle = req.body.ContentTitle;
        // content.save();
        res.status(200).send(content);
    }catch(err){ 
        res.status(200).send(err);
    }
}