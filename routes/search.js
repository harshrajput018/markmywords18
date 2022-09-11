const express=require('express')

const Note= require('../models/notes')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'HarshIsMyName';

const mongoose = require('mongoose');


const router=express.Router();


router.post('/',async(req,res)=>{


    if(req.header('auth-token'))
   {

    console.log(req.header('auth-token'))

   const data=jwt.verify(req.header('auth-token'),JWT_SECRET)

   if (data){
    const notes=await(Note.find({userid:mongoose.Types.ObjectId(data.user.id)}));

    let filterednotes=notes.filter(o=>{

        let title=o.title.toLowerCase();
        let content=o.content.toLowerCase();
        let val=req.body.value.toLowerCase();


        if(title.search(val)!==-1)
        return o;
        if(content.search(val)!==-1)
        return o;

    })

    console.log('fn',filterednotes)
    res.send(filterednotes);
    
   }

   else {
    res.send({succes:'jsjs'})
   }
}


else{

    res.send({success:'false'});}
})

module.exports=router