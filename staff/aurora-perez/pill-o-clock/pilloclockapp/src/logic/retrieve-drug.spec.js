const { random, floor } = Math

import retrieveDrug from './retrieve-drug'

const { mongoose, models: { Drug } } = require('../data')
const { NotAllowedError, NotFoundError } = require('../errors')


describe('retrieveDrug', () => {
    
    let drugName, description, _drugId
    
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
            _drugId = drug.id

            const _drug = await retrieveDrug(_drugId)
            console.log(_drug)
            expect(_drug).toBeDefined()
            expect(_drug.drugName).toBe(drugName)
            expect(_drug.description).toBe(description)
    
        })

    })
    

    describe('unhappy paths syncronous', () => {
        it('should fail on a non-string drugName', async () => {
            let _error
            _drugId = 45438
            try {
                await retrieveDrug(_drugId)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`id ${_drugId} is not a string`)
            
            _drugId = false
            try {
                await retrieveDrug(_drugId)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`id ${_drugId} is not a string`)
            
            _drugId = undefined
            try {
                await retrieveDrug(_drugId)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`id is empty`)
            
            _drugId = []
            try {
                await retrieveDrug(_drugId)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`id ${_drugId} is not a string`)
        })
    })
    afterAll(() => Drug.deleteMany().then(() => mongoose.disconnect()))
})