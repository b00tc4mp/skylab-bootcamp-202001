require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveDrug = require('./retrieve-drug')
const { mongoose, models: { Drug } } = require('pill-o-clock-data')

describe('retrieveDrug', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Drug.deleteMany())
    )

    let drugName, description

    beforeEach(() => {
        drugName = `drugName-${random()}`
        description = `description-${random()}`
        
    })

    describe('when drug already exists', () => {

        beforeEach(() =>
            Drug.create({ drugName, description})       
            .then(()=>{})
        )

        it('should succeed on correct and valid and right data', () =>
            retrieveDrug(drugName)
                .then(drug => { 
                    expect(drug.drugName).to.equal(drugName)
                    expect(drug.description).to.equal(description)
                    
                })
        )
        it('should succeed on invalid right data', () =>
            retrieveDrug(`${drugName}-wrong`)
                .then(() => { 
                    throw new Error('should not reach this point')
                    
                })
                .catch(error => {
                    expect(error.message).to.equal(`drug with name ${drugName}-wrong does not exist`)
                })
        )
    })

    it('should fail on a non-string drugName', () => {
        drugName = 9328743289
        expect(() => retrieveDrug(drugName)).to.throw(TypeError, `drugName ${drugName} is not a string`)
        drugName = false
        expect(() => retrieveDrug(drugName)).to.throw(TypeError, `drugName ${drugName} is not a string`)
        drugName = undefined
        expect(() => retrieveDrug(drugName)).to.throw(TypeError, `drugName ${drugName} is not a string`)
        drugName = []
        expect(() => retrieveDrug(drugName)).to.throw(TypeError, `drugName ${drugName} is not a string`)
    })

    after(() => Drug.deleteMany().then(() => mongoose.disconnect()))
})