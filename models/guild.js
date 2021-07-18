const mongoose = require('mongoose');
const Shema= new mongoose.Schema({
	_id: {
  type:String,
  required:true
   },
  
	prefix: {
  type:String,
  required:true,
    default:"-"
  },
  
  channel:{
  type:String,
  required:true,
    default:null
  },
  
  language :{
  type:String,
  required:true,
    default:"en"
  }
  
});

const model=mongoose.model('guilds',Shema);
module.exports = model;

