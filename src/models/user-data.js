const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const uuid = require('node-uuid')
const Schema = mongoose.Schema

const schema = new Schema({
  _id: { type: String, default: uuid.v4 },
  firstname: String,
  lastname: String,
  email: String,
  data_of_birth: { type: Date },
  number: String,
  avatar_url: String,
}, { collection: 'products' })

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('Product', schema)
