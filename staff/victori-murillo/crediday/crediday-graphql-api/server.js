const app = require('express')()
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require("graphql")

let schema = buildSchema(`
  type Query {
    user: User
  }

  type User {
    name: String
    age: Int
  }
`)

let root = {
  user: () => {
    return {
      name: 'Victori',
      age: 28
    }
  }
}

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
