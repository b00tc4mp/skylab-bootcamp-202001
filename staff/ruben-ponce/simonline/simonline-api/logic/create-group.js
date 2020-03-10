const { validate } = require('simonline-utils')
const { models: { User, Group } } = require('simonline-data')
const { NotFoundError, NotAllowedError } = require('simonline-errors')

module.exports = (name, owner ) => {
    validate.string(name, 'name')
    validate.string(owner, 'owner')

    let id, _user

    return User.findOne({username:owner})
        .then(user => {
            if(!user) throw new NotFoundError(`owner with username ${owner} does not exist`)
            id = user.id
            _user = user
        })
        .then(() => {
            return Group.findOne({name})
                .then(group => {
                    if(group) throw new NotAllowedError(`group with name ${name} already exist`)
                })
        })
        .then(() => {
            let group = new Group({ name, owner })
            id = group.id
            debugger
            return group.save()
                .then(() =>{
                    return Group.findByIdAndUpdate(id, { $addToSet: {players: _user.id, ingame: _user.id}})
                })
        })
        .then (() => { })
}