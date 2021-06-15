const mongoose = require('mongoose');
const reqstring={
  type:String,
  required:true
}
const PrefixShema = new mongoose.Schema({
	id: reqstring,
	Prefix: reqstring,
})
const PrefixModel=mongoose.model('custom-Prefix',PrefixShema)
module.exports = PrefixModel;