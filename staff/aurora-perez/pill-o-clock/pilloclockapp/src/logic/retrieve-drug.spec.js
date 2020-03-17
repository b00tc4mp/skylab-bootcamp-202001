const { random, floor } = Math

import retrieveDrug from './retrieve-drug'

const { mongoose, models: { Drug } } = require('../data')
const { NotAllowedError, NotFoundError } = require('../errors')


describe('retrieveDrug', () => {
    
    let drugName, description
    
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-pill-o-clock', { useNewUrlParser: true, useUnifiedTopology: true })
        await Drug.deleteMany()
    })

    beforeEach(() => {
        drugName = `drugName-${random()}`
        description = `description-${random()}`
        
    })


    describe('when drug already exists', () => {


        it('should succeed and valid and right data', async () => { 
            const drug = await Drug.create({ drugName, description}) 

            const _drug = await retrieveDrug(drugName)
            console.log(_drug)
            expect(_drug).toBeDefined()
            expect(_drug.drugName).toBe(drugName)
            expect(_drug.description).toBe(description)
    
        })

    })
    

    describe('unhappy paths syncronous', () => {
        it('should fail on a non-string drugName', async () => {
            let _error
            drugName = 45438
            try {
                await retrieveDrug(drugName)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`drugName ${drugName} is not a string`)
            
            drugName = false
            try {
                await retrieveDrug(drugName)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`drugName ${drugName} is not a string`)
            
            drugName = undefined
            try {
                await retrieveDrug(drugName)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`drugName is empty`)
            
            drugName = []
            try {
                await retrieveDrug(drugName)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`drugName ${drugName} is not a string`)
        })
    })
    afterAll(() => Drug.deleteMany().then(() => mongoose.disconnect()))
})