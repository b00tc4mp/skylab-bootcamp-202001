const { retrieveUser } = require('.')
const { expect } = require('chai')
const { users } = require('../data')
const { NotFoundError, NotAllowedError } = require('../errors')

const fs = require('fs').promises
const path = require('path')
const uuid = require('uuid/v4')

describe('retrieveUser', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email = Math.random() +'@mail.com'
        password = 'password-' + Math.random()
        id =  uuid()
    })

    describe('when user exists', () => {
        describe('when user is not deactivated', ()=>{
            beforeEach(() => {

                const user = { id, name, surname, email, password, created: new Date }  

                users.push(user)

                return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
            })

            it('should succeed on valid id, returning the user', ()=> {
                return retrieveUser(id)
                .then(user => {
                    expect(user).to.be.a('object')
                    expect(user.name).to.be.equal(name)
                    expect(user.surname).to.be.equal(surname)
                    expect(user.email).to.be.equal(email)
                })
            })



        })

        describe('when user is deactivated', () => {
            beforeEach(() => {

                const user = { id, name, surname, email, password, created: new Date, deactivated: true }  

                users.push(user)

                return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
            })

            it('should throw not-allowed-error', ()=>{
                expect( ()=> {
                    retrieveUser(id)
                }).to.throw(NotAllowedError, `user with id ${id} is deactivated`)
                
            })

        })

    })

    describe('when user does not exist', () => {
        it('should fail throwing not-found-error', ()=> {
            expect( ()=> {
                    retrieveUser(id)
            }).to.throw(NotFoundError, `user with id ${id} does not exists`)
        })
    })

    it('should fail on non-string or empty id', () => {
        id=1
        expect( ()=> {
            retrieveUser(id)
        }).to.throw(TypeError, `id ${id} is not a string`)

        id = true
        expect( ()=> {
            retrieveUser(id)
        }).to.throw(TypeError, `id ${id} is not a string`)

        id = {}
        expect( ()=> {
            retrieveUser(id)
        }).to.throw(TypeError, `id ${id} is not a string`)

        id = ''
        expect( ()=> {
            retrieveUser(id)
        }).to.throw(Error, `id is empty`)
    })

})