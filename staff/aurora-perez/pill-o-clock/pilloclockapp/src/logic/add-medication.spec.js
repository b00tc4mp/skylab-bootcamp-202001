.const { random, floor } = Math


const { mongoose, models: { User, Drug, Guideline } } = require('../data')
const { NotAllowedError, NotFoundError } = require('../errors')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const atob = require('atob')
import logic from '.'
import config from '../config'

logic.__context__.storage = AsyncStorage
logic.__context__.API_URL = config.API_URL

describe('addMedication', () => {
    
    let name, surname, gender, age, phone, profile, email, password, token, drugName, description, time
    
    const GENDERS = ['male', 'female','non-binary']
    
    
    beforeAll(async () => {
        await mongoose.connect(config.TEST_MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
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
        let _id, user, drug

        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)
            user = await User.create({name, surname, gender, age, phone, profile, email, password: _password})
            drug = await Drug.create({drugName, description})
            
            //await Guideline.create({times, prescribed: user.id, drug})
            
            _id = user.id
            _idDrug = drug.id
           
            token = jwt.sign({ sub: _id }, 'my cat is a demon', { expiresIn: '1d' })
            await logic.__context__.storage.setItem('token', _token)
                    
            return token
              
        })

        it('should succeed on correct and valid and right data', async () => { 
            
            
            await addMedication(token, drugName, time)
            const _user = await User.findById(_id)
            const presc = await Guideline.findOne({prescribed: _id}).populate('drug')
            // const _drug = await Drug.findById(_idDrug)
            //console.log(_user.prescription[0])

            expect(_user.prescription[0]).toBeDefined()
            expect(_user.prescription[0].times[0]).toBe(time)
            expect(presc.drug.drugName).toBe(drugName)
            expect(presc.drug.description).toBe(description)
            //console.log(presc.prescribed )
            //console.log(_id)
            //expect(presc.prescribed === _id).toBeTruthy()
            
        })

        
    })

    
    
    

    describe('unhappy paths syncronous errors', () => {
        it('should fail on a non-string token', async () => {
            let _error
            __token = 45438
            try {
                await addMedication(__token, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token ${__token} is not a string`)
            
            __token = false
            try {
                await addMedication(__token, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token ${__token} is not a string`)
        
            __token = []
            try {
                await addMedication(__token, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token ${__token} is not a string`)
        })

        it('should fail on a non-string drugName', async () => {
            let _error
            _drugName = 45438
            try {
                await addMedication(token, _drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`drugName ${_drugName} is not a string`)
            
            _drugName = false
            try {
                await addMedication(token, _drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`drugName ${_drugName} is not a string`)
            
            _drugName = undefined
            try {
                await addMedication(token, _drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`drugName is empty`)
            
            _drugName = []
            try {
                await addMedication(token, _drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`drugName ${_drugName} is not a string`)
        })

        it('should fail on a non-number time', async () => {
            let _error
            time = '11111'
            try {
                await addMedication(token, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`time ${time} is not a number`)
            
            time = false
            try {
                await addMedication(token, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`time ${time} is not a number`)
            
            time = undefined
            try {
                await addMedication(token, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`time ${time} is not a number`)
            
            time = []
            try {
                await addMedication(token, drugName, time)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`time ${time} is not a number`)
        })
    })
    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))
})