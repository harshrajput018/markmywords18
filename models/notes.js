const mongoose = require('mongoose');

const Notes = new mongoose.Schema({

    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title: String,
    content: String
  });

const Note=mongoose.model('Note',Notes)

module.exports=Note;