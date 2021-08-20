const mongoose = require('mongoose');
const Shema= new mongoose.Schema({
	_id: {
  type:String,
  required:true
   },
  
	prefix: {
  type:String,
    default:"-"
  },
  
  channel:{
  type:String,
    default:null
  },
  autopost:{
  type:Boolean,
  default:false
  },
   time:{
  type:Number,
  default:20*60*1000
  },
  language :{
  type:String,
    default:"en"
  }
  
});

const model=mongoose.model('guilds',Shema);
module.exports = model;

