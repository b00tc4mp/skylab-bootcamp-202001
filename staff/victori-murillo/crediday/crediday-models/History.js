const { Schema, SchemaTypes: { ObjectId }, model } = require('mongoose')

const HistorySchema = new Schema({

  date: {
    type: Date,
    default: Date.now
  },
  // hour: {
  //   type: String,
  //   required: true
  // },

  // date: {
  //   type: String,
  //   required: true
  // },
  // userDid: {
  //   type: 
  // },

  username: {
    type: String,
    required: true
  },

  paymentAmount: {
    type: Number
  },

  creditAmount: Number,

  customerName: {
    type: String,
    requred: true
  },

  request: {
    type: String,
    required: true,
    enum: ["post", "put", "delete"]
  },

  model: {
    type: String,
    required: true,
    enum: ["user", "credit", "payment", "expense"]
  },

  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  }
})

module.exports = model("History", HistorySchema)