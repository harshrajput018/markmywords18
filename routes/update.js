const express=require('express');
const { default: mongoose } = require('mongoose');

const Note= require('../models/notes')


const router =express.Router()

router.post('/',async(req,res)=>{
    
    console.log(req.body.data);

    const a=await Note.updateOne({_id: mongoose.Types.ObjectId(req.body.data.id)},{title:req.body.data.title,content:req.body.data.content})

    
    res.send({})

})
     

module.exports=router;