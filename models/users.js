const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    first: String,
    last: String,
    userid: String,
    password: Object
  });

const User=mongoose.model('User',Users)

module.exports=User;