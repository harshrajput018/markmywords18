const express=require('express')

const Note= require('../models/notes')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'HarshIsMyName';

const mongoose = require('mongoose');




const router =express.Router()

router.get('/',async(req,res)=>{   

    

    if(req.header('auth-token')){

        console.log('ssss')
    
    const data=jwt.verify(req.header('auth-token'),JWT_SECRET)

    if(data){

        console.log('shownote1',data);

    const notes=await(Note.find({userid:mongoose.Types.ObjectId(data.user.id)}))



    

    console.log('shownotes',notes)

    res.send(notes.reverse())

    }
    

}
else {console.log('wtf')

    res.send({success:false})}
     
    
})

module.exports=router