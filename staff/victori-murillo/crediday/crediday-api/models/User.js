const { model, Schema, SchemaTypes: { ObjectId } } = require('mongoose')

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  crId: String,
  whatsapp: String,
  mobileNumber: String,
  homeAddress: String,
  workAddress: String,

  email: String,
  token: String,

  //Datos para Ingresar al Sistema

  role: {
    type: String,
    enum: ["Customer", "Collector", "Admin"],
    required: true,
    default: "Customer"
  },

  permissions: {
    type: Boolean,
    default: true
  },

  configInitialAmount: {
    type: Boolean,
    default: true
  },

  username: String,
  password: String,

  collectorsDontSee: [String],

  // credits: [{
  //   type: ObjectId,
  //   ref: 'Credit'
  // }],

  company: {
    type: ObjectId,
    ref: 'Company',
    // required: true
  }

})

schema.pre('save', next => {
  this.name = this.name.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase()
  next()
})

module.exports = model('User', schema)