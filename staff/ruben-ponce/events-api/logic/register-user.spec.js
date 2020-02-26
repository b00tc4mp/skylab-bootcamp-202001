const { expect } = require('chai')
const validate = require('../utils/validate')

describe('register', () => {
    describe('string', () => {
        it('should not to throw error on string target', () => {
            let name = 'input'
            let target = 'string'

            expect(() => validate.string(target, name)).not.to.throw()
        })

        it('should throw an error on non string target', () => {
            let name = 'input'
            let target = 1

            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)
            target = function(){}
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)
            target = {}
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)
            target = true
            expect(() => validate.string(target, name)).to.throw(TypeError, `${name} ${target} is not a string`)
        })

        it('should throw error on empty target', () => {
            let name = 'input'
            target = ''
            expect(() => validate.string(target, name)).to.throw(Error, `${name} is empty`)
        })
    })
})