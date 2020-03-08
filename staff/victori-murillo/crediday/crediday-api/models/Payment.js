const { Schema, model, SchemaTypes: { ObjectId } } = require('mongoose')

const schema = new Schema({
  paymentBy: {
    type: String,
    enum: ["Cash", "BN", "BCR", "BAC"],
    required: true
  },

  hour: {
    type: String,
    required: true
  },

  datePayment: {
    type: String,
    required: true
  },

  amountPayment: {
    type: Number,
    required: true
  },

  moratoriumPayment: {
    type: Number,
    required: true
  },

  interestPayment: {
    type: Number,
    required: true
  },

  amortizePayment: {
    type: Number,
    required: true
  },

  // registerBy: String,

  collectedBy: String,
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

  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  }

})

module.exports = model("Payment", schema)