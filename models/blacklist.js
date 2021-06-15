const mongoose = require('mongoose');
const reqstring={
  type:String,
  required:true
}
const listShema = new mongoose.Schema({
	Id: reqstring,
  Reason: reqstring,
	By: reqstring,
})
const ListModel=mongoose.model('Black-List',listShema)
module.exports = ListModel;