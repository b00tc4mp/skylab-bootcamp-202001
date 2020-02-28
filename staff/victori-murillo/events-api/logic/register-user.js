const {validate} = require('../utils')
const { v4: uuid } = require('uuid')
const {MongoClient} = require('mongodb')

module.exports = async(name, surname, email, password) => {

  const client = new MongoClient('http://localhost:27017', { useUnifiedTopology: true });

  await client.connect()

  const db = client.db('events')
  const users = db.collection('users')

  validate.string(name, 'name')
  validate.string(surname, 'surname')
  validate.string(email, 'email')
  validate.email(email)
  validate.string(password, 'password')

  users.insertOne({ name: 'Fula', surname: 'Nita', email: 'menganita@gmail.com', password: '123' })
  
  let user = users.find(user => user.email === email)

  if(user) throw new Error(`user with email ${email} already exists`)

  user = {id: uuid(), name, surname, email, password, created: new Date}



  // users.push(user)

  // return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2))
}