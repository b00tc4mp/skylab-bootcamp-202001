const { model, Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = model('Company', new Schema({
  name: {
    type: String,
    required: [true, 'Please add your company name'],
    trim: true,
    lowercase: true,
    minlength: [3, 'The name must have at least 3 characters'],
    maxlength: [20, 'The name must have maximum 20 characters']
  },

  registrationdDate: {
    type: Date,
    default: Date.now
  },

  // identification: String,

  // userQuantity: Number,

  // boxFromDate: String,

  // cashReserved: {
  //   type: Number,
  //   default: 0
  // },

  // bnReserved: {
  //   type: Number,
  //   default: 0
  // },

  // bcrReserved: {
  //   type: Number,
  //   default: 0
  // },

  Accounting: {
    type: ObjectId,
    ref: 'Box'
  },

  Setting: {
    type: ObjectId,
    ref: 'Box'
  },

  users: [{
    type: ObjectId,
    ref: 'User'
  }]

}))