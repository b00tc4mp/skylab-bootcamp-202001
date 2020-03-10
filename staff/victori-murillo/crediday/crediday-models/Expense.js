const { Schema, SchemaTypes: { ObjectId }, model } = require('mongoose')

const expenseSchema = Schema({

  expenseBy: {
    type: String,
    enum: ["Cash", "BN", "BCR", "BAC"],
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  detail: {
    type: String,
    required: true
  },

  dateCollect: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  // hour: {
  //   type: String,
  // },

  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },

  // company: {
  //   type: ObjectId,
  //   ref: 'Company',
  // },

  // then add the user add the especific expense
}, { versionKey: false })

module.exports = mongoose.model("Expense", expenseSchema)