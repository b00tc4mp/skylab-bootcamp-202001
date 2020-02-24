const User = require('./user')
const Search = require('./search')

function Landing(props = {}) {
    const { username, name, vehicles, vehicle, error } = props
    return `
    ${User({ username, name })}
    ${Search({ title: 'Search', error, vehicles, vehicle })}
    `
}
module.exports = Landing