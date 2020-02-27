const { expect } = require('chai')
const validate = require('./validate')

describe('validate', () => {
    describe('string', () => {
        it('should not throw on string target', () => {
            let name = 'something'
            let target = 'a string'

            expect(() => validate.string(target, name)).not.to.throw()
        })

        it('should throw type-error on non-string target', () => {
            let name = 'something'

            let target = 1
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)

            target = true
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)

            target = {}
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)

            target = []
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)
        })

        it('should throw type-error on empty string target with default empty flat to true', () => {
            const name = 'something'

            let target = ''
            expect(() => validate.string(target, name)).to.throw(Error, `${name} is empty`)
        })

        it('should not throw on empty string target with empty flat to false', () => {
            const name = 'something'

            let target = ''
            expect(() => validate.string(target, name, false)).not.to.throw()
        })
    })

    describe('email', () => {
        it('should not throw error on correct mail', () => {
            let mail = 'pinkmac@gmail.com'
            expect(() => validate.email(mail)).not.to.throw()
            mail = 'pinkmac@gmail.es'
            expect(() => validate.email(mail)).not.to.throw()
            mail = 'pinkmac@hotmail.es'
            expect(() => validate.email(mail)).not.to.throw()
            mail = 'pinkmac@mac.co.uk'
            expect(() => validate.email(mail)).not.to.throw()
        })

        it('shoul throw error on incorrect mail', () => {
            mail = 'pinkmacgmailcom'
            expect(() => validate.email(mail)).to.throw(`${mail} is not an e-mail`)
            mail = 'pinkmac@gmailcom'
            expect(() => validate.email(mail)).to.throw(`${mail} is not an e-mail`)
            mail = 'pinkmacgmail.com'
            expect(() => validate.email(mail)).to.throw(`${mail} is not an e-mail`)
            mail = 'pinkmac@gmail..com'
            expect(() => validate.email(mail)).to.throw(`${mail} is not an e-mail`)
            mail = 'pinkmac@gmail.1'
            expect(() => validate.email(mail)).to.throw(`${mail} is not an e-mail`)
        })
    })
})