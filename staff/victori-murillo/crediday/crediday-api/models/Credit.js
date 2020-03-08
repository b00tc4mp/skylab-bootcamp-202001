const { Schema, model, SchemaTypes: { ObjectId } } = require('mongoose')

const schema = new Schema({

  // Dates ISO
  // dateConstituted: {
  constitutedDate: {
    type: Date,
    default: Date.now
  },

  // dateCancelled: {
  canceledDate: {
    type: String,
    default: ''
  },

  // Default Fields

  paymentFrecuency: {
    type: 'String',
    default: 'Weekly'
  },

  frequency: Number,

  amount: {
    type: Number,
    required: true
  },

  balance: {
    type: Number,
    required: true
  },

  paymentDefault: {
    type: Number,
    required: true
  },

  paymentInterest: {
    type: Number,
    required: true
  },

  paymentAmortize: {
    type: Number,
    required: true
  },

  paymentMoratorium: {
    type: Number,
    default: 0,
  },

  paymentByDefault: {
    type: String,
    enum: ["Cash", "BN", "BCR", "BAC"],
    required: true
  },

  

  // this is in type: Frecuencia, si no cancela en esta fecha inician los intereses
  dateToCancel: {
    type: String,
  },

  

  creditState: {
    type: Boolean,
    default: true
  },

  firstTwiceMonthly: Number,
  secondTwiceMonthly: Number,


  //I have to make the inputs in the front, props underneath
  type: {
    type: String,
    enum: ["Personal", "Arrangement", "Pledge", "Mortgage", "Rent"]
  },

  dayToPay: {
    type: String,
    default: 'Saturday'
  },

  percentageMonth: Number,

  pendingInterest: {
    type: Number,
    default: 0
  },

  pendingMoratorium: {
    type: Number,
    default: 0
  },

  // New Attributes
  liquidated: {
    type: Number,
    default: 0
  },

  liquidatedBy: {
    type: String,
    enum: ["cash", "bn", "bcr", "bac"]
  },
  // Close New Attributes

  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },

  // company: {
  //   type: ObjectId,
  //   ref: 'Company',
  //   required: true
  // },

  payments: [{
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }]

}, { versionKey: false })

module.exports = model("Credit", schema)
