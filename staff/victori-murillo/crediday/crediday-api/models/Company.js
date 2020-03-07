const { model, Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = model('Company', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  identification: String,

  userQuantity: Number,

  boxFromDate: String,

  cashReserved: {
    type: Number,
    default: 0
  },

  bnReserved: {
    type: Number,
    default: 0
  },

  bcrReserved: {
    type: Number,
    default: 0
  },

  // users: [{
  //   type: ObjectId,
  //   ref: 'User'
  // }]

}))