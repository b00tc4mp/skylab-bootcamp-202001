const { validate } = require('../../utils')

module.exports = class Model {
    constructor(data, schema) {
        //['name', 'surname', 'email', 'password', 'address']
        Object.keys(data).forEach(field => {
            if (!schema[field]) throw new Error(`invalid field ${field}`)
        })

        /*
        const schema = {
            name: String,
            surname: String,
            email: String,
            password: String
        }
        ['name', 'surname', 'email', 'password', 'address']
        */

        Object.keys(schema).forEach(field => {
            const type = schema[field]
            const value = data[field]
                        // 'victori', name, String
            validate.type(value, field, type)

            this[field] = value
        })
    }
}
/*
{
    name: 'victori',
    
}
 */

/*
{
    name: 'victori',
    surname: 'murillo',
    email: 'v@gmail.com',
    password: 123
}
*/