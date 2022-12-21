const { gql } = require('apollo-server')

const typeDefs = gql`

  type User {
    id: ID!
    address: String!
    name: String
  }

  type Query {
    users: [User!]!
    user(address: String!): User
  }

  type Mutation {
    addUser(address: String!, name: String): User!
  }
`
module.exports = {
  typeDefs,
}