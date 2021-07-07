require('dotenv').config()

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
console.log(TEST_MONGODB_URL);
const { random } = Math
const { AUTH } = require('../components')
const { mongoose } = require('events-models')
const { User } = require('events-models')

describe('registerUser', async () => {
  await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

  let name, surname, email, password

  beforeEach(() => {
    name = 'name-' + random()
    surname = 'surname-' + random()
    email = 'email' + random() + '@mail.com'
    password = 'password-' + random()
  })

  describe('when user already exist', () => {
    let _id

    beforeEach(async () => {
      await User.create({ name, surname, email, password })
      _id = user.id
    })

    it('should succed on right credentials', async () => {
      const id = await RegisterUser(email, password)
      expect(id).to.be.a('string')
      expect(id.length).to.be.greaterThan(0)
      expect(id).to.equal(_id)
    })
  })

  after(async () => {
    await mongoose.disconnect()
  })
})

