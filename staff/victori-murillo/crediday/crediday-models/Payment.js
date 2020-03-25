const { Schema, model, SchemaTypes: { ObjectId } } = require('mongoose')

const schema = new Schema({
  paymentBy: {
    type: String,
    enum: ["cash", "bn", "bcr", "bac"],
    required: true
  },

  // hour: {
  //   type: String,
  //   required: true
  // },

  // datePayment: {
  //   type: String,
  //   required: true
  // },
  
  date: {
    type: Date,
    default: Date.now
  },

  amount: {
    type: Number,
    required: true
  },

  moratorium: {
    type: Number,
    required: true
  },

  interest: {
    type: Number,
    required: true
  },

  amortize: {
    type: Number,
    required: true
  },

  // registerBy: String,

  collectedBy: {
    type: ObjectId,
    ref: 'User'
  },

  collectedBy_ID: String,

  credit: {
    type: ObjectId,
    ref: 'Credit',
    required: true
  },

  company: {
    type: ObjectId,
    ref: 'Company',
    required: true
  },

}, { versionKey: false })

module.exports = model("Payment", schema)