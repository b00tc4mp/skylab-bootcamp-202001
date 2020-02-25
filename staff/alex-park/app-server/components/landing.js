const Search = require('./search')
const User = require('./user')
const Results = require('./results')

module.exports = function (props = {}) {
    const { name, username, query, vehicles } = props

    return `${name ? User({ name, username }) : `<section><a href='/register'>Register</a> or <a href='/login'>Login</a></section>`}
    ${Search({ query })}
    ${vehicles ? Results({vehicles}) : ''}`
}