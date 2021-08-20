const mongoose = require('mongoose');
const reqstring = {
  type: String,
  required: true
}
const listShema = new mongoose.Schema({
  _id: reqstring,
  reason: reqstring,
  by: reqstring,
  at: { type: Date, default: Date.now }
})
const ListModel = mongoose.model('Black-List', listShema)
module.exports = ListModel;