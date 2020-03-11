// require('dotenv').config()

// const { env: { TEST_MONGODB_URL } } = process
// const { mongoose } = require('crediday-models')
// const { expect } = require('chai')
// const { random } = Math
// const retrieveCompany = require('./retrieve-company')

// describe('registerCompany', () => {
//   before(async () => {
//     await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   })

//   let companyName, username

//   beforeEach(async () => {
//     companyName = (`companyname${random()}`).slice(0, 19)
//     username = (`username${random()}`).slice(0, 29)

//     await registerCompany({ company: { name: companyName }, user: { username } })
//   })


//   it('should return all companies, 1 company', () => {

//     return retrieveAllCompanies()
//       .then(companies => {
//         expect(companies).to.be.an('array')
//         expect(companies[0].name).to.equal(companyName);
//       })
//   })

//   it('should return 2 companies with all properties', () => {
//     return retrieveAllCompanies()
//       .then(companies => {
//         expect(companies).to.be.an('array')
//         expect(companies.length).to.equal(2)

//         companies.forEach(company => {
//           expect(company).to.have.all.keys('id', 'name', 'registrationdDate', 'history', 'users')
//         })
//       })
//   })

//   it('should return 3 companies with id and name', () => {
//     return retrieveAllCompanies({ name: '' })
//       .then(companies => {

//         expect(companies).to.be.an('array')
//         expect(companies.length).to.equal(3)

//         companies.forEach(company => {
//           expect(company).to.have.all.keys('id', 'name')
//           expect(company).to.not.have.any.keys('_id')
//         })
//       })
//   })

//   it('should return 4 companies with registrationdDate and name', () => {
//     return retrieveAllCompanies({ registrationdDate: '', name: '' })
//       .then(companies => {

//         expect(companies).to.be.an('array')
//         expect(companies.length).to.equal(4)

//         companies.forEach(company => {
//           expect(company).to.have.all.keys('id', 'name', 'registrationdDate')
//           expect(company).to.not.have.any.keys('_id')
//         })
//       })
//   })

//   it('should return 5 companies without unknown property', () => {
//     return retrieveAllCompanies({ unknown: '' })
//       .then(companies => {

//         expect(companies).to.be.an('array')
//         expect(companies.length).to.equal(5)

//         companies.forEach(company => {
//           expect(company).to.not.have.any.keys('_id', 'unknown')
//           expect(company).to.have.all.keys('id', 'name', 'registrationdDate', 'history', 'users')
//         })
//       })
//   })

//   after(() => mongoose.disconnect())
// })