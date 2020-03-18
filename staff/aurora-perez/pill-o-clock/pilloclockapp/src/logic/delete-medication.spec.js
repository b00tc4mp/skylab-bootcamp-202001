const { random, floor } = Math

import deleteMedication from './delete-medication'

const { mongoose, models: { User, Drug, Guideline } } = require('../data')
const { NotAllowedError, NotFoundError } = require('../errors')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const atob = require('atob')

describe('deleteMedication', () => { 

    let name, surname, gender, age, phone, profile, email, password, token, drugName, description, time, idDrug
    
    const GENDERS = ['male', 'female','non-binary']
    
    
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-pill-o-clock', { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
        await Drug.deleteMany()
        await Guideline.deleteMany()
    })
    
    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        phone = `${random()}`
        age = floor(random() * 100)
        gender = GENDERS[floor(random() * GENDERS.length)]
        profile = 'pharmacist'
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        drugName = `drugName-${random()}`
        description = `description-${random()}`
        time = random()
    })

    describe('when user already exists', () => {
        let _id, _drug, user, guideline, idDrug 

        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)
            user = await User.create({name, surname, gender, age, phone, profile, email, password: _password})
               
            _id = user.id
   
            token = jwt.sign({ sub: _id }, 'my cat is a demon', { expiresIn: '1d' })
            
            _drug = await Drug.create({drugName, description})
            
            guideline = await Guideline.create({times: [time], prescribed: _id, drug: _drug})
            
            await User.findByIdAndUpdate(_id, {$push: {prescription: guideline}})
            user = await User.findById(_id)
            
        })

        it('should succes on right data', async () =>{
            
            let _guideline = await Guideline.findOne({prescribed: _id}).populate('drug')
            
            expect(_guideline.drug.drugName).toMatch(drugName)
            expect(_guideline.times[0]).toBe(time)

            idDrug = _drug._id.toString()

            await deleteMedication(token, idDrug)

            _guideline = await Guideline.findOne({prescribed: _id}).populate('drug')
            user = await User.findById(_id)

            expect(user.prescription.length).toBe(0)
            expect(_guideline).toBeNull()
        })
    })
     describe('unhappy paths syncronous errors', () => {
        it('should fail on a non-string token', async () => {
            let _error
            __token = 45438
            try {
                await deleteMedication(__token, idDrug)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token ${__token} is not a string`)
            
            __token = false
            try {
                await deleteMedication(__token, idDrug)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token ${__token} is not a string`)
        
            __token = []
            try {
                await deleteMedication(__token, idDrug)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token ${__token} is not a string`)
        })
        it('should fail on a non-string idDrug', async () => {
            let _error
            _idDrug = 45438
            try {
                await deleteMedication(token, _idDrug)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`idDrug ${_idDrug} is not a string`)
            
            _idDrug = false
            try {
                await deleteMedication(token, _idDrug)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`idDrug ${_idDrug} is not a string`)
        
            _idDrug = []
            try {
                await deleteMedication(token, _idDrug)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`idDrug ${_idDrug} is not a string`)
        })
    })
    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))


})