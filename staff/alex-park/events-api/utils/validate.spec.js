const { expect } = require('chai')
const validate = require('./validate')

describe('validate', () => {
    describe('string', () => {
        it('should not throw on string target', () => {
            const name = 'something'
            let target = 'a string'

            expect(() => validate.string(target, name)).not.to.throw()
        })

        it('should throw type-error on non-string target', () => {
            const name = 'something'

            let target = 1
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)

            target = true
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)

            target = {}
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)

            target = []
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)
        })

        it('should throw type-error on empty string target with default empty flat as true', () => {
            const name = 'something'
            let target = ''

            expect(() => validate.string(target, name)).to.throw(Error, `${name} is empty`)
        })

        it('should not throw on empty string target with empty flat as false', () => {
            const name = 'something'
            let target = ''

            expect(() => validate.string(target, name, false)).not.to.throw()
        })
    })

    describe('email', () => {
        const emailArr = ['a@gmail.com', 'a@yahoo.com', '123@co.uk', 'hsa@hotmail.com', 'asdsad@gmail.es']
        // let randomEmail = emailArr[Math.floor(Math.random() * emailArr.length)]
        
        it('should not throw error on a valid email address', () => {
            emailArr.forEach(email => {
                expect(() => validate.email(email)).not.to.throw()
            })
        })

        it('should throw an error on an invalid email syntax', () => {
            const wrongMails = ['123@123', 'sakhdb', 'dsfd@aaaa.a', false]
            wrongMails.forEach(email => {
                expect(() => validate.email(email)).to.throw(Error, `${email} is not an email`)
            })
        })
    })
})