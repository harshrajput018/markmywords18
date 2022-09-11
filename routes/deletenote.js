const express=require('express')

const mongoose=require('mongoose')

const Note= require('../models/notes')


const router =express.Router()

router.post('/',async(req,res)=>{
    
    

    const a=await Note.deleteOne({_id:mongoose.Types.ObjectId(req.body.id)})

    
    res.send({})

})
     

module.exports=router;