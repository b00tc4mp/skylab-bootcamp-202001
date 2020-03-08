const { models: { User, Park } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')

module.exports = ({ park, features }) => {
    debugger
    for (key in park)
        if (key !== 'location') validate.string(park[key], `${park[key]}`)

    for (key in features)
        if (key !== 'location') validate.string(park[key], `${park[key]}`)



    return


}