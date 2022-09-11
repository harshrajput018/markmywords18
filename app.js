const express= require('express');
const cors=require('cors')
const path=require('path')

const mongoose=require('mongoose');

const addnotes = require('./routes/addnotes')

const shownotes = require('./routes/shownotes')
const update = require('./routes/update')
const deletenote = require('./routes/deletenote');
const signup = require('./routes/signup');
const search = require('./routes/search');

const jwt = require('jsonwebtoken')





mongoose.connect(to_string(process.env.MONGODB_URI)).then(()=>{console.log('db has been connected')});

const app=express();

app.use(express.json())

app.use(express.static(path.join(__dirname+"/public")))



app.use(cors())

app.use('/addnotes',addnotes)
app.use('/shownotes',shownotes)
app.use('/update',update)
app.use('/deletenote',deletenote)
app.use('/signup',signup)
app.use('/search',search)





app.listen(process.env.PORT || 8000,()=>{
    console.log('server is listening')
})